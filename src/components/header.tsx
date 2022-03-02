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
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { WalletConnect } from "./wallet-connector";

import { toolsMenu, resourcesMenu, recentPosts } from "../constants/header";

import Logo from "/public/images/logos/parasol-logo-inverted-rgb.svg";

const Header = () => (
  <Popover className="relative">
    <div className="max-w-7xl mt-6 text-gray-200 mx-auto px-5">
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href={"/"}>
            <a>
              <Image src={Logo} className="h-5" alt="logo" />
            </a>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Popover.Group as="nav" className="hidden md:flex items-baseline space-x-10">
          <Link href={"/swap"}>
            <a className="font-bold text-sm hover:text-gray-300">
              Swap
            </a>
          </Link>
          <Popover className="relative">
            {({ open = true }) => {
              return <>
                <Popover.Button
                  className='group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300'>
                  <span>Launchpad</span>
                  <ChevronDownIcon className={"h-5 w-5 group-hover:text-gray-300"} aria-hidden="true" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1">
                  <Popover.Panel
                    className="absolute z-20 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div
                      className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-[#231f38] gap-8 px-7 py-8">
                        <Link href={"/projects"}>
                          <a
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                            <CollectionIcon className="flex-shrink-0 h-6 w-6 text-purple-2"
                              aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-white">
                                Upcoming Projects
                              </p>
                              <p
                                className="mt-1 text-sm text-gray-300">All the new
                                projects
                                of Parasol Finance
                              </p>
                            </div>
                          </a>
                        </Link>
                        <Link href={"/tiers"}>
                          <a
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0 h-6 w-6 text-purple-2"} viewBox="0 0 161.382 185.671">
                              <g id="layer1" transform="translate(-26.12 -62.248)">
                                <path d="M66.5,224.731l-40.3-23.242-.037-46.373-.037-46.373L65.988,85.637c21.927-12.709,40.095-23.218,40.372-23.353.537-.262,1.685.388,38.366,21.736,3.59,2.089,14.662,8.512,24.606,14.273l18.08,10.475.044,46.3.044,46.3L162.94,215.58c-13.509,7.817-31.584,18.28-40.166,23.25s-15.686,9.061-15.787,9.09S88.666,237.514,66.5,224.731Zm56.974,2.71L158.353,207.2,177.8,195.909l-.044-41.024-.044-41.024-19.667-11.392c-10.817-6.266-26.692-15.464-35.278-20.44s-15.709-9.086-15.829-9.132-16.172,9.151-35.67,20.439L35.815,113.859l.04,41.087.04,41.087,35.527,20.513,35.527,20.513.545-.331c.3-.182,7.49-4.362,15.979-9.288ZM88.062,216.4l-4.807-3.193V96.9l11.738-7.015c6.591-3.939,11.847-6.973,11.988-6.919s6.838,3.955,14.889,8.672l14.639,8.576-.929,1.442c-.511.793-1.712,2.672-2.669,4.176s-1.8,2.8-1.866,2.882-5.545-3-12.167-6.85c-9.065-5.269-12.115-6.962-12.342-6.851-.166.081-3.289,1.849-6.941,3.929l-6.639,3.782v46.145l17.859.045,17.859.045.046,5.953.046,5.953H92.958l-.045,29.365L92.869,219.6Zm-17.148-9.77c-3.026-1.764-3.456-2.071-3.627-2.585-.107-.321-3.443-12.783-7.414-27.694l-7.221-27.111-.045,23.362c-.025,12.849-.079,23.362-.121,23.362-.106,0-8.074-4.588-8.345-4.806-.175-.14-.22-7.183-.22-34.154V123.031l4.275-2.412c2.351-1.327,4.3-2.386,4.333-2.355s.366,1.117.743,2.412c.758,2.6,4.556,15.009,8.477,27.689l2.543,8.225.088-23.726.088-23.726,5.1-2.8c2.8-1.54,5.124-2.8,5.159-2.8s.064,23.654.064,52.564c0,41.942-.045,52.561-.22,52.547-.121-.009-1.766-.917-3.654-2.018Zm77.6-44.224,0-42.554-1.629-1.054c-5.5-3.561-10.889-7.182-10.889-7.319,0-.088,1.123-1.875,2.5-3.971,1.8-2.751,2.569-3.784,2.757-3.711.143.055,7.2,4.481,15.672,9.836l15.411,9.735v5.519a53.2,53.2,0,0,1-.144,5.519c-.079,0-3-1.948-6.482-4.328l-6.338-4.328-.088,36.715-.088,36.715-5.2,2.891c-2.862,1.59-5.263,2.891-5.336,2.891s-.134-19.149-.135-42.553Z" fill="currentColor" />
                              </g>
                            </svg>

                            {/*<SparklesIcon className="flex-shrink-0 h-6 w-6 text-purple-2"*/}
                            {/*              aria-hidden="true"/>*/}
                            <div className="ml-4"><p
                              className="text-base font-medium text-white">NFT Access
                              Keys</p>
                            <p className="mt-1 text-sm text-gray-300">
                                Our unique tiers system using NFTs
                            </p>
                            </div>
                          </a>
                        </Link>
                        {/*{launchpadMenu.map((item) => (*/}
                        {/*    <a*/}
                        {/*        key={item.name}*/}
                        {/*        href={item.href}*/}
                        {/*        className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"*/}
                        {/*    >*/}
                        {/*        <item.icon className="flex-shrink-0 h-6 w-6 text-purple-2"*/}
                        {/*                   aria-hidden="true"/>*/}
                        {/*        <div className="ml-4">*/}
                        {/*            <p className="text-base font-medium text-white">{item.name}</p>*/}
                        {/*            <p className="mt-1 text-sm text-gray-300">{item.description}</p>*/}
                        {/*        </div>*/}
                        {/*    </a>*/}
                        {/*))}*/}
                        <div className="w-full border-t border-white border-opacity-10" />
                        <Link href="/tiers" passHref>
                          <a className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5">
                            <img className="w-6 h-6 rounded-full" src="https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm" width={0} height={0} alt="project"/>
                            <div className="ml-4">
                              <p className="flex items-center text-base font-medium text-white">
                                Tina Arena
                                <label
                                  className={"bg-white bg-opacity-10 p-1 py-[2px] ml-2 rounded text-xs"}>Sponsored</label>
                              </p>
                              <p className="mt-1 text-sm text-gray-300">Thetan Arena is an
                                esport game.
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="px-5 py-4 bg-[#2a2542] sm:px-8 sm:py-6">
                        <div className="flow-root">
                          <a href="https://docs.parasol.finance/" target={"_blank"}
                            className="flex items-center font-medium text-gray-200" rel="noreferrer">
                            <FolderAddIcon className="h-6 w-6 text-purple-2" />
                            <div className="ml-3">
                              <p className="text-base font-medium text-white">Submit your
                                Project</p>
                              {/*<p className="mt-1 text-sm text-gray-300">You can launch your project in a few clicks</p>*/}
                            </div>
                            {/*<span className="ml-2">Submit Your Project?</span>*/}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>;
            }}
          </Popover>
          {/*<Link href={"/projects"}>*/}
          {/*	<a className="font-bold text-sm hover:text-gray-300">*/}
          {/*		Launchpad*/}
          {/*	</a>*/}
          {/*</Link>*/}
          {/*<Link href={"/tiers"}>*/}
          {/*	<a className="font-bold border-b-pb-1 text-sm hover:text-gray-300">*/}
          {/*		Access Keys*/}
          {/*	</a>*/}
          {/*</Link>*/}
          {/*<Link href={"/governance"}>*/}
          {/*    <a className="font-bold text-sm hover:text-gray-300">*/}
          {/*        Governance*/}
          {/*    </a>*/}
          {/*</Link>*/}
          <Link href={"/pools"}>
            <a className="font-bold text-sm hover:text-gray-300">
              Pools
            </a>
          </Link>
          <Popover className="relative">
            {({ open = true }) => {
              return <>
                <Popover.Button
                  className='group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300'
                >
                  <span>Tools</span>
                  <ChevronDownIcon className={"h-5 w-5 group-hover:text-gray-300"}
                    aria-hidden="true" />
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
                  <Popover.Panel
                    className="absolute z-20 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div
                      className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-[#231f38] gap-8 px-7 py-8">
                        {toolsMenu.map((item) => (
                          <a
                            key={item.name}
                            // href={item.href}
                            href={"https://forms.gle/eWqpaPdGMX8joTem9"}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-purple-2"
                              aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-white">{item.name}</p>
                              <p className="mt-1 text-sm text-gray-300">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>;
            }}
          </Popover>
          {/*<Link href={"/governance"}>*/}
          {/*	<a className="font-bold text-sm hover:text-gray-300">*/}
          {/*		Tools*/}
          {/*	</a>*/}
          {/*</Link>*/}
          <Popover className="relative">
            {({ open }) => <>
              <Popover.Button
                className={"group inline-flex items-center font-bold text-sm hover:text-gray-300"}>
                <span>More</span>
                <ChevronDownIcon className={"ml-1 h-5 w-5 group-hover:text-gray-300"}
                  aria-hidden="true" />
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
                <Popover.Panel
                  className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                  <div
                    className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-[#231f38] px-5 py-6 sm:gap-8 sm:p-8">
                      <Link href={"/about"}>
                        <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                          <InformationCircleIcon
                            className={"flex-shrink-0 h-6 w-6 text-purple-2"} />
                          <div className="ml-4">
                            <p className="text-base font-medium text-white">About Parasol
                              Finance
                            </p>
                            <p className="mt-1 text-sm text-gray-300">
                              Learn more about the Parasol Finance project.
                            </p>
                          </div>
                        </a>
                      </Link>
                      <Link href={"/frequently-asked-questions"}>
                        <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                          <AnnotationIcon className={"flex-shrink-0 h-6 w-6 text-purple-2"} />
                          <div className="ml-4">
                            <p className="text-base font-medium text-white">
                              Frequently Asked Questions (FAQ)
                            </p>
                            <p className="mt-1 text-sm text-gray-300">
                              The most frequently asked questions.
                            </p>
                          </div>
                        </a>
                      </Link>
                      <a href="https://docs.parasol.finance/"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                        <BookOpenIcon className={"flex-shrink-0 h-6 w-6 text-purple-2"} />
                        <div className="ml-4">
                          <p className="text-base font-medium text-white">Read
                            Documentation
                          </p>
                          <p className="mt-1 text-sm text-gray-300">Some questions about
                            how our platform works?
                          </p>
                        </div>
                      </a>
                      <a href="https://parasol-finance.medium.com/"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5">
                        {/*<svg xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0 h-6 w-6 text-purple-2"} viewBox="0 0 360.465 204.139">*/}
                        {/*	<g transform="translate(68.168 -117.174)">*/}
                        {/*		<path id="path847" d="M24.172,321.059A102.34,102.34,0,0,1-66.4,239.335c-1.531-7.725-1.77-10.4-1.77-19.844,0-9.029.16-11.151,1.353-17.987A102.143,102.143,0,0,1,83.438,130.046a100.314,100.314,0,0,1,22.5,17.064c16.633,16.659,26.476,37.084,29.4,61a127.953,127.953,0,0,1,.005,22.357,101.35,101.35,0,0,1-4.67,21.034,101.91,101.91,0,0,1-65.687,65.059,109.45,109.45,0,0,1-22.026,4.52,183.424,183.424,0,0,1-18.785-.025Zm167.614-4.9c-16.515-2.534-31.365-19.456-40.1-45.692A157.683,157.683,0,0,1,144.5,235.5a261.258,261.258,0,0,1,0-32.411c1.6-15.67,4.68-29.175,9.364-41.01,4.767-12.045,10.41-21.185,17.4-28.193,5.836-5.847,11.154-9.1,17.785-10.9,2.33-.629,3.058-.7,7.094-.7s4.765.072,7.094.7c6.629,1.79,11.928,5.036,17.788,10.9,14.142,14.143,23.745,38.864,26.727,68.8a265.5,265.5,0,0,1,.4,27.812c-1.127,16.4-4.132,31.14-9.043,44.344a131.734,131.734,0,0,1-8.838,18.2c-8.508,13.465-18.946,21.5-30.066,23.134a23.7,23.7,0,0,1-8.433-.024Zm79.337-10.149c-1.541-.814-3.569-3.334-5.114-6.354-9.639-18.844-14.12-69.938-10.046-114.557,2.662-29.155,8.75-49.651,15.655-52.706,2.16-.956,3.909-.355,6.214,2.134,6.044,6.528,11.081,27.048,13.291,54.143a410.516,410.516,0,0,1,.394,56.356c-2.136,31.99-8.316,56.164-15.529,60.738a4.88,4.88,0,0,1-4.864.245Z" fill={"currentColor"}/>*/}
                        {/*	</g>*/}
                        {/*</svg>*/}
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className={"flex-shrink-0 h-6 w-6 text-purple-2"}
                          viewBox="0 0 24 24">
                          <path
                            d="M4.285 7.269a.733.733 0 0 0-.24-.619l-1.77-2.133v-.32h5.498l4.25 9.32 3.736-9.32H21v.319l-1.515 1.451a.45.45 0 0 0-.168.425v10.666a.448.448 0 0 0 .168.425l1.479 1.451v.319h-7.436v-.319l1.529-1.487c.152-.15.152-.195.152-.424V8.401L10.95 19.218h-.575L5.417 8.401v7.249c-.041.305.06.612.275.833L7.684 18.9v.319H2.036V18.9l1.992-2.417a.971.971 0 0 0 .257-.833V7.269z"
                            fill={"currentColor"} />
                        </svg>
                        <div className="ml-4">
                          <p className="text-base font-medium text-white">Official
                            Medium Blog
                          </p>
                          <p className="mt-1 text-sm text-gray-300">Read our latest
                            articles on Medium.com.
                          </p>
                        </div>
                      </a>
                    </div>
                    {/*<div className="relative grid gap-6 bg-[#231f38] px-5 py-6 sm:gap-8 sm:p-8">*/}
                    {/*	{resourcesMenu.map((item) => (*/}
                    {/*		<a*/}
                    {/*			key={item.name}*/}
                    {/*			href={item.href}*/}
                    {/*			className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"*/}
                    {/*		>*/}
                    {/*			<item.icon className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true" />*/}
                    {/*			<div className="ml-4">*/}
                    {/*				<p className="text-base font-medium text-white">{item.name}</p>*/}
                    {/*				<p className="mt-1 text-sm text-gray-300">{item.description}</p>*/}
                    {/*			</div>*/}
                    {/*		</a>*/}
                    {/*	))}*/}
                    {/*</div>*/}
                    <div className="px-5 py-5 bg-[#2a2542] sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-400 uppercase">Recent
                          Posts
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                          {recentPosts.map((post) => (
                            <li key={post.id} className="text-base truncate">
                              <a href={post.href} className="font-medium text-gray-300">
                                {post.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <a href="https://parasol-finance.medium.com/" target={"_blank"}
                          className="font-medium text-purple-2 hover:text-purple-1" rel="noreferrer">
                          {" "}
                          View all posts <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>}
          </Popover>
        </Popover.Group>
        <div className="hidden md:flex items-center gap-x-3 justify-end md:flex-1 lg:w-0">
          <WalletConnect />
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
      <Popover.Panel focus
        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div
          className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div className="-mr-2">
                <Popover.Button
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {/*{launchpadMenu.map((item) => <a*/}
                {/*    key={item.name}*/}
                {/*    href={item.href}*/}
                {/*    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"*/}
                {/*>*/}
                {/*    <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true"/>*/}
                {/*    <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>*/}
                {/*</a>)}*/}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                Pricing
              </a>
              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                Docs
              </a>
              {resourcesMenu.map((item) => <a
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                {item.name}
              </a>)}
            </div>
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
)

export default Header