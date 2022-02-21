import {Disclosure} from '@headlessui/react'
import {ChevronDoubleRightIcon, ChevronDownIcon} from '@heroicons/react/outline'
import Heading from "../components/utils/heading";
import Container from "../components/container";

const faqs = [
    {
        question: "What Is Parasol Finance?",
        answer:
            "Parasol Finance is the first-ever community-governed IDO ecosystem that is built on Solana with the needs of both investors and projects alike."
    },
    {
        question: "What Is Staking?",
        answer:
            "Staking is the act of securing cryptocurrency assets on a platform or network for a reward or annualized returns that are paid out regularly."
    },
    {
        question: "What is Yield Farming?",
        answer:
            "Yield Farming in the cryptocurrency industry is earning an interest on your cryptocurrency investment. The initial investment value grows over the time that the asset is staked or landed out."
    },
    {
        question: "What Is Decentralized Exchange (DEX)?",
        answer:
            "A decentralized exchange or DEX is a financial services platform used for trading, buying, and selling digital assets. On a DEX, users are granted the chance to transact peer-to-peer and directly on the blockchain without a centralized intermediary. Decentralized exchanges are often democratically managed with decentralized governance organizations, however, they do not serve as custodians of users' funds. In the absence of a central authority charging fees for services, DEXs are cheaper than their centralized counterparts."
    },
    {
        question: "What is an Initial Dex Offering (IDO)?",
        answer:
            "An IDO is an approach to crowdfunding funds for new cryptocurrency projects. It means the project is launching their native coins or tokens through a Decentralized Exchange to be used within the ecosystem and the protocol. It also gives the protocol funds to further develop and pay for business expenses.",
    },
    {
        question: "What is Decentralized Autonomous Exchange (DAO)?",
        answer:
            "A DAO is a community-led entity that has no central authority. It is fully transparent and autonomous. The business rules and activities are decided by the holders of the given governance token, usually through voting processes."
    },
    {
        question: "What Is an Airdrop?",
        answer:
            "Airdrop is referred to as a token distribution method whereby assets are directly transmitted to user wallets without any charges. Airdrops are also used to raise awareness around a project or as part of a fundraising mechanism."
    },
    {
        question: "What Is an NFT?",
        answer:
            "Non-fungible tokens, or NFTs, are the latest cryptocurrency phenomenon to go mainstream in the industry. Non-fungible tokens, or NFTs, are pieces of digital content directly stored to the blockchain."
    },
    {
        question: "Who runs Parasol Finance?",
        answer:
            "Presently, decisions about Parasol Finance are taken by the core team, however we expect to turn this into a DAO-governed model as soon as possible."
    }
]

export default () =>
    <>
        <Heading tagline={"Getting Help"} title={"Frequently Asked Questions"}
                 description={"The most common questions are answered below."}/>
        <section>
            <div className={"max-w-3xl mx-auto"}>
                <dl className="mt-6 space-y-6 divide-y divide-gray-500">
                    {faqs.map((faq) => <Disclosure as="div" key={faq.question} className="pt-6">
                        {({open}) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex justify-between items-start ">
                                        <span className="font-medium text-white">{faq.question}</span>
                                        <span className="ml-6 h-7 flex items-center">
                                            <ChevronDownIcon
                                                className={`h-6 w-6 transform ${open ? '-rotate-180' : 'rotate-0'}`}
                                                aria-hidden="true"/>
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                    <p className="text-base ">{faq.answer}</p>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>)}
                </dl>
            </div>
        </section>
        <section>
            <Container>
                <div className={"flex justify-center pt-12"}>
                    <a href={"https://docs.parasol.finance/parasol-ecosystem/frequently-asked-questions"}
                       className={`flex items-center justify-center items-center gap-x-1 g-purple-2 text-white bg-transparent border border-white px-7 py-3 text-base font-medium rounded-md`}>
                        See The Full FAQ
                        <ChevronDoubleRightIcon className={"w-4"}/>
                    </a>
                </div>
            </Container>
        </section>
    </>
