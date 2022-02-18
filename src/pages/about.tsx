import Container from "../components/container";
import {DownloadIcon, MailOpenIcon} from "@heroicons/react/outline";
import Team from "../components/slices/team";
import Layout from "../components/layout";
import Hiring from "../components/slices/hiring";
import Link from 'next/link'

const About = () =>
    <Layout gap={24}>
        <section className={"relative pt-12"}>
            <Container>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1>
                            <span
                                className="block text-sm font-semibold uppercase tracking-wide text-gray-300 sm:text-base lg:text-sm xl:text-base">
                                Our Vision
                            </span>
                            <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                                The <span className={"text-purple-2"}>future</span> is already here with <span
                                className="text-purple-2">Parasol</span>.
                            </span>
                        </h1>
                        <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Parasol finance aims to be the first ever community-owned and governed IDO platform
                            built on Solana that serves their community over everything else.
                        </p>
                        <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            They will be providing that community all the control over which projects are put forward
                            and which can
                            participate in the IDO process.
                        </p>
                        <div className="mt-8 grid lg:flex gap-3 grid-cols-1 lg:grid-cols-2 justify-start">
                            <a href={"/whitepaper.pdf"}
                               className="flex items-center gap-x-2 justify-center px-10 bg-purple-2 py-3 text-base font-medium rounded-lg shadow-lg text-white bg-gradient-primary hover:from-pink-600 hover:to-purple-500">
                                <DownloadIcon className={"h-5"}/>
                                Download White Paper
                            </a>
                            <Link href={"/contact"}>
                                <a type="button"
                                   className="flex items-center gap-x-2 justify-center px-7 py-3 text-base font-medium border border-white hover:bg-white hover:text-purple-600 rounded-lg shadow-lg text-white hover:to-purple-500">
                                    <MailOpenIcon className={"h-5"}/>
                                    Contact Us
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="mt-12  relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                            <button type="button"
                                    className=" block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Watch our video to learn more</span>
                                <div
                                    className={"absolute rounded-lg -inset-y-12 inset-x-12 w-full h-full"}>
                                    <svg
                                        className={"w-full h-full"}
                                        fill="none">
                                        <defs>
                                            <pattern
                                                id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                                                x={0}
                                                y={0}
                                                width={20}
                                                height={20}
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <rect x={0} y={0} width={4} height={4} className="text-purple-2"
                                                      fill="currentColor"/>
                                            </pattern>
                                        </defs>
                                        <rect width={"100%"} height={"100%"}
                                              fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>
                                    </svg>
                                </div>
                                <img
                                    className="w-full relative"
                                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt=""
                                />
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center"
                                     aria-hidden="true">
                                    <svg className="h-20 w-20 text-purple-2" fill="currentColor" viewBox="0 0 84 84">
                                        <circle opacity="0.9" cx={42} cy={42} r={42} fill="white"/>
                                        <path
                                            d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
        <Team/>
        <Hiring/>
    </Layout>

export default About;
