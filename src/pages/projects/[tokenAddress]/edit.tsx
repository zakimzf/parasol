import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NumberFormat from "react-number-format";
import axios from "axios";
import { ExclamationCircleIcon, PencilAltIcon } from "@heroicons/react/outline";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useWallet } from "@solana/wallet-adapter-react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useWalletModal } from "../../../components/wallet-connector";
import {
  errClasses,
  isTokenAddressExist,
  validURL,
} from "../../../utils/functions";
import Container from "../../../components/container";
import { db, storage } from "../../../utils/firebase";

const EditProject = () => {
  const router = useRouter();

  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const walletModal = useWalletModal();

  const splRef: any = useRef(null);
  const submitBtnRef: any = useRef(null);

  const idosCollectionRef = collection(db, "idos");
  const [coverFile, setcoverFile] = useState<any>();

  const [values, setValues] = useState({
    publicKey: walletAddress,
    splToken: "",
    projectIcon: "",
    projectCover: "",
    projectName: "",
    symbol: "",
    description: "",
    websiteUrl: "",
    whitepaperUrl: "",
    dex: null,
    tokenPrice: "",
    hardCap: "",
    twitter: "",
    telegram: "",
    package: null,
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
      const preContent = submitBtnRef.current.innerHTML;
      submitBtnRef.current.innerHTML = "Loading ...";
      submitBtnRef.current.setAttribute("disabled", true);
      await validateAllFieldsAndRedirection();
      submitBtnRef.current.innerHTML = preContent;
      submitBtnRef.current.removeAttribute("disabled");
    }
    console.log(77777);
  };

  const validateAllFields = () => {
    const _errors: any = [];

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

    if (!values.package) {
      _errors["package"] = "This field is required";
    }

    setErrors(_errors);
    return _errors;
  };

  const validateAllFieldsAndRedirection = async () => {
    const _errors = await validateAllFields();
    if (Object.keys(_errors).length == 0) {
      console.log(_errors);
      values.publicKey = walletAddress;
      if (coverFile) {
        uploadFiles(coverFile, async (_values: any) => {
          await setDoc(doc(idosCollectionRef, _values.splToken), _values);
        });
      } 
      else {
        await setDoc(doc(idosCollectionRef, values.splToken), values);
      }
      router.push(`/projects/${values.splToken}`);
    }
  };

  const uploadFiles = (file: any, callback: Function) => {
    if (!file) return;
    const storageRef = ref(storage, `projects/${values.splToken}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const _values = { ...values, ["projectCover"]: downloadURL };
          callback(_values);
        });
      }
    );
  };

  const onDrop = useCallback((file: any) => {
    const _errors = errors;
    delete _errors["projectCover"];
    setErrors(_errors);

    setcoverFile(file[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { tokenAddress } = router.query;

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const { data }: any = await axios.get(`/api/projects/${tokenAddress}`);
      if (data) setValues(data);
      else await router.push("/404");
    };
    if (tokenAddress) getDataByTokenAddress();
  }, [tokenAddress]);

  return (
    <section className={"pt-6"}>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-9">
            <div className="col-span-6">
              <div className="flex gap-x-5 mb-3">
                <img
                  className="rounded-full h-16 p-1 m-0"
                  src={values.projectIcon}
                  alt={values.projectName}
                />
                <div className={"mb-6"}>
                  <a
                    id="features"
                    className="pb-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl"
                  >
                    {values.projectName}
                  </a>
                  <p className=" max-w-prose mx-auto text-sm lg:text-base text-gray-200">
                    {values.description}
                  </p>
                </div>
              </div>
              <form className="space-y-12 pr-12 divide-y- divide-gray-400">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-xl font-medium text-blue-gray-900">
                      1. General Information
                    </h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      You can edit the general information of your project.
                    </p>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="project-cover"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Project Cover <span className="text-purple-2">*</span>
                    </label>
                    <div
                      className={`mt-1 border-2 border-dashed bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md px-6 py-6 flex justify-center ${
                        coverFile && "border-purple-2"
                      } ${errors.projectCover && "border-red-600"}`}
                      {...getRootProps()}
                    >
                      <div className="space-y-1 text-center">
                        {(coverFile && (
                          <div className="relative cursor-pointer font-medium text-purple-2 hover:text-purple-1 focus-within:outline-none">
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
                                className="relative cursor-pointer font-medium text-purple-2 hover:text-purple-1 focus-within:outline-none"
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
                    <p className="mt-3 text-sm text-blue-gray-500">
                      We need a cover in the following format: 1920x1080px.
                    </p>
                  </div>

                  <div className="sm:col-span-4 relative">
                    <label
                      htmlFor="project-name"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Project Name <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.projectName}
                      type="text"
                      name="projectName"
                      id="project-name"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 required_"
                    />
                    {errors.projectName && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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

                  <div className="sm:col-span-2 relative">
                    <label
                      htmlFor="project-name"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Symbol <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.symbol}
                      type="text"
                      name="symbol"
                      id="project-name"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 required_"
                    />
                    {errors.symbol && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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

                  <div className="sm:col-span-6 relative">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Short Description <span className="text-purple-2">*</span>
                    </label>
                    <div className="mt-1">
                      <TextareaAutosize
                        onChange={handleChange}
                        id="description"
                        name="description"
                        minRows={4}
                        className="block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 required_"
                        value={values.description}
                      ></TextareaAutosize>
                      {errors.description && (
                        <>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                    <p className="mt-3 text-sm text-blue-gray-500">
                      Brief description of your project, no HTML or Markdown
                      accepted.
                    </p>
                  </div>

                  <div className="sm:col-span-6 relative">
                    <label
                      htmlFor="website-url"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Website URL <span className="text-purple-2">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.websiteUrl}
                      type="text"
                      name="websiteUrl"
                      id="website-url"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 required_ url_"
                    />
                    {errors.websiteUrl && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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

                  <div className="sm:col-span-6 relative">
                    <label
                      htmlFor="white-paper"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      WhitePaper URL
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.whitepaperUrl}
                      type="text"
                      name="whitepaperUrl"
                      id="white-paper"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 url_"
                    />
                    {errors.whitepaperUrl && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                    <h2 className="text-xl font-medium text-blue-gray-900">
                      2. Social Networks
                    </h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      Please indicate your different social networks.
                    </p>
                  </div>

                  <div className="sm:col-span-3 relative">
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Twitter
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.twitter}
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 url_"
                    />
                    {errors.twitter && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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

                  <div className="sm:col-span-3 relative">
                    <label
                      htmlFor="telegram"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Telegram
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.telegram}
                      type="text"
                      name="telegram"
                      id="telegram"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 url_"
                    />
                    {errors.telegram && (
                      <>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
              </form>
            </div>
            <div className="col-span-3">
              <div className="sticky flex flex-col gap-y-6 top-20">
                <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                  <div className={"relative px-6 py-6"}>
                    <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                      {(!values.projectName.trim() && "Project Name") ||
                        values.projectName}
                    </h2>
                    <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
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
                        {(!values.description.trim() &&
                          "Project Description") ||
                          values.description}
                      </p>
                    </div>
                    <div className="flex-col space-y-3 mt-6">
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Hard Cap</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
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
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Price per Token</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
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
                    </div>
                    <button
                      className={
                        "w-full flex items-center justify-center gap-x-2 mt-8 opacity-80-cursor-default bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"
                      }
                      type="submit"
                      ref={submitBtnRef}
                      onClick={() =>
                        walletAddress ?? walletModal.setVisible(true)
                      }
                    >
                      {walletAddress ? (
                        <>
                          <PencilAltIcon className={"w-6"} />
                          Submit Changes
                        </>
                      ) : (
                        <>Connect Wallet</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default EditProject;
