import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NftStore, Project } from "parasol-finance-sdk";
import { useDropzone } from "react-dropzone";
import NumberFormat from "react-number-format";
import TextareaAutosize from "react-textarea-autosize";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

import Card from "components/card";
import Container from "components/container";
import Heading from "components/heading";
import { useWalletModal } from "components/wallet-connector";
import { NftContext } from "context/NftContext";
import {
  errClasses,
  isTokenAddressExist,
  notification,
  validURL,
} from "utils/functions";
import { db, storage } from "utils/firebase";

const exchanges = [{ id: 1, name: "Raydium | One of the Biggest Solana AMM" }];

const packages = [
  {
    name: "Basic",
    description: "IDO Listing only without Ads.",
    price: 2100,
    fees: 3,
  },
  { name: "Pro", description: "IDO Listing and Ads.", price: 10500, fees: 2 },
  {
    name: "Ultimate",
    description: "IDO Listing, Ads and AMA.",
    price: 21000,
    fees: 1,
  },
];

const idoOptions = [
  {
    id: 1,
    title: "SPL Token Ready",
    description: "I already have an SPL token",
  },
  {
    id: 2,
    title: "TGE after IDO",
    description: "I want to create token at the end of the IDO.",
  },
];

const SubmitProject = () => {
  const router = useRouter();
  const { provider, config, user, projectKinds } = useContext(NftContext);

  const { publicKey, sendTransaction } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const { connection } = useConnection();
  const walletModal = useWalletModal();

  const splRef: any = useRef(null);
  const submitBtnRef: any = useRef(null);

  const idosCollectionRef = collection(db, "ido-metadata");
  const [coverFile, setCoverFile] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<any>({
    projectKey: "",
    publicKey: walletAddress,
    splToken: "",
    projectIcon: "",
    projectCover: "",
    projectName: "",
    symbol: "",
    description: "",
    websiteUrl: "",
    whitepaperUrl: "",
    dex: exchanges[0],
    tokenPrice: "",
    hardCap: "",
    twitter: "",
    telegram: "",
    startTime: "",
    endTime: "",
    liquidity: "50",
    rewardDecimals: 0,
    package: packages[0],
    isFeatured: false,
    created: Timestamp.now(),
  });

  const [errors, setErrors] = useState<any>([]);

  const handleChange = (e: any) => {
    let { name, value, classList } = e.target;
    if (name != "projectCover") {
      if (classList.contains("required_") && !value.trim()) {
        classList.add(...errClasses);
        errors[name] = "This field is required";
      }
      else if (
        classList.contains("url_") &&
        value.trim() &&
        !validURL(value)
      ) {
        classList.add(...errClasses);
        errors[name] = "Please enter a valid url";
      }
      else {
        if (name != "splToken") {
          classList.remove(...errClasses);
          errors[name] = "";
        }
      }
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (walletAddress) {
      setLoading(true);
      await validateAllFieldsAndRedirection();
    }
  };

  const validateAllFields = async (justSPL = false) => {
    const _errors: any = [];

    if (!justSPL) {
      let elements: any = document.getElementsByClassName("required_");
      for (let el of elements) {
        const { name, value } = el;
        if (!value.trim()) {
          _errors[name] = "This field is required";
          el.classList.add(...errClasses);
        }
        else el.classList.remove(...errClasses);
      }

      elements = document.getElementsByClassName("url_");
      for (let el of elements) {
        const { name, value } = el;
        if (value.trim() && !validURL(value)) {
          _errors[name] = "Please enter a valid url";
          el.classList.add(...errClasses);
        }
      }

      if (!coverFile) {
        _errors["projectCover"] = "This field is required";
      }

      if (!values.package) {
        _errors["package"] = "This field is required";
      }

      if (values.startTime && values.endTime) {
        const nowTime = new Date();
        const stTime: any = new Date(values.startTime);
        const enTime: any = new Date(values.endTime);
        const diffTime = Math.abs(enTime - stTime);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const stRef = document.getElementById("startTime");
        const enRef = document.getElementById("endTime");

        stRef?.classList.remove(...errClasses);
        enRef?.classList.remove(...errClasses);
        if (nowTime > stTime) {
          stRef?.classList.add(...errClasses);
          _errors["startTime"] = "start time should be greater than today";
        }
        else if (diffDays > 14) {
          enRef?.classList.add(...errClasses);
          _errors["endTime"] = "You cannot create an IDO longer than 14 days";
        }
      }
    }

    if (selectedIdoOptions.id == 1) {
      const { name, value } = splRef.current;
      if (value) {
        const isExist = await isTokenAddressExist(value);

        if (isExist) {
          _errors[name] =
            "This address was already used for run a previous IDO";
          splRef.current.classList.add(...errClasses);
        }

        await axios
          .get(`https://public-api.solscan.io/token/meta?tokenAddress=${value}`)
          .catch((error) => {
            _errors[name] = "Please enter a valid token address";
            splRef.current.classList.add(...errClasses);
          });
      }
    }

    setErrors(_errors);
    return _errors;
  };

  const validateAllFieldsAndRedirection = async () => {
    const _errors = await validateAllFields();
    if (Object.keys(_errors).length == 0) {
      try {
        const nftStore = await new NftStore(provider, config).build();

        const projectKeypair = Keypair.generate();
        const projectPubKey = projectKeypair.publicKey;
        const project = await new Project(
          provider,
          nftStore,
          projectPubKey
        ).build();
        const rewardMint = values.splToken
          ? new PublicKey(values.splToken)
          : null;

        const index = packages.findIndex((p) => p.name === values.package.name);

        const treasuryMint: any = process.env.NEXT_PUBLIC_TREASURY_MINT;

        const args: any = {
          projectKind: projectKinds[index].address,
          treasuryMint: new PublicKey(treasuryMint),
          rewardMint: rewardMint,
          rewardDecimals: values.rewardDecimals,
          tier: index,
          hardCap: values.hardCap,
          salePrice: values.tokenPrice,
          lpFeeBasisPoints: Number(values.liquidity) / 100,
          startTime: new Date(values.startTime),
          endTime: new Date(values.endTime),
          uri: `${
            process.env.NEXT_PUBLIC_DOMAIN
          }/api/projects/${projectPubKey?.toBase58()}`,
        };

        const tx = await project.create(args, user);

        values.publicKey = walletAddress;
        values.projectKey = projectPubKey?.toBase58();
        await uploadFiles(coverFile, async (_values: any) => {
          await setDoc(doc(idosCollectionRef, values.projectKey), _values);

          try {
            // sign transaction
            let signature = await sendTransaction(tx, connection, {
              signers: [projectKeypair],
            });
            // confirm transaction
            await connection.confirmTransaction(signature, "confirmed");

            await router.push(`/projects/${values.projectKey}`);
          }
          catch (error: any) {
            console.log(error, "error1");
            console.log(error.message, "errormsg1");
            if (error.message == "User rejected the request.") {
            }
            else
              notification(
                "danger",
                "Unable to create an IDO.",
                "Transaction Failed"
              );
            setLoading(false);
          }
        });
      }
      catch (error: any) {
        console.log(error, "error2");
        console.log(error.message, "errormsg2");
        setLoading(false);
        notification(
          "danger",
          "Unable to create an IDO.",
          "Transaction Failed"
        );
      }
    }
    else setLoading(false);
  };

  useEffect(() => {
    const getTokeData = () => {
      const address = values.splToken;
      const _errors = errors;

      if (address) {
        axios
          .get(
            `https://public-api.solscan.io/token/meta?tokenAddress=${address}`
          )
          .then(async (res) => {
            splRef.current?.classList.remove(...errClasses);
            delete _errors["splToken"];
            setErrors(_errors);
            const { data } = res;
            if (await isTokenAddressExist(address)) validateAllFields(true);
            else if (data) {
              const obj: any = {};
              if (data.name) obj.projectName = data.name;
              if (data.symbol) obj.symbol = data.symbol;
              if (data.icon) obj.projectIcon = data.icon;
              if (data.website) obj.websiteUrl = data.website;
              if (data.twitter) obj.twitter = data.twitter;
              if (data.telegram) obj.telegram = data.telegram;

              setValues((preValues: any) => ({ ...preValues, ...obj }));
              // validateAllFields(true);
            }
          })
          .catch((error) => {
            _errors["splToken"] = "Please enter a valid token address";
            setErrors(_errors);
          });
      }
    };
    getTokeData();
  }, [values.splToken]);

  const uploadFiles = (file: any, callback: Function) => {
    //
    if (!file) return;
    const storageRef = ref(
      storage,
      `projects/${values.projectKey}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const _values = {
            icon: values.projectIcon,
            cover: downloadURL,
            name: values.projectName,
            symbol: values.symbol,
            description: values.description,
            websiteUrl: values.websiteUrl,
            whitepaperUrl: values.whitepaperUrl,
            dex: values.dex,
            twitter: values.twitter,
            telegram: values.telegram,
            content: "",
            created: Timestamp.now(),
          };
          callback(_values);
        });
      }
    );
  };

  const onDrop = useCallback((file: any) => {
    const _errors = errors;
    delete _errors["projectCover"];
    setErrors(_errors);

    setCoverFile(file[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [selectedIdoOptions, setSelectedIdoOptions] = useState(idoOptions[0]);

  const changeScenario = (value: any) => {
    setSelectedIdoOptions(value);
    setValues({ ...values, rewardDecimals: 0, splToken: "" });
  };

  return (
    <section>
      <Heading
        tagline={"Parasol Launchpad"}
        title={"Submit Your Project (IDO)"}
        description={
          "Create your presale in a few clicks by holding PSOL tokens."
        }
      />
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-9">
            <div className="md:col-span-6">
              <form className="divide-y- space-y-12 divide-gray-400 md:pr-16">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-blue-gray-900 text-xl font-medium">
                      1. Choose a Launch Option
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm">
                      Choose the scenario that corresponds to you.
                    </p>
                  </div>
                  {/*{selectedIdoOptions.id == 2 && (*/}
                  {/*  <div className={"sm:col-span-6 flex ml-auto justify-items-end items-center"}>*/}
                  {/*    <Link href={"/tools/token-creator"}>*/}
                  {/*      <a*/}
                  {/*        type="button"*/}
                  {/*        className="inline-flex items-center gap-x-1 px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-white bg-opacity-30 text-purple-2 hover:bg-purple-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-2">*/}
                  {/*        <PlusCircleIcon className={"w-4"} />*/}
                  {/*        Create SPL Token*/}
                  {/*      </a>*/}
                  {/*    </Link>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                  <div className="sm:col-span-12">
                    <RadioGroup
                      value={selectedIdoOptions}
                      onChange={changeScenario}
                    >
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {idoOptions.map((idoOption) => (
                          <RadioGroup.Option
                            key={idoOption.id}
                            value={idoOption}
                            className={({ active }) =>
                              "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none"
                            }
                          >
                            {({ checked, active }) => (
                              <>
                                <div className="flex flex-1">
                                  <div className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className="block text-sm font-medium"
                                    >
                                      {idoOption.title}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-1 flex items-center text-sm"
                                    >
                                      {idoOption.description}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                <CheckCircleIcon
                                  className={`${
                                    !checked ? "invisible" : ""
                                  } h-5 w-5 text-purple-2`}
                                  aria-hidden={true}
                                />
                                <div
                                  className={`${
                                    checked
                                      ? "border-purple-2"
                                      : "border-transparent"
                                  } pointer-events-none absolute -inset-px rounded-lg border-2`}
                                  aria-hidden={true}
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {selectedIdoOptions.id == 1 ? (
                    <>
                      <div className="relative sm:col-span-12">
                        <label
                          htmlFor="email-address"
                          className="text-blue-gray-900 block text-sm font-medium"
                        >
                          Enter your Token Address{" "}
                          <span className="text-purple-2">*</span>
                        </label>
                        <input
                          onChange={handleChange}
                          value={values.splToken}
                          type="text"
                          name="splToken"
                          id="token-address"
                          placeholder={"SPL Token Address"}
                          pattern={"[A-Za-z0-9]*"}
                          className={`required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm ${
                            errors.splToken &&
                            "rounded-md border-2 border-red-600 text-red-600 placeholder-red-600 focus:border-red-600 focus:outline-none focus:ring-red-600 sm:text-sm"
                          }`}
                          aria-invalid="true"
                          ref={splRef}
                        />
                        {errors.splToken && (
                          <>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                              {errors.splToken}
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-blue-gray-500 text-sm sm:col-span-6">
                        The token information will be fetched from the Solana
                        blockchain.
                      </p>
                    </>
                  ) : (
                    <div className="relative sm:col-span-12">
                      <label
                        htmlFor="email-address"
                        className="text-blue-gray-900 block text-sm font-medium"
                      >
                        Token Decimals <span className="text-purple-2">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.rewardDecimals}
                        type="number"
                        min={0}
                        max={18}
                        name="rewardDecimals"
                        id="token-decimals"
                        placeholder={"Enter Decimals"}
                        className={`required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm ${
                          errors.rewardDecimals &&
                          "rounded-md border-2 border-red-600 text-red-600 placeholder-red-600 focus:border-red-600 focus:outline-none focus:ring-red-600 sm:text-sm"
                        }`}
                      />
                      {errors.rewardDecimals && (
                        <>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                            {errors.rewardDecimals}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="project-cover"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Project Cover <span className="text-purple-2">*</span>
                    </label>
                    <div
                      className={`mt-1 flex justify-center rounded-md border-2 border border-dashed border-gray-800 bg-[#231f38] bg-opacity-50 px-6 py-6 shadow-xl shadow-half-strong ${
                        coverFile && "border-purple-2"
                      } ${errors.projectCover && "border-red-600"}`}
                      {...getRootProps()}
                    >
                      <div className="space-y-1 text-center">
                        {(coverFile && (
                          <div className="relative cursor-pointer font-medium text-purple-2 focus-within:outline-none hover:text-purple-1">
                            {coverFile.name}
                          </div>
                        )) || (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-200">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer font-medium text-purple-2 focus-within:outline-none hover:text-purple-1"
                              >
                                <input
                                  {...getInputProps()}
                                  disabled={true}
                                  id="file-upload"
                                  name="projectCover"
                                  type="file"
                                  className="sr-only"
                                />
                                <span>Upload a file</span>
                              </label>
                              {isDragActive ? (
                                <p className="pl-1">Drop the file here ...</p>
                              ) : (
                                <p className="pl-1">or drag and drop</p>
                              )}
                            </div>
                          </>
                        )}
                        <p className="text-xs text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>

                    {errors.projectCover && (
                      <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                        {errors.projectCover}
                      </div>
                    )}
                    <p className="text-blue-gray-500 mt-3 text-sm">
                      We need a cover in the following format: 1920x1080px.
                    </p>
                  </div>

                  <div className="relative sm:col-span-4">
                    <label
                      htmlFor="project-name"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Project Name <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.projectName}
                      type="text"
                      name="projectName"
                      id="project-name"
                      className="required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.projectName && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.projectName}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-2">
                    <label
                      htmlFor="project-name"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Symbol <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.symbol}
                      type="text"
                      name="symbol"
                      id="project-name"
                      className="required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.symbol && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.symbol}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Short Description <span className="text-purple-2">*</span>
                    </label>
                    <div className="mt-1">
                      <TextareaAutosize
                        onChange={handleChange}
                        id="description"
                        name="description"
                        minRows={4}
                        className="required_ block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                        value={values.description}
                      ></TextareaAutosize>
                      {errors.description && (
                        <>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                            {errors.description}
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-blue-gray-500 mt-3 text-sm">
                      Brief description of your project, no HTML or Markdown
                      accepted.
                    </p>
                  </div>

                  <div className="relative sm:col-span-6">
                    <label
                      htmlFor="website-url"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Website URL <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.websiteUrl}
                      type="text"
                      name="websiteUrl"
                      id="website-url"
                      className="required_ url_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.websiteUrl && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.websiteUrl}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-6">
                    <label
                      htmlFor="white-paper"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      WhitePaper URL (should be a PDF)
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.whitepaperUrl}
                      type="text"
                      name="whitepaperUrl"
                      id="white-paper"
                      className="url_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.whitepaperUrl && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.whitepaperUrl}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-blue-gray-900 text-xl font-medium">
                      2. IDO Details
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm">
                      Calculate the amount of token for your IDO, and the
                      liquidity.
                    </p>
                  </div>

                  <div className={"relative sm:col-span-3"}>
                    <label
                      htmlFor="token-price"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Token Price
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-200 sm:text-sm">$</span>
                      </div>
                      <input
                        onChange={handleChange}
                        value={values.tokenPrice}
                        type="number"
                        name="tokenPrice"
                        id="token-price"
                        className="required_ block w-full w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 pl-7 pr-12 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm sm:text-sm"
                        placeholder="0.00"
                        min="0.01"
                      />
                      {!errors.tokenPrice && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span
                            className="flex items-center gap-x-1 text-gray-200 sm:text-sm"
                            id="price-currency"
                          >
                            <img
                              className="w-4"
                              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                              alt="USDC"
                            />
                            USDC
                          </span>
                        </div>
                      )}
                    </div>

                    {errors.tokenPrice && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.tokenPrice}
                        </div>
                      </>
                    )}
                  </div>

                  <div className={"relative sm:col-span-3"}>
                    <label
                      htmlFor="hard-cap"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Hard Cap
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-200 sm:text-sm">$</span>
                      </div>
                      <input
                        onChange={handleChange}
                        value={values.hardCap}
                        type="number"
                        name="hardCap"
                        id="hard-cap"
                        className="required_ block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 pl-7 pr-12 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm sm:text-sm"
                        placeholder="0.00"
                      />
                      {!errors.hardCap && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span
                            className="flex items-center gap-x-1 text-gray-200 sm:text-sm"
                            id="price-currency"
                          >
                            <img
                              className="w-4"
                              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                              alt="USDC"
                            />
                            USDC
                          </span>
                        </div>
                      )}
                    </div>

                    {errors.hardCap && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.hardCap}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-3">
                    <label
                      htmlFor="startTime"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      IDO Start Date &amp; Time (Your browser timezone){" "}
                      <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.startTime}
                      type="datetime-local"
                      name="startTime"
                      id="startTime"
                      className="required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.startTime && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"></div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.startTime}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-3">
                    <label
                      htmlFor="endTime"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      IDO End DateTime (usually 3 days){" "}
                      <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.endTime}
                      type="datetime-local"
                      name="endTime"
                      id="endTime"
                      className="required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.endTime && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"></div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.endTime}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/*<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">*/}
                {/*  <div className="sm:col-span-6">*/}
                {/*    <h2 className="text-xl font-medium text-blue-gray-900">3. About Liquidity</h2>*/}
                {/*    <p className="mt-1 text-sm text-blue-gray-500">*/}
                {/*      Calculate the amount of token for your IDO, and the liquidity.*/}
                {/*    </p>*/}
                {/*  </div>*/}

                {/*  <div className="md:col-span-6 relative">*/}
                {/*    <Listbox value={values.dex} onChange={handleChange}>*/}
                {/*      {({ open }) => (*/}
                {/*        <>*/}
                {/*          <Listbox.Label className="block text-sm font-medium text-blue-gray-900">Select your Target AMM (Dex):</Listbox.Label>*/}
                {/*          <div className="mt-1 relative">*/}
                {/*            <Listbox.Button*/}
                {/*              className="w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg px-3 py-2 text-left cursor-default">*/}
                {/*              <span className="block truncate">{values.dex.name}</span>*/}
                {/*              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">*/}
                {/*                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                {/*              </span>*/}
                {/*            </Listbox.Button>*/}

                {/*            <Transition*/}
                {/*              show={open}*/}
                {/*              as={Fragment}*/}
                {/*              leave="transition ease-in duration-100"*/}
                {/*              leaveFrom="opacity-100"*/}
                {/*              leaveTo="opacity-0"*/}
                {/*            >*/}
                {/*              <Listbox.Options*/}
                {/*                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">*/}
                {/*                {exchanges.map((dex) => (*/}
                {/*                  <Listbox.Option*/}
                {/*                    key={dex.id}*/}
                {/*                    className={({ active }) => `${active ? "text-white bg-purple-2" : "text-gray-900"} cursor-default select-none relative py-2 pl-3 pr-9`}*/}
                {/*                    value={dex}*/}
                {/*                  >*/}
                {/*                    {({ selected, active }) => (*/}
                {/*                      <>*/}
                {/*                        <span*/}
                {/*                          className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>*/}
                {/*                          {dex.name}*/}
                {/*                        </span>*/}
                {/*                        {selected ? (*/}
                {/*                          <span className={`${active ? "text-white" : "text-purple-2"} absolute inset-y-0 right-0 flex items-center pr-4`}>*/}
                {/*                            <CheckIcon className="h-5 w-5" aria-hidden="true" />*/}
                {/*                          </span>*/}
                {/*                        ) : null}*/}
                {/*                      </>*/}
                {/*                    )}*/}
                {/*                  </Listbox.Option>*/}
                {/*                ))}*/}
                {/*              </Listbox.Options>*/}
                {/*            </Transition>*/}
                {/*          </div>*/}
                {/*        </>*/}
                {/*      )}*/}
                {/*    </Listbox>*/}

                {/*    {errors.dex && <><div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">*/}
                {/*      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />*/}
                {/*    </div><div className="mt-2 text-sm text-red-600 md:col-span-6">{errors.dex}</div></>}*/}
                {/*  </div>*/}

                {/*  <div className="sm:col-span-6">*/}
                {/*    <div className="sm:col-span-3 relative">*/}
                {/*      <label htmlFor="liquidity" className="block text-sm font-medium text-blue-gray-900">*/}
                {/*        Percentage of the Pool for the Liquidity*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*        onChange={handleChange}*/}
                {/*        value={values.liquidity}*/}
                {/*        name="liquidity"*/}
                {/*        type={"range"}*/}
                {/*        className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"*/}
                {/*      />*/}
                {/*      {errors.liquidity && <><div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">*/}
                {/*        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />*/}
                {/*      </div><div className="mt-2 text-sm text-red-600 sm:col-span-6">{errors.liquidity}</div></>}*/}
                {/*    </div>*/}
                {/*    <p className={`mt-3 text-sm text-blue-gray-500 ${parseInt(values.liquidity) < 50 && "font-bold text-yellow-500"}`}>*/}
                {/*      We recommend not less than 50% of the pool to be sent in liquidity.*/}
                {/*    </p>*/}
                {/*  </div>*/}

                {/*</div>*/}

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-blue-gray-900 text-xl font-medium">
                      4. Social Networks
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm">
                      Please indicate your different social networks.
                    </p>
                  </div>

                  <div className="relative sm:col-span-3">
                    <label
                      htmlFor="twitter"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Twitter URL
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.twitter}
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="url_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.twitter && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.twitter}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative sm:col-span-3">
                    <label
                      htmlFor="telegram"
                      className="text-blue-gray-900 block text-sm font-medium"
                    >
                      Telegram URL
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.telegram}
                      type="text"
                      name="telegram"
                      id="telegram"
                      className="url_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                    />
                    {errors.telegram && (
                      <>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                          {errors.telegram}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-blue-gray-900 text-xl font-medium">
                      5. Choose Pricing
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm">
                      Choose the package that best suits your needs, you can
                      read more regarding this pricing{" "}
                      <a
                        href={""}
                        className={"text-purple-2"}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        here
                      </a>{" "}
                      .
                    </p>
                  </div>
                  <div className="sm:col-span-12">
                    <RadioGroup
                      value={values.package}
                      onChange={(pac) => {
                        setValues({ ...values, ["package"]: pac });
                      }}
                    >
                      <RadioGroup.Label className="text-blue-gray-900 block text-sm font-medium">
                        Choose Package
                      </RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {packages.map((plan) => (
                          <RadioGroup.Option
                            as="div"
                            key={plan.name}
                            value={plan}
                            className={({ active }) =>
                              "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none"
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex flex-1">
                                  <div className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className="block text-base font-medium"
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-2 flex items-center text-sm"
                                    >
                                      {plan.description}
                                    </RadioGroup.Description>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-1 flex items-center text-sm font-medium"
                                    >
                                      Token Fees: {plan.fees}&#37;
                                    </RadioGroup.Description>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-2 flex items-center gap-x-2 text-sm font-medium"
                                    >
                                      <img
                                        className="h-4"
                                        src={
                                          "/assets/logos/parasol-logo-mark-reverse-rgb.svg"
                                        }
                                        alt="psol"
                                      />
                                      <NumberFormat
                                        value={
                                          (!plan.price && "0") || plan.price
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                      <span>PSOL</span>
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                <CheckCircleIcon
                                  className={`${
                                    !checked ? "invisible" : ""
                                  } h-5 w-5 text-purple-2`}
                                  aria-hidden={true}
                                />
                                <div
                                  className={`${
                                    checked
                                      ? "border-purple-2"
                                      : "border-transparent"
                                  } pointer-events-none absolute -inset-px rounded-lg border-2`}
                                  aria-hidden={true}
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {errors.package && (
                    <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                      {errors.package}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="mt-5 md:col-span-3">
              <div className="sticky top-20 flex flex-col gap-y-6">
                <Card padded={true}>
                  <h2 className="flex items-center gap-x-2 text-2xl font-bold">
                    {(!values.projectName.trim() && "Project Name") ||
                      values.projectName}
                  </h2>
                  <div className="mt-3 mb-6 flex items-center gap-x-3 text-white">
                    <img
                      className="h-8"
                      src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                      alt="USDC"
                    />
                    <div className="flex items-end gap-x-2 text-4xl font-bold">
                      <NumberFormat
                        value={(!values.hardCap && "0") || values.hardCap}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      <span>USDC</span>
                    </div>
                  </div>
                  <div className="prose prose-lg prose-invert">
                    <p>
                      {(!values.description.trim() && "Project Description") ||
                        values.description}
                    </p>
                  </div>
                  <div className="mt-6 flex-col space-y-3">
                    <div className="flex items-center gap-x-3 font-medium text-gray-300">
                      <span>Hard Cap</span>
                      <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                      <span>
                        <NumberFormat
                          value={(!values.hardCap && "0") || values.hardCap}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-x-3 font-medium text-gray-300">
                      <span>Price per Token</span>
                      <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                      <span>
                        <NumberFormat
                          value={
                            (!values.tokenPrice && "0") || values.tokenPrice
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-x-3 font-medium text-gray-300">
                      <span>Liquidity Percentage</span>
                      <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                      <span>
                        {(!values.liquidity && "0%") || `${values.liquidity}%`}
                      </span>
                    </div>
                  </div>
                  <p className={"mt-6 text-sm text-gray-400"}>
                    Find more information on the listing process by consulting
                    our documentation{" "}
                    <a
                      href={"https://docs.parasol.finance/"}
                      className={"text-purple-2"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      here
                    </a>
                    .
                  </p>
                  <button
                    className={"button mt-8 w-full"}
                    type="submit"
                    ref={submitBtnRef}
                    onClick={() =>
                      walletAddress ?? walletModal.setVisible(true)
                    }
                    disabled={loading}
                  >
                    {walletAddress ? (
                      !loading ? (
                        <>
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                          </svg>
                          Create IDO Now
                        </>
                      ) : (
                        <>Loading ...</>
                      )
                    ) : (
                      <>Connect Wallet</>
                    )}
                  </button>
                  {/*</div>*/}
                </Card>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default SubmitProject;
