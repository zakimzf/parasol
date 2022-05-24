import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { sign } from "tweetnacl";
import NumberFormat from "react-number-format";
import TextareaAutosize from "react-textarea-autosize";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NftStore, Project } from "parasol-finance-sdk";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ExclamationCircleIcon, PencilAltIcon } from "@heroicons/react/outline";

import { Loading } from "components";

import Container from "components/container";
import { useWalletModal } from "components/wallet-connector";
import { NftContext } from "context/NftContext";
import { db } from "utils/firebase";
import { errClasses, notification, validURL } from "utils/functions";

const EditProject = () => {
  const router = useRouter();

  const { publicKey, signMessage, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const walletModal = useWalletModal();

  const { provider, config, user, wallet } = useContext(NftContext);

  const { projectPubKey }: any = router.query;

  const [values, setValues] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>([]);
  const [project, setProject] = useState<any>();

  const handleChange = (e: any) => {
    let { name, value, classList } = e.target;
    if (classList.contains("required_") && !value.trim()) {
      classList.add(...errClasses);
      errors[name] = "This field is required";
    }
    else if (classList.contains("url_") && value.trim() && !validURL(value)) {
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
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (walletAddress && walletAddress == values.owner) {
      setLoading(true);
      await validateAllFieldsAndRedirection();
    }
    else {
      notification("warning", "You cannot update this IDO.", "Forbidden");
    }
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

    if (values.startTime && values.endTime) {
      const stTime: any = new Date(values.startTime);
      const enTime: any = new Date(values.endTime);
      const diffTime = Math.abs(enTime - stTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const stRef = document.getElementById("startTime");
      const enRef = document.getElementById("endTime");

      stRef?.classList.remove(...errClasses);
      enRef?.classList.remove(...errClasses);

      if (diffDays > 14) {
        enRef?.classList.add(...errClasses);
        _errors["endTime"] = "You cannot create an IDO longer than 14 days";
      }
    }
    setErrors(_errors);
    return _errors;
  };

  const validateAllFieldsAndRedirection = async () => {
    const _errors = await validateAllFields();
    if (Object.keys(_errors).length == 0) {
      signWallet();
    }
  };

  const signWallet = async () => {
    try {
      const idosCollectionRef = doc(db, "ido-metadata", projectPubKey);
      if (values.status == "DRAFT") {
        const tx = await project.update(
          {
            treasuryMint: new PublicKey(values.treasuryMint),
            lpFeeBasisPoints: values.lpFeeBasisPoints,
            rewardDecimals: values.rewardDecimals,
            hardCap: values.hardCap,
            salePrice: values.tokenPrice,
            startTime: new Date(values.startTime),
            endTime: new Date(values.endTime),
          },
          user
        );

        const signature = await sendTransaction(tx, connection);

        await connection.confirmTransaction(signature, "confirmed");
      }
      else {
        // `publicKey` will be null if the wallet isn't connected
        if (!publicKey) throw new Error("Wallet not connected!");
        // `signMessage` will be undefined if the wallet doesn't support it
        if (!signMessage)
          throw new Error("Wallet does not support message signing!");

        // Encode anything as bytes
        const message = new TextEncoder().encode(
          "I agree to change the details of this IDO."
        );
        // Sign the bytes using the wallet
        const signature = await signMessage(message);
        // Verify that the bytes were signed using the private key that matches the known public key

        if (!sign.detached.verify(message, signature, publicKey.toBytes()))
          throw new Error("Invalid signature!");
        // await setDoc(doc(idosCollectionRef, values.projectKey), values);
      }

      await updateDoc(idosCollectionRef, {
        name: values.name,
        description: values.description,
        websiteUrl: values.websiteUrl,
        whitepaperUrl: values.whitepaperUrl,
        twitter: values.twitter,
        telegram: values.telegram,
      });
      notification(
        "success",
        "The IDO was successfully updated.",
        "Updated IDO Details"
      );
      router.push(`/projects/${projectPubKey}`);
    }
    catch (error) {
      setLoading(false);
      notification(
        "danger",
        "Unable to sign the transaction.",
        "Transaction Error"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const nftStore = await new NftStore(provider, config).build();
      const project = await new Project(
        provider,
        nftStore,
        new PublicKey(projectPubKey || "")
      ).build();
      setProject(project);
      const data = await project.data();
      data.projectKey = projectPubKey;

      if (wallet.connected && data && data.owner == walletAddress) {
        data.startTime = data.startTime.toISOString().slice(0, -5);
        data.endTime = data.endTime.toISOString().slice(0, -5);
        setValues(data);
      }
      else router.push("/404");
    };

    if (projectPubKey && provider && config && wallet.connected)
      getDataByTokenAddress();
  }, [projectPubKey, provider, config, wallet.connected]);

  return (
    <section className="pt-6">
      {values ? (
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-9">
              <div className="col-span-6">
                <div className="mb-6 flex gap-x-5">
                  {/* <img
                        className="rounded-full h-16 p-1 m-0"
                        src={values.icon}
                        alt={values.name}
                      /> */}
                  <div className="w-1/2">
                    <a
                      id="features"
                      className="pb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                    >
                      {values.name}
                    </a>
                    <p className="max-w-prose truncate text-sm text-gray-200 lg:text-base">
                      {values.description}
                    </p>
                  </div>
                </div>
                <form className="divide-y- space-y-12 divide-gray-400 pr-16">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                      <h2 className="text-blue-gray-900 text-xl font-medium">
                        1. General Information
                      </h2>
                      <p className="text-blue-gray-500 mt-1 text-sm">
                        You can edit the general information of your project.
                      </p>
                    </div>

                    <div className="relative sm:col-span-6">
                      <label
                        htmlFor="project-name"
                        className="text-blue-gray-900 block text-sm font-medium"
                      >
                        Project Name <span className="text-purple-2">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                        name="name"
                        id="project-name"
                        className="required_ mt-1 block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                      />
                      {errors.name && (
                        <>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                            {errors.name}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="relative sm:col-span-6">
                      <label
                        htmlFor="description"
                        className="text-blue-gray-900 block text-sm font-medium"
                      >
                        Short Description{" "}
                        <span className="text-purple-2">*</span>
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
                        WhitePaper URL
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
                    {values.status == "DRAFT" && (
                      <>
                        <div className="relative sm:col-span-3">
                          <label
                            htmlFor="startTime"
                            className="text-blue-gray-900 block text-sm font-medium"
                          >
                            IDO Start Date{" "}
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
                            IDO End Date (usually 3 days){" "}
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
                      </>
                    )}

                    <div className="sm:col-span-6">
                      <h2 className="text-blue-gray-900 text-xl font-medium">
                        2. Social Networks
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
                        Twitter
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
                        Telegram
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
                </form>
              </div>
              <div className="col-span-3">
                <div className="sticky top-20 flex flex-col gap-y-6">
                  <div className="relative rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-half-strong">
                    <div className="relative px-6 py-6">
                      <h2 className="flex items-center gap-x-2 text-2xl font-bold">
                        {(!values.name.trim() && "Project Name") || values.name}
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
                            displayType="text"
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
                      <div className="mt-6 flex-col space-y-3">
                        <div className="flex items-center gap-x-3 font-medium text-gray-300">
                          <span>Hard Cap</span>
                          <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                          <span>
                            <NumberFormat
                              value={(!values.hardCap && "0") || values.hardCap}
                              className="foo"
                              displayType="text"
                              thousandSeparator={true}
                              prefix="$"
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
                              displayType="text"
                              thousandSeparator={true}
                              prefix="$"
                            />
                          </span>
                        </div>
                      </div>
                      <button
                        className={
                          "opacity-80-cursor-default mt-8 flex w-full items-center justify-center gap-x-2 rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium"
                        }
                        type="submit"
                        onClick={() =>
                          walletAddress ?? walletModal.setVisible(true)
                        }
                        disabled={loading}
                      >
                        {walletAddress ? (
                          !loading ? (
                            <>
                              <PencilAltIcon className="w-6" />
                              Submit Changes
                            </>
                          ) : (
                            <>Loading ...</>
                          )
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
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default EditProject;
