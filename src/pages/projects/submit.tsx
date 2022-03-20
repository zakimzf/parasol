import Container from "../../components/container";
import Heading from "../../components/heading";

const SubmitProject = () => (
  <section>
    <Heading tagline={"Parasol Launchpad"} title={"Submit Your Project (IDO)"}
      description={"Create your presale in a few clicks by holding PSOL tokens."} />
    <Container>
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
                  Enter you Token Address
                </label>
                <input
                  type="text"
                  name="token-address"
                  id="token-address"
                  placeholder={"SPL Token Address"}
                  pattern={"[A-Za-z0-9]*"}
                  className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                />
              </div>
              <p className="text-sm text-blue-gray-500 sm:col-span-6">
                The token information will be fetched from the Solana blockchain.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">

              {/*<div className="sm:col-span-6">*/}
              {/*  <label htmlFor="project-logo" className="block text-sm font-medium text-blue-gray-900 pb-2">*/}
              {/*    Project Logo*/}
              {/*  </label>*/}
              {/*  <div className="mt-1 flex items-center">*/}
              {/*    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">*/}
              {/*      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">*/}
              {/*        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />*/}
              {/*      </svg>*/}
              {/*    </span>*/}
              {/*    <button*/}
              {/*      type="button"*/}
              {/*      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
              {/*    >*/}
              {/*      Change*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="sm:col-span-6">
                <label htmlFor="project-cover" className="block text-sm font-medium text-blue-gray-900">
                  Project Cover
                </label>
                <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
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
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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

              <div className="sm:col-span-6">
                <label htmlFor="project-name" className="block text-sm font-medium text-blue-gray-900">
                  Project Name
                </label>
                <input
                  type="text"
                  name="project-name"
                  id="project-name"
                  className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                />
              </div>

              {/*<div className="sm:col-span-6">*/}
              {/*  <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>*/}
              {/*  <p className="mt-1 text-sm text-blue-gray-500">*/}
              {/*    This information will be displayed publicly so be careful what you share.*/}
              {/*  </p>*/}
              {/*</div>*/}

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                  Short Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm text-blue-gray-500">
                  Brief description of your project, no HTML or Markdown accepted.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="url" className="block text-sm font-medium text-blue-gray-900">
                  Website URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-blue-gray-900">Social Networks</h2>
                <p className="mt-1 text-sm text-blue-gray-500">
                  Please indicate your different social networks.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="twitter" className="block text-sm font-medium text-blue-gray-900">
                  Twitter
                </label>
                <input
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
                <input
                  type="text"
                  name="telegram"
                  id="telegram"
                  className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                />
              </div>
            </div>

          </form>
        </div>
        <div className="col-span-3">
          <div className="sticky flex flex-col gap-y-6 top-20">
            <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
              <div className={"relative px-6 pt-6 pb-6"}>
                <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                  [Project Name]
                  {/*<BadgeCheckIcon className={"h-7 text-purple-2"} />*/}
                </h2>
                <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                  <img className="h-8" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                  <div className="flex items-end gap-x-2 text-4xl font-bold">
                    500,000
                    <span>USDC</span>
                  </div>
                </div>
                <div className="prose prose-lg prose-invert">
                  <p>[Project Description]</p>
                  {/*<p>The allowlist for Orbitau is now available and you can apply for it below.</p>*/}
                  {/*<p>Note that you need to have at least 250 POLS Power to qualify for this allowlist.*/}
                  {/*  Learn more.*/}
                  {/*</p>*/}
                </div>
                <div className="flex-col space-y-3 mt-6">
                  <div className="flex font-medium items-center text-gray-300 gap-x-3">
                    <span>Hard Cap</span>
                    <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                    <span>$500,000</span>
                  </div>
                  <div className="flex font-medium items-center text-gray-300 gap-x-3">
                    <span>Price per Token</span>
                    <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                    <span>$0.21</span>
                  </div>
                </div>
                <button className={"w-full mt-8 opacity-80-cursor-default bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}>
                  Submit My Project
                </button>
              </div>
            </div>
            {/*<div className={"flex gap-x-6"}>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaFacebookF size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaTwitter size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaTelegramPlane size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaDiscord size={25} />*/}
            {/*	</button>*/}
            {/*</div>*/}
            {/*<button className={"bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg px-5 py-4 text-lg font-medium rounded-lg"}>*/}
            {/*	Apply Now*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </Container>
  </section>
)

export default SubmitProject