import Container from "../components/container";
import moment from "moment";
import Link from "next/link";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { Timestamp } from "firebase/firestore"

const projects = [
  {
    splToken: "Hmatmu1ktLbobSvim94mfpZmjL5iiyoM1zidtXJRAdLZ",
    projectIcon: "https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png",
    projectCover: "",
    projectName: "Parasol",
    symbol: "PSOL",
    description: "The First Community Governed IDO Platform.",
    websiteUrl: "https://parasol.finance",
    whitepaperUrl: "",
    tokenPrice: "0.21",
    hardCap: "",
    twitter: "https://twitter.com/parasol_finance",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 3290
  },
  {
    splToken: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    projectIcon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    projectCover: "",
    projectName: "Raydium",
    symbol: "RAY",
    description: "An avenue for the evolution of DeFi",
    websiteUrl: "https://raydium.io/",
    whitepaperUrl: "",
    tokenPrice: "0.05",
    hardCap: "",
    twitter: "https://twitter.com/RaydiumProtocol",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 489
  },
  {
    splToken: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    projectIcon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
    projectCover: "",
    projectName: "Serum",
    symbol: "SRM",
    description: "Serum is a decentralized exchange (DEX)",
    websiteUrl: "https://projectserum.com",
    whitepaperUrl: "",
    tokenPrice: "0.82",
    hardCap: "",
    twitter: "https://twitter.com/projectserum",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 29
  },
]

const Profile = function () {
  return (
    <>
      <section className={"mt-6"}>
        <Container>
          <div className="md:flex md:items-center md:justify-between md:space-x-5">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-md"
                    src="https://www.arweave.net/2if3SmxE2xLUtuour9dknU6R0RWSWK1fUDjBAgp1Qu8?ext=png"
                    alt=""
                  />
                  <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"/>
                </div>
              </div>
              <div className="pt-1.5">
                <h1 className="flex items-center gap-x-2 text-xl font-bold">
                  <span>6PK6b5AQ5h5ndTmdiNDXcA1ZVSwGRGtTeUgXeFpaFpns</span>
                  <BadgeCheckIcon className={"h-5 text-purple-2"}/>
                </h1>
                <p className="text-sm font-medium">
                  Joined Parasol Finance on {moment().format("LLL")}
                </p>
              </div>
            </div>
            <div
              className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <Link href={"/tiers"}>
                <a
                  className="inline-flex gap-x-2 items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-2 bg-white hover:bg-purple-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-2">
                  <TrendingUpIcon className={"w-5"}/>
                  Upgrade NFT Level
                </a>
              </Link>
              {/*<Link href={"/profile/kyc"}>*/}
              {/*  <a className="inline-flex gap-x-2 items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-2 bg-white hover:bg-purple-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-2">*/}
              {/*    <FingerPrintIcon className={"w-5"} />*/}
              {/*    Apply KYC*/}
              {/*  </a>*/}
              {/*</Link>*/}
            </div>
          </div>
          <h3 className={"text-xl font-bold mt-12 mb-6"}>Participation History</h3>
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table
                    className="min-w-full divide-y divide-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg">
                    <thead className="">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                        Project Name + Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                        Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                        Current Votes
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                        Submit Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                        End Date
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {projects.map((project) => <tr key={project.splToken}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={project.projectIcon} alt=""/>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">
                                {project.projectName}
                              </div>
                              <div className="text-gray-200 truncate">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex rounded-full bg-purple-2 px-2 text-xs font-semibold leading-5">
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="">{project.votes} votes</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="text-xs text-gray-200 mb-1">Project created on:</div>
                          <div className="">{moment(project.created.toDate()).format("LLL")}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="text-xs text-gray-200 mb-1">Voting ends on:</div>
                          <div className="">{moment(project.created.toDate()).add(5, "days").format("LLL")}</div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="flex items-center gap-x-2 text-purple-2 hover:text-indigo-900">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"/>
                            </svg>
                          Vote
                          </a>
                        </td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Profile;