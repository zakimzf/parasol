import React, { useEffect, useState, Fragment, useMemo } from "react";
import {Listbox, RadioGroup, Transition} from "@headlessui/react"
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid"
import Container from "../../components/container";
import Heading from "../../components/heading";
import NumberFormat from "react-number-format";
import axios from "axios";
import {CheckCircleIcon} from "@heroicons/react/outline";
import { db } from "../../utils/firebase";
import { getBase64 } from "../../utils/functions";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { useWallet } from "@solana/wallet-adapter-react";

const exchanges = [
  { id: 1, name: "Raydium | One of the Biggest Solana AMM" },
]

const packages = [
  { name: "Basic", description: "Listing only without Ads.", price: 2100 },
  { name: "Ultimate", description: "Listing and promotion.", price: 5000 }
];

const SubmitProject = () => {
  // const [selectedPackage, setSelectedPackage] = useState(packages[0])

  const { publicKey } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const idosCollectionRef = collection(db, "idos");
  
  const [values, setValues] = useState({
    publicKey: base58,
    splToken : "",
    projectIcon: "",
    projectCover : "",
    projectName : "", 
    symbol: "",
    description : "",
    websiteUrl : "",
    whitepaperUrl : "",
    dex: exchanges[0],
    tokenPrice : "",
    hardCap : "",
    twitter : "",
    telegram : "",
    package: packages[0]
  });
  
  const handleChange = async(e:any) => {
    let { name, value } = e.target
    if(name == "projectCover"){
      let file = e.target.files[0];
      await getBase64(file, ( result:any ) => {
        setValues({...values, [name]: result})
      })
    }else{
      setValues({...values, [name]: value})
    }
  }
  console.log(values)
  useEffect(() => {
    const address = values.splToken;
    if(address){
      axios.get(`https://public-api.solscan.io/token/meta?tokenAddress=${address}`).then((res)=>{
        const {data} = res;
        if(data){
          const obj = values;
          obj.projectName = data.name || "";
          obj.symbol = data.symbol || "";
          obj.projectIcon = data.icon || "";
          obj.websiteUrl = data.website || "";
          obj.twitter = data.twitter || "";
          obj.telegram = data.telegram || "";
  
          setValues((preValues) => ({...preValues, ...obj}));
        }
        
      }).catch(error => {
        // console.log(error)
      });
    }
  
  }, [values.splToken]);

  const handleSubmit = async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    if(base58){
      values.publicKey = base58;
      await addDoc(idosCollectionRef, values);
    }
    console.log(4444444, base58)
  }
  
  
  return (
    <section>
      <Heading tagline={"Parasol Launchpad"} title={"Submit Your Project (IDO)"}
        description={"Create your presale in a few clicks by holding PSOL tokens."}/>
      <Container>
        <form  onSubmit={handleSubmit}>
          <div className="grid grid-cols-9">
            <div className="col-span-6">
              <form className="space-y-12 pr-12 divide-y- divide-gray-400">

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-xl font-medium text-blue-gray-900">1. General Information</h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      Please provide your SPL token address.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="email-address" className="block text-sm font-medium text-blue-gray-900">
                      Enter your Token Address <span className="text-purple-2">*</span>
                    </label>
                    <input onChange={handleChange} value={values.splToken}
                      type="text"
                      name="splToken"
                      id="token-address"
                      placeholder={"SPL Token Address"}
                      pattern={"[A-Za-z0-9]*"}
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                      required={true}
                    />
                  </div>
                  <p className="text-sm text-blue-gray-500 sm:col-span-6">
                    The token information will be fetched from the Solana blockchain.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">

                  <div className="sm:col-span-6">
                    <label htmlFor="project-cover" className="block text-sm font-medium text-blue-gray-900">
                      Project Cover <span className="text-purple-2">*</span>
                    </label>
                    <div
                      className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                      <div className="space-y-1 text-center">
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
                            <span>Upload a file</span>
                            <input onChange={handleChange} id="file-upload" name="projectCover" type="file" className="sr-only"/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-blue-gray-500">
                      We need a cover in the following format: 1920x1080px.
                    </p>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="project-name" className="block text-sm font-medium text-blue-gray-900">
                      Project Name <span className="text-purple-2">*</span>
                    </label>
                    <input onChange={handleChange} value={values.projectName}
                      type="text"
                      name="projectName"
                      id="project-name"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="project-name" className="block text-sm font-medium text-blue-gray-900">
                      Symbol <span className="text-purple-2">*</span>
                    </label>
                    <input onChange={handleChange} value={values.symbol}
                      type="text"
                      name="projectName"
                      id="project-name"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                      Short Description <span className="text-purple-2">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea onChange={handleChange}
                        id="description"
                        name="description"
                        rows={4}
                        className="block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                        value={values.description}
                      >
                        
                      </textarea>
                    </div>
                    <p className="mt-3 text-sm text-blue-gray-500">
                      Brief description of your project, no HTML or Markdown accepted.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="website-url" className="block text-sm font-medium text-blue-gray-900">
                      Website URL <span className="text-purple-2">*</span>
                    </label>
                    <input onChange={handleChange} value={values.websiteUrl}
                      type="text"
                      name="websiteUrl"
                      id="website-url"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="white-paper" className="block text-sm font-medium text-blue-gray-900">
                      WhitePaper URL
                    </label>
                    <input onChange={handleChange} value={values.whitepaperUrl}
                      type="text"
                      name="whitepaperUrl"
                      id="white-paper"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-xl font-medium text-blue-gray-900">2. Token &amp; Liquidity</h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      Calculate the amount of token for your IDO, and the liquidity.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <Listbox value={values.dex} onChange={handleChange}>
                      {({open}) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-blue-gray-900">Select your Target AMM (Dex):</Listbox.Label>
                          <div className="mt-1 relative">
                            <Listbox.Button
                              className="w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg px-3 py-2 text-left cursor-default">
                              <span className="block truncate">{values.dex.name}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {exchanges.map((dex) => (
                                  <Listbox.Option
                                    key={dex.id}
                                    className={({active}) => `${active ? "text-white bg-indigo-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-3 pr-9`}
                                    value={dex}
                                  >
                                    {({selected, active}) => (
                                      <>
                                        <span
                                          className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>
                                          {dex.name}
                                        </span>
                                        {selected ? (
                                          <span className={`${active ? "text-white" : "text-indigo-600"} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>

                  <div className={"sm:col-span-3"}>
                    <label htmlFor="token-price" className="block text-sm font-medium text-blue-gray-900">
                      Token Price
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-200 sm:text-sm">$</span>
                      </div>
                      <input onChange={handleChange} value={values.tokenPrice}
                        type="number"
                        name="tokenPrice"
                        id="token-price"
                        className="block w-full pl-7 pr-12 sm:text-sm w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                        placeholder="0.00"
                        min="0.01"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-200 flex items-center gap-x-1 sm:text-sm" id="price-currency">
                          <img className="w-4" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                          USDC
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={"sm:col-span-3"}>
                    <label htmlFor="hard-cap" className="block text-sm font-medium text-blue-gray-900">
                      Hard Cap
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-200 sm:text-sm">$</span>
                      </div>
                      <input onChange={handleChange} value={values.hardCap}
                        type="number"
                        name="hardCap"
                        id="hard-cap"
                        className="block w-full pl-7 pr-12 sm:text-sm w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-200 flex items-center gap-x-1 sm:text-sm" id="price-currency">
                          <img className="w-4" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                          USDC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-xl font-medium text-blue-gray-900">3. Social Networks</h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      Please indicate your different social networks.
                    </p>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="twitter" className="block text-sm font-medium text-blue-gray-900">
                      Twitter
                    </label>
                    <input onChange={handleChange} value={values.twitter}
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="telegram" className="block text-sm font-medium text-blue-gray-900">
                      Telegram
                    </label>
                    <input onChange={handleChange} value={values.telegram}
                      type="text"
                      name="telegram"
                      id="telegram"
                      className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <h2 className="text-xl font-medium text-blue-gray-900">4. Choose Pricing</h2>
                    <p className="mt-1 text-sm text-blue-gray-500">
                      Choose the package that best suits your needs, you can read more regarding this pricing <a href={""} className={"text-purple-2"} target={"_blank"} rel="noreferrer">here</a> .
                    </p>
                  </div>
                  <div className="sm:col-span-5">
                    <RadioGroup 
                      value={values.package} 
                      onChange={(pac)=>{setValues({...values, ["package"]: pac})}}
                    >
                      <RadioGroup.Label className="block text-sm font-medium text-blue-gray-900">Choose Package</RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {packages.map((size) => (
                          <RadioGroup.Option
                            as="div"
                            key={size.name}
                            value={size}
                            className={({ active }) => "relative border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"}
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex-1 flex">
                                  <div className="flex flex-col">
                                    <RadioGroup.Label as="span" className="block text-sm font-medium">
                                      {size.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm">
                                      {size.description}
                                    </RadioGroup.Description>
                                    <RadioGroup.Description as="span" className="mt-3 flex items-center gap-x-2 text-sm font-medium">
                                      <img className="h-4" src={"/images/logos/parasol-logo-mark-reverse-rgb.svg"} alt="psol" />
                                      <NumberFormat
                                        value={!size.price && "0" || size.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                      <span>PSOL</span>
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                <CheckCircleIcon
                                  className={`${!checked ? "invisible" : ""} h-5 w-5 text-purple-2`}
                                  aria-hidden={true}
                                />
                                <div
                                  className={`${checked ? "border-purple-2" : "border-transparent"} border-2 absolute -inset-px rounded-lg pointer-events-none`}
                                  aria-hidden={true}
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-3">
              <div className="sticky flex flex-col gap-y-6 top-20">
                <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                  <div className={"relative px-6 pt-6 pb-6"}>
                    <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                      {!values.projectName.trim() && "Project Name" || values.projectName}
                    </h2>
                    <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                      <img className="h-8"
                        src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                        alt="USDC"/>
                      <div className="flex items-end gap-x-2 text-4xl font-bold">
                        <NumberFormat
                          value={!values.hardCap && "0" || values.hardCap}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span>USDC</span>
                      </div>
                    </div>
                    <div className="prose prose-lg prose-invert">
                      <p>{!values.description.trim() && "Project Description" || values.description}</p>
                    </div>
                    <div className="flex-col space-y-3 mt-6">
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Hard Cap</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
                        <span>
                          <NumberFormat
                            value={!values.hardCap && "0" || values.hardCap}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Price per Token</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
                        <span>                      
                          <NumberFormat
                            value={!values.tokenPrice && "0" || values.tokenPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                    </div>
                    <button
                      className={"w-full mt-8 opacity-80-cursor-default bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}
                      type="submit"
                    >
                      Submit My Project
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
}

export default SubmitProject