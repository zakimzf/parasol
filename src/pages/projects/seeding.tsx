import Container from "../../components/container";
import Heading from "../../components/heading";
import { Timestamp } from "firebase/firestore";
import Apply from "../../components/slices/apply";
import moment from "moment";
import { ChevronDoubleUpIcon } from "@heroicons/react/outline";
import Head from "next/head";
import React from "react";
import Layout from "../../components/layout";

const projects = [
  {
    splToken: "PFo38bhqnYn9ntEs6GHN5LAi26QX1tBxMabmqu5LtX9",
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

const Seeding = () =>
  <>
    <Head>
      <title>Parasol Finance ($PSOL) | Projects Seeding</title>
      <meta name="title" content="Parasol Finance ($PSOL) | Projects Seeding" />
      <meta property="og:image" content="/assets/preview/seeding.png" />
      <meta property="twitter:image" content="/assets/preview/seeding.png" />
    </Head>
    <Heading tagline={"Parasol Finance"} title={"Projects Seeding"}
      description={"Vote for the new projects that have just arrived."}/>
    <Layout>
      <section>
        <Container>
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
                          <a href="#" className="button p-1 gap-x-1 text-sm bg-none bg-purple-2 rounded-md">
                            <ChevronDoubleUpIcon className={"w-3"} />
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
      <Apply/>
    </Layout>
  </>

export default Seeding;