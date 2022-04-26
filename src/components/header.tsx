import * as React from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import {
  AnnotationIcon,
  BookOpenIcon,
  CollectionIcon,
  FolderAddIcon,
  InformationCircleIcon,
  MailIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import WalletConnect from "./wallet-connector/WalletConnect"
// import { WalletConnect } from "./wallet-connector";
import { recentPosts, toolsMenu } from "../constants/header";

import Logo from "/public/assets/logos/parasol-logo-inverted-rgb.svg";

const Header = () => (
  <Popover className="relative">
    <div className="max-w-7xl md:mt-6 text-gray-200 mx-auto px-5">
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1 min-w-[249px]">
          <Link href={"/"}>
            <a>
              <Image src={Logo} className="h-5" alt="logo"/>
            </a>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-[#231f38] shadow-xl shadow-half-strong border border-gray-800 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-2">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true"/>
          </Popover.Button>
        </div>
        <Popover.Group
          as="nav"
          className="hidden md:flex items-baseline space-x-10"
        >
          <Link href={"/swap"}>
            <a className="font-bold text-sm hover:text-gray-300">Swap</a>
          </Link>
          <Popover className="relative">
            {({ open = true }) => {
              return (
                <>
                  <Popover.Button className="group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300">
                    <span>Launchpad</span>
                    <ChevronDownIcon
                      className={"h-5 w-5 group-hover:text-gray-300"}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-20 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-[#231f38] gap-8 px-7 py-8">
                          <Link href={"/projects"}>
                            <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                              <CollectionIcon
                                className="flex-shrink-0 h-6 w-6 text-purple-2"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-white">
                                  Upcoming Projects
                                </p>
                                <p className="mt-1 text-sm text-gray-300">
                                  All the new projects of Parasol Finance
                                </p>
                              </div>
                            </a>
                          </Link>
                          <Link href={"/tiers"}>
                            <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={
                                  "flex-shrink-0 h-6 w-6 text-purple-2"
                                }
                                viewBox="0 0 161.382 185.671"
                              >
                                <g
                                  id="layer1"
                                  transform="translate(-26.12 -62.248)"
                                >
                                  <path
                                    d="M66.5,224.731l-40.3-23.242-.037-46.373-.037-46.373L65.988,85.637c21.927-12.709,40.095-23.218,40.372-23.353.537-.262,1.685.388,38.366,21.736,3.59,2.089,14.662,8.512,24.606,14.273l18.08,10.475.044,46.3.044,46.3L162.94,215.58c-13.509,7.817-31.584,18.28-40.166,23.25s-15.686,9.061-15.787,9.09S88.666,237.514,66.5,224.731Zm56.974,2.71L158.353,207.2,177.8,195.909l-.044-41.024-.044-41.024-19.667-11.392c-10.817-6.266-26.692-15.464-35.278-20.44s-15.709-9.086-15.829-9.132-16.172,9.151-35.67,20.439L35.815,113.859l.04,41.087.04,41.087,35.527,20.513,35.527,20.513.545-.331c.3-.182,7.49-4.362,15.979-9.288ZM88.062,216.4l-4.807-3.193V96.9l11.738-7.015c6.591-3.939,11.847-6.973,11.988-6.919s6.838,3.955,14.889,8.672l14.639,8.576-.929,1.442c-.511.793-1.712,2.672-2.669,4.176s-1.8,2.8-1.866,2.882-5.545-3-12.167-6.85c-9.065-5.269-12.115-6.962-12.342-6.851-.166.081-3.289,1.849-6.941,3.929l-6.639,3.782v46.145l17.859.045,17.859.045.046,5.953.046,5.953H92.958l-.045,29.365L92.869,219.6Zm-17.148-9.77c-3.026-1.764-3.456-2.071-3.627-2.585-.107-.321-3.443-12.783-7.414-27.694l-7.221-27.111-.045,23.362c-.025,12.849-.079,23.362-.121,23.362-.106,0-8.074-4.588-8.345-4.806-.175-.14-.22-7.183-.22-34.154V123.031l4.275-2.412c2.351-1.327,4.3-2.386,4.333-2.355s.366,1.117.743,2.412c.758,2.6,4.556,15.009,8.477,27.689l2.543,8.225.088-23.726.088-23.726,5.1-2.8c2.8-1.54,5.124-2.8,5.159-2.8s.064,23.654.064,52.564c0,41.942-.045,52.561-.22,52.547-.121-.009-1.766-.917-3.654-2.018Zm77.6-44.224,0-42.554-1.629-1.054c-5.5-3.561-10.889-7.182-10.889-7.319,0-.088,1.123-1.875,2.5-3.971,1.8-2.751,2.569-3.784,2.757-3.711.143.055,7.2,4.481,15.672,9.836l15.411,9.735v5.519a53.2,53.2,0,0,1-.144,5.519c-.079,0-3-1.948-6.482-4.328l-6.338-4.328-.088,36.715-.088,36.715-5.2,2.891c-2.862,1.59-5.263,2.891-5.336,2.891s-.134-19.149-.135-42.553Z"
                                    fill="currentColor"
                                  />
                                </g>
                              </svg>
                              <div className="ml-4">
                                <p className="text-base font-medium text-white">
                                  NFT Access Keys
                                </p>
                                <p className="mt-1 text-sm text-gray-300">
                                  Our unique tiers system using NFTs
                                </p>
                              </div>
                            </a>
                          </Link>
                          {/*                <Link href={"/projects/seeding"}>*/}
                          {/*                  <a className="flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">*/}
                          {/*                    <svg*/}
                          {/*                      className={*/}
                          {/*                        "flex-shrink-0 h-6 w-6 text-purple-2"*/}
                          {/*                      }*/}
                          {/*                      viewBox="0 0 512 512"*/}
                          {/*                      xmlSpace="preserve"*/}
                          {/*                    >*/}
                          {/*                      <path*/}
                          {/*                        d="M400.278,367.668c18.455-17.355,33.987-38.867,45.786-63.322c16.156-33.489,24.644-71.784,24.644-110.747*/}
                          {/*c0-38.963-8.567-77.258-24.724-110.747c-15.857-32.866-38.655-60.429-65.901-79.708c-5.924-4.192-13.857-4.192-19.781,0*/}
                          {/*c-27.248,19.279-50.035,46.841-65.892,79.708c-16.156,33.489-24.698,71.784-24.698,110.747c0,3.265,0.081,6.523,0.201,9.777*/}
                          {/*c-2.809-1.624-5.639-3.217-8.514-4.742c-34.422-18.254-72.256-28.651-109.412-30.067c-36.458-1.384-71.49,5.826-101.287,20.866*/}
                          {/*c-6.48,3.271-10.192,10.271-9.264,17.471c4.266,33.104,17.942,66.146,39.55,95.553c22.017,29.964,51.848,55.45,86.27,73.704*/}
                          {/*s72.254,28.651,109.411,30.067c2.956,0.113,5.9,0.169,8.834,0.169c30.13,0,59.253-5.936,84.781-17.316*/}
                          {/*c28.406,15.556,46.607,45.512,46.607,78.287v27.515c0,9.454,7.664,17.118,17.118,17.118s17.118-7.664,17.118-17.118v-27.515*/}
                          {/*C451.124,427.482,431.658,390.617,400.278,367.668z M183.295,345.916c-54.931-29.13-94.489-78.529-105.786-131.071*/}
                          {/*c49.833-20.127,112.919-15.094,167.849,14.037c10.603,5.623,20.625,12.008,29.989,19.017c4.148,19.747,10.531,38.77,19.058,56.447*/}
                          {/*c1.376,2.853,2.823,5.651,4.304,8.422l-24.356-12.915c-8.352-4.429-18.714-1.248-23.143,7.104*/}
                          {/*c-4.429,8.353-1.249,18.714,7.104,23.143l69.973,37.107C282.87,378.056,230.123,370.749,183.295,345.916z M387.604,331.328*/}
                          {/*c0.001-35.134-0.203-81.485-0.239-89.197c-0.043-9.428-7.699-16.943-17.117-16.943c-0.026,0-0.054,0-0.08,0*/}
                          {/*c-9.454,0-17.083,7.645-17.04,17.099c0.124,27.157,0.237,62.941,0.237,89.718c-31.044-35.057-49.42-85.23-49.42-138.406*/}
                          {/*c0-62.177,25.109-120.269,66.236-154.866c41.125,34.596,66.236,92.688,66.236,154.866*/}
                          {/*C436.418,246.429,418.282,296.302,387.604,331.328z"*/}
                          {/*                        fill={"currentColor"}*/}
                          {/*                      />*/}
                          {/*                    </svg>*/}
                          {/*                    <div className="ml-4">*/}
                          {/*                      <p className="text-base font-medium text-white">*/}
                          {/*                        Projects Seeding*/}
                          {/*                      </p>*/}
                          {/*                      <p className="mt-1 text-sm text-gray-300">*/}
                          {/*                        Vote for the new projects that have just arrived.*/}
                          {/*                      </p>*/}
                          {/*                    </div>*/}
                          {/*                  </a>*/}
                          {/*                </Link>*/}
                          {/*<div className="w-full border-t border-white border-opacity-10"/>*/}
                          {/*<Link href="/tiers" passHref>*/}
                          {/*  <a className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5">*/}
                          {/*    <img*/}
                          {/*      className="w-6 h-6 rounded-full"*/}
                          {/*      src="https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm"*/}
                          {/*      width={0}*/}
                          {/*      height={0}*/}
                          {/*      alt="project"*/}
                          {/*    />*/}
                          {/*    <div className="ml-4">*/}
                          {/*      <p className="flex items-center text-base font-medium text-white">*/}
                          {/*        Tina Arena*/}
                          {/*        <label*/}
                          {/*          className={"bg-white bg-opacity-10 p-1 py-[2px] ml-2 rounded text-xs"}>*/}
                          {/*          Sponsored*/}
                          {/*        </label>*/}
                          {/*      </p>*/}
                          {/*      <p className="mt-1 text-sm text-gray-300">*/}
                          {/*        Thetan Arena is an esport game.*/}
                          {/*      </p>*/}
                          {/*    </div>*/}
                          {/*  </a>*/}
                          {/*</Link>*/}
                        </div>
                        <div className="py-4 bg-[#2a2542] sm:px-8 sm:py-6">
                          <div className="flow-root">
                            <Link href={"/projects/submit"}>
                              <a
                                className="flex items-start font-medium text-gray-200"
                                rel="noreferrer">
                                <FolderAddIcon className="h-6 w-6 text-purple-2"/>
                                <div className="ml-3">
                                  <p className="text-base font-medium text-white">
                                    Submit Your Project
                                  </p>
                                  <p className="mt-1 text-sm text-gray-300">
                                    You can launch your project in a few clicks
                                  </p>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              );
            }}
          </Popover>
          <Link href={"/staking"}>
            <a className="font-bold text-sm hover:text-gray-300">Staking</a>
          </Link>
          <Popover className="relative">
            {({ open = true }) => {
              return (
                <>
                  <Popover.Button className="group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300">
                    <span>Tools</span>
                    <ChevronDownIcon
                      className={"h-5 w-5 group-hover:text-gray-300"}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-20 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-[#231f38] gap-8 px-7 py-8">
                          {toolsMenu.map((item) => (
                            <a
                              key={item.name}
                              href={"https://forms.gle/eWqpaPdGMX8joTem9"}
                              className="-m-3 p-3 p flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"
                            >
                              <item.icon
                                className="flex-shrink-0 h-6 w-6 text-purple-2"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-white">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-white">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              );
            }}
          </Popover>
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button
                  className={
                    "group inline-flex items-center font-bold text-sm hover:text-white"
                  }
                >
                  <span>More</span>
                  <ChevronDownIcon
                    className={"ml-1 h-5 w-5 group-hover:text-white"}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-20 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                    <div className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-[#231f38] px-5 py-6 sm:gap-8 sm:p-8">
                        {/*<Link href={"/about"}>*/}
                        {/*  <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">*/}
                        {/*    <InformationCircleIcon*/}
                        {/*      className={"flex-shrink-0 h-6 w-6 text-purple-2"}/>*/}
                        {/*    <div className="ml-4">*/}
                        {/*      <p className="text-base font-medium text-white">About Parasol*/}
                        {/*        Finance*/}
                        {/*      </p>*/}
                        {/*      <p className="mt-1 text-sm text-gray-300">*/}
                        {/*        Learn more about the Parasol Finance project.*/}
                        {/*      </p>*/}
                        {/*    </div>*/}
                        {/*  </a>*/}
                        {/*</Link>*/}
                        <Link href={"/frequently-asked-questions"}>
                          <a className="flex items-start -m-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5">
                            <AnnotationIcon
                              className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                            />
                            <div className="ml-4">
                              <p className="text-base font-medium text-white">
                                Frequently Asked Questions (FAQ)
                              </p>
                              <p className="mt-1 text-sm text-white">
                                The most frequently asked questions.
                              </p>
                            </div>
                          </a>
                        </Link>
                        <a
                          href="https://docs.parasol.finance/"
                          className="flex items-start -m-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5"
                        >
                          <BookOpenIcon
                            className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                          />
                          <div className="ml-4">
                            <p className="text-base font-medium text-white">
                              Read Documentation
                            </p>
                            <p className="mt-1 text-sm text-white">
                              Some questions about how our platform works?
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://parasol-finance.medium.com/"
                          className="flex items-start -m-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M4.285 7.269a.733.733 0 0 0-.24-.619l-1.77-2.133v-.32h5.498l4.25 9.32 3.736-9.32H21v.319l-1.515 1.451a.45.45 0 0 0-.168.425v10.666a.448.448 0 0 0 .168.425l1.479 1.451v.319h-7.436v-.319l1.529-1.487c.152-.15.152-.195.152-.424V8.401L10.95 19.218h-.575L5.417 8.401v7.249c-.041.305.06.612.275.833L7.684 18.9v.319H2.036V18.9l1.992-2.417a.971.971 0 0 0 .257-.833V7.269z"
                              fill={"currentColor"}
                            />
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-white">
                              Official Medium Blog
                            </p>
                            <p className="mt-1 text-sm text-white">
                              Read our latest articles on Medium.com.
                            </p>
                          </div>
                        </a>
                        <Link href={"/contact"}>
                          <a className="flex items-start -m-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5">
                            <MailIcon
                              className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                            />
                            <div className="ml-4">
                              <p className="text-base font-medium text-white">
                                Contact Us
                              </p>
                              <p className="mt-1 text-sm text-white">
                                Something to tell us, please fill the form.
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="px-5 py-5 bg-[#2a2542] sm:px-8 sm:py-8">
                        <div>
                          <h3 className="text-sm tracking-wide font-medium text-white uppercase">
                            Recent Posts
                          </h3>
                          <ul role="list" className="mt-4 space-y-4">
                            {recentPosts.map((post) => (
                              <li key={post.id} className="text-base truncate">
                                <a
                                  href={post.href}
                                  className="font-medium text-white"
                                >
                                  {post.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-5 text-sm">
                          <a
                            href="https://parasol-finance.medium.com/"
                            target={"_blank"}
                            className="font-medium text-purple-2 hover:text-purple-1"
                            rel="noreferrer"
                          >
                            {" "}
                            View all posts{" "}
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </Popover.Group>
        <div className="hidden md:flex items-center gap-x-3 justify-end md:flex-1 lg:w-0">
          <WalletConnect Width={"origin"}/>
        </div>
      </div>
    </div>
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden z-50 bg-header-color"
      >
        <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-header-color">
          <div className="pt-6 px-5">
            <div className="flex items-center justify-between">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href={"/"}>
                  <a>
                    <Image src={Logo} className="h-5" alt="logo"/>
                  </a>
                </Link>
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-[#231f38] shadow-xl shadow-half-strong border border-gray-800 rounded-md p-2 inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-2">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true"/>
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="pb-6 px-6">
            <div className="mt-5 w-full">
              <WalletConnect Width={"full"}/>
            </div>
            <div className="flex flex-col gap-6">
              <Link href={"/swap"}>
                <a className="font-bold text-sm pt-6 hover:text-white text-white">
                  Swap
                </a>
              </Link>
              <Popover className="relative">
                {({ open = true }) => {
                  return (
                    <>
                      <Popover.Button className="group inline-flex gap-x-1 items-center font-bold text-sm hover:text-white text-white">
                        <span>Launchpad</span>
                        <ChevronDownIcon
                          className={"h-5 w-5 group-hover:text-white"}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="z-20 transform w-screen">
                          <div className="overflow-hidden">
                            <div className="relative grid gap-6 py-4">
                              <Link href={"/projects"}>
                                <a className="flex items-start rounded-lg">
                                  <CollectionIcon
                                    className="flex-shrink-0 h-6 w-6 text-purple-2"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      Upcoming Projects
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                      All the new projects of Parasol Finance
                                    </p>
                                  </div>
                                </a>
                              </Link>
                              <Link href={"/tiers"}>
                                <a className="flex items-start rounded-lg">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                                    viewBox="0 0 161.382 185.671">
                                    <g
                                      id="layer1"
                                      transform="translate(-26.12 -62.248)">
                                      <path
                                        d="M66.5,224.731l-40.3-23.242-.037-46.373-.037-46.373L65.988,85.637c21.927-12.709,40.095-23.218,40.372-23.353.537-.262,1.685.388,38.366,21.736,3.59,2.089,14.662,8.512,24.606,14.273l18.08,10.475.044,46.3.044,46.3L162.94,215.58c-13.509,7.817-31.584,18.28-40.166,23.25s-15.686,9.061-15.787,9.09S88.666,237.514,66.5,224.731Zm56.974,2.71L158.353,207.2,177.8,195.909l-.044-41.024-.044-41.024-19.667-11.392c-10.817-6.266-26.692-15.464-35.278-20.44s-15.709-9.086-15.829-9.132-16.172,9.151-35.67,20.439L35.815,113.859l.04,41.087.04,41.087,35.527,20.513,35.527,20.513.545-.331c.3-.182,7.49-4.362,15.979-9.288ZM88.062,216.4l-4.807-3.193V96.9l11.738-7.015c6.591-3.939,11.847-6.973,11.988-6.919s6.838,3.955,14.889,8.672l14.639,8.576-.929,1.442c-.511.793-1.712,2.672-2.669,4.176s-1.8,2.8-1.866,2.882-5.545-3-12.167-6.85c-9.065-5.269-12.115-6.962-12.342-6.851-.166.081-3.289,1.849-6.941,3.929l-6.639,3.782v46.145l17.859.045,17.859.045.046,5.953.046,5.953H92.958l-.045,29.365L92.869,219.6Zm-17.148-9.77c-3.026-1.764-3.456-2.071-3.627-2.585-.107-.321-3.443-12.783-7.414-27.694l-7.221-27.111-.045,23.362c-.025,12.849-.079,23.362-.121,23.362-.106,0-8.074-4.588-8.345-4.806-.175-.14-.22-7.183-.22-34.154V123.031l4.275-2.412c2.351-1.327,4.3-2.386,4.333-2.355s.366,1.117.743,2.412c.758,2.6,4.556,15.009,8.477,27.689l2.543,8.225.088-23.726.088-23.726,5.1-2.8c2.8-1.54,5.124-2.8,5.159-2.8s.064,23.654.064,52.564c0,41.942-.045,52.561-.22,52.547-.121-.009-1.766-.917-3.654-2.018Zm77.6-44.224,0-42.554-1.629-1.054c-5.5-3.561-10.889-7.182-10.889-7.319,0-.088,1.123-1.875,2.5-3.971,1.8-2.751,2.569-3.784,2.757-3.711.143.055,7.2,4.481,15.672,9.836l15.411,9.735v5.519a53.2,53.2,0,0,1-.144,5.519c-.079,0-3-1.948-6.482-4.328l-6.338-4.328-.088,36.715-.088,36.715-5.2,2.891c-2.862,1.59-5.263,2.891-5.336,2.891s-.134-19.149-.135-42.553Z"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </svg>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      NFT Access Keys
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                      Our unique tiers system using NFTs
                                    </p>
                                  </div>
                                </a>
                              </Link>
                              {/*                <Link href={"/projects/seeding"}>*/}
                              {/*                  <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">*/}
                              {/*                    <svg*/}
                              {/*                      className={*/}
                              {/*                        "flex-shrink-0 h-6 w-6 text-purple-2"*/}
                              {/*                      }*/}
                              {/*                      viewBox="0 0 512 512"*/}
                              {/*                      xmlSpace="preserve"*/}
                              {/*                    >*/}
                              {/*                      <path*/}
                              {/*                        d="M400.278,367.668c18.455-17.355,33.987-38.867,45.786-63.322c16.156-33.489,24.644-71.784,24.644-110.747*/}
                              {/*c0-38.963-8.567-77.258-24.724-110.747c-15.857-32.866-38.655-60.429-65.901-79.708c-5.924-4.192-13.857-4.192-19.781,0*/}
                              {/*c-27.248,19.279-50.035,46.841-65.892,79.708c-16.156,33.489-24.698,71.784-24.698,110.747c0,3.265,0.081,6.523,0.201,9.777*/}
                              {/*c-2.809-1.624-5.639-3.217-8.514-4.742c-34.422-18.254-72.256-28.651-109.412-30.067c-36.458-1.384-71.49,5.826-101.287,20.866*/}
                              {/*c-6.48,3.271-10.192,10.271-9.264,17.471c4.266,33.104,17.942,66.146,39.55,95.553c22.017,29.964,51.848,55.45,86.27,73.704*/}
                              {/*s72.254,28.651,109.411,30.067c2.956,0.113,5.9,0.169,8.834,0.169c30.13,0,59.253-5.936,84.781-17.316*/}
                              {/*c28.406,15.556,46.607,45.512,46.607,78.287v27.515c0,9.454,7.664,17.118,17.118,17.118s17.118-7.664,17.118-17.118v-27.515*/}
                              {/*C451.124,427.482,431.658,390.617,400.278,367.668z M183.295,345.916c-54.931-29.13-94.489-78.529-105.786-131.071*/}
                              {/*c49.833-20.127,112.919-15.094,167.849,14.037c10.603,5.623,20.625,12.008,29.989,19.017c4.148,19.747,10.531,38.77,19.058,56.447*/}
                              {/*c1.376,2.853,2.823,5.651,4.304,8.422l-24.356-12.915c-8.352-4.429-18.714-1.248-23.143,7.104*/}
                              {/*c-4.429,8.353-1.249,18.714,7.104,23.143l69.973,37.107C282.87,378.056,230.123,370.749,183.295,345.916z M387.604,331.328*/}
                              {/*c0.001-35.134-0.203-81.485-0.239-89.197c-0.043-9.428-7.699-16.943-17.117-16.943c-0.026,0-0.054,0-0.08,0*/}
                              {/*c-9.454,0-17.083,7.645-17.04,17.099c0.124,27.157,0.237,62.941,0.237,89.718c-31.044-35.057-49.42-85.23-49.42-138.406*/}
                              {/*c0-62.177,25.109-120.269,66.236-154.866c41.125,34.596,66.236,92.688,66.236,154.866*/}
                              {/*C436.418,246.429,418.282,296.302,387.604,331.328z"*/}
                              {/*                        fill={"currentColor"}*/}
                              {/*                      />*/}
                              {/*                    </svg>*/}
                              {/*                    <div className="ml-4">*/}
                              {/*                      <p className="text-base font-medium text-white">*/}
                              {/*                        Projects Seeding*/}
                              {/*                      </p>*/}
                              {/*                      <p className="mt-1 text-sm text-white">*/}
                              {/*                        Vote for the new projects that have just arrived.*/}
                              {/*                      </p>*/}
                              {/*                    </div>*/}
                              {/*                  </a>*/}
                              {/*                </Link>*/}
                              {/*<div className="w-full border-t border-white border-opacity-10"/>*/}
                              {/*<Link href="/tiers" passHref>*/}
                              {/*  <a className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5">*/}
                              {/*    <img*/}
                              {/*      className="w-6 h-6 rounded-full"*/}
                              {/*      src="https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm"*/}
                              {/*      width={0}*/}
                              {/*      height={0}*/}
                              {/*      alt="project"*/}
                              {/*    />*/}
                              {/*    <div className="ml-4">*/}
                              {/*      <p className="flex items-center text-base font-medium text-white">*/}
                              {/*                Tina Arena*/}
                              {/*        <label*/}
                              {/*          className={*/}
                              {/*            "bg-white bg-opacity-10 p-1 py-[2px] ml-2 rounded text-xs"*/}
                              {/*          }*/}
                              {/*        >*/}
                              {/*                  Sponsored*/}
                              {/*        </label>*/}
                              {/*      </p>*/}
                              {/*      <p className="mt-1 text-sm text-white">*/}
                              {/*                Thetan Arena is an esport game.*/}
                              {/*      </p>*/}
                              {/*    </div>*/}
                              {/*  </a>*/}
                              {/*</Link>*/}
                              <Link href={"/projects/submit"}>
                                <a className="flex items-start rounded-lg">
                                  <FolderAddIcon className="h-6 w-6 text-purple-2"/>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                    Submit Your Project
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                    You can launch your project in a few clicks
                                    </p>
                                  </div>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  );
                }}
              </Popover>
              <Link href={"/staking"}>
                <a className="font-bold text-sm hover:text-gray-300 text-white">
                  Staking
                </a>
              </Link>
              <Popover className="relative">
                {({ open = true }) => {
                  return (
                    <>
                      <Popover.Button className="group inline-flex gap-x-1 items-center font-bold text-sm hover:text-white text-white">
                        <span>Tools</span>
                        <ChevronDownIcon
                          className={"h-5 w-5 group-hover:text-white"}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="transform-screen">
                          <div className="overflow-hidden">
                            <div className="relative grid gap-6 py-4">
                              {toolsMenu.map((item) => (
                                <a
                                  key={item.name}
                                  href={"https://forms.gle/eWqpaPdGMX8joTem9"}
                                  className="flex items-start rounded-lg">
                                  <item.icon
                                    className="flex-shrink-0 h-6 w-6 text-purple-2"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      {item.name}
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  );
                }}
              </Popover>
              <Popover className="relative">
                {() => (
                  <>
                    <Popover.Button
                      className={"group inline-flex items-center font-bold text-sm hover:text-white text-white"}>
                      <span>More</span>
                      <ChevronDownIcon
                        className={"ml-1 h-5 w-5 group-hover:text-white"}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="z-100 transform w-screen">
                        <div className="overflow-hidden">
                          <div className="relative grid gap-6 py-4">
                            <Link href={"/about"}>
                              <a className="flex items-start rounded-lg">
                                <InformationCircleIcon
                                  className={"flex-shrink-0 h-6 w-6 text-purple-2"}/>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-white">
                                    About Parasol Finance
                                  </p>
                                  <p className="mt-1 text-sm text-white">
                                    Learn more about the Parasol Finance
                                    project.
                                  </p>
                                </div>
                              </a>
                            </Link>
                            <Link href={"/frequently-asked-questions"}>
                              <a className="flex items-start rounded-lg">
                                <AnnotationIcon
                                  className={
                                    "flex-shrink-0 h-6 w-6 text-purple-2"
                                  }
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-white">
                                    Frequently Asked Questions (FAQ)
                                  </p>
                                  <p className="mt-1 text-sm text-white">
                                    The most frequently asked questions.
                                  </p>
                                </div>
                              </a>
                            </Link>
                            <a
                              href="https://docs.parasol.finance/"
                              className="flex items-start rounded-lg">
                              <BookOpenIcon
                                className={
                                  "flex-shrink-0 h-6 w-6 text-purple-2"
                                }
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-white">
                                  Read Documentation
                                </p>
                                <p className="mt-1 text-sm text-white">
                                  Some questions about how our platform works?
                                </p>
                              </div>
                            </a>
                            <a
                              href="https://parasol-finance.medium.com/"
                              className="flex items-start rounded-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                                viewBox="0 0 24 24">
                                <path
                                  d="M4.285 7.269a.733.733 0 0 0-.24-.619l-1.77-2.133v-.32h5.498l4.25 9.32 3.736-9.32H21v.319l-1.515 1.451a.45.45 0 0 0-.168.425v10.666a.448.448 0 0 0 .168.425l1.479 1.451v.319h-7.436v-.319l1.529-1.487c.152-.15.152-.195.152-.424V8.401L10.95 19.218h-.575L5.417 8.401v7.249c-.041.305.06.612.275.833L7.684 18.9v.319H2.036V18.9l1.992-2.417a.971.971 0 0 0 .257-.833V7.269z"
                                  fill={"currentColor"}
                                />
                              </svg>
                              <div className="ml-4">
                                <p className="text-base font-medium text-white">
                                  Official Medium Blog
                                </p>
                                <p className="mt-1 text-sm text-white">
                                  Read our latest articles on Medium.com.
                                </p>
                              </div>
                            </a>
                            <Link href={"/contact"}>
                              <a className="flex items-start rounded-lg">
                                <MailIcon
                                  className={
                                    "flex-shrink-0 h-6 w-6 text-purple-2"
                                  }
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-white">
                                    Contact Us
                                  </p>
                                  <p className="mt-1 text-sm text-white">
                                    Something to tell us, please fill the form.
                                  </p>
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="mt-3">
                            <div>
                              <h3 className="text-sm tracking-wide font-medium text-white uppercase">
                                Recent Posts
                              </h3>
                              <ul role="list" className="mt-4 space-y-4">
                                {recentPosts.map((post) => (
                                  <li
                                    key={post.id}
                                    className="text-base truncate"
                                  >
                                    <a
                                      href={post.href}
                                      className="font-medium text-white"
                                    >
                                      {post.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-5 text-sm">
                              <a
                                href="https://parasol-finance.medium.com/"
                                target={"_blank"}
                                className="font-medium text-purple-2 hover:text-purple-1"
                                rel="noreferrer"
                              >
                                {" "}
                                View all posts{" "}
                                <span aria-hidden="true">&rarr;</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
);

export default Header;
