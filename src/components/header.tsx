import * as React from 'react'
import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import Link from 'next/link';
import Image from 'next/image';
import {
	BookOpenIcon,
	CloudDownloadIcon,
	CollectionIcon,
	FolderAddIcon,
	MenuIcon,
	PhotographIcon,
	PlusCircleIcon,
	SparklesIcon,
	TrendingUpIcon,
	XIcon,
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {WalletConnect} from "../wallet-connector";

const launchpadMenu = [
	{
		name: 'Upcoming Projects',
		description: 'All the new projects of Parasol Finance',
		href: '/projects',
		icon: CollectionIcon,
	},
	{
		name: 'NFT Access Keys',
		description: 'Our unique tiers system using NFTs',
		href: '/tiers',
		icon: SparklesIcon,
	},
	{
		name: 'Submit Your Project',
		description: 'You can launch your project in a few clicks',
		href: '/projects/create',
		icon: FolderAddIcon,
	},
]
const toolsMenu = [
	{
		name: 'Create SPL Token',
		description: 'Create a Solana Token (SPL) in seconds',
		href: '/tools/mint',
		icon: PlusCircleIcon,
	},
	{
		name: 'Airdrop Tool',
		description: 'Simplifies the sending of tokens to your community',
		href: '/tools/airdrop',
		icon: CloudDownloadIcon,
	},
	{
		name: 'NFT Mint & Drop',
		description: 'Helps you to mint and send NFTs.',
		href: '/tools/nft',
		icon: PhotographIcon,
	},
	{
		name: 'Market Maker',
		description: 'Create liquidity and put your coin on the market',
		href: '/tools/market-maker',
		icon: TrendingUpIcon,
	}
]
const resourcesMenu = [
	{
		name: 'Read Documentation',
		description: 'Get all of your questions answered in our forums or contact support.',
		href: '#',
		icon: BookOpenIcon,
	},
]
const recentPosts = [
	// {id: 1, name: 'Boost your conversion rate', href: '#'},
	// {id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#'},
	{id: 3, name: 'Improve your customer experience', href: '#'},
]

const Logo = require('/public/images/logos/parasol-logo-inverted-rgb.svg')

const Header = () => (
	<Popover className="relative">
		<div className="max-w-7xl mt-6 text-gray-200 mx-auto px-5">
			<div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<Link href={"/"}>
						<a>
							<Image src={Logo} className="h-5" />
						</a>
					</Link>
				</div>
				<div className="-mr-2 -my-2 md:hidden">
					<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
						{({open = true}) => {
							return (
								<>
									<Popover.Button
										className='group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300'>
										<span>Launchpad</span>
										<ChevronDownIcon className={'h-5 w-5 group-hover:text-gray-300'} aria-hidden="true" />
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
													{launchpadMenu.map((item) => (
														<a
															key={item.name}
															href={item.href}
															className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"
														>
															<item.icon className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true" />
															<div className="ml-4">
																<p className="text-base font-medium text-white">{item.name}</p>
																<p className="mt-1 text-sm text-gray-300">{item.description}</p>
															</div>
														</a>
													))}
												</div>
												{/*<div className="px-5 py-4 bg-[#2a2542] sm:px-8 sm:py-6">*/}
												{/*	<div className="flow-root">*/}
												{/*		<a href="https://docs.parasol.finance/" target={"_blank"} className="flex items-center font-medium text-gray-200">*/}
												{/*			<QuestionMarkCircleIcon className="h-5 text-gray-200" />*/}
												{/*			<span className="ml-2">Your wallet is not supported?</span>*/}
												{/*		</a>*/}
												{/*	</div>*/}
												{/*</div>*/}
											</div>
										</Popover.Panel>
									</Transition>
								</>
							);
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
					<Link href={"/governance"}>
						<a className="font-bold text-sm hover:text-gray-300">
							Governance
						</a>
					</Link>
					<Popover className="relative">
						{({open = true}) => {
							return (
								<>
									<Popover.Button
										className='group inline-flex gap-x-1 items-center font-bold text-sm hover:text-gray-300'>
										<span>Tools</span>
										<ChevronDownIcon className={'h-5 w-5 group-hover:text-gray-300'} aria-hidden="true" />
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
															href={item.href}
															className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"
														>
															<item.icon className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true" />
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
								</>
							);
						}}
					</Popover>
					{/*<Link href={"/governance"}>*/}
					{/*	<a className="font-bold text-sm hover:text-gray-300">*/}
					{/*		Tools*/}
					{/*	</a>*/}
					{/*</Link>*/}
					<Popover className="relative">
						{({open}) => (
							<>
								<Popover.Button className={'group inline-flex items-center font-bold text-sm hover:text-gray-300'}>
									<span>More</span>
									<ChevronDownIcon className={'ml-1 h-5 w-5 group-hover:text-gray-300'} aria-hidden="true" />
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
									<Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
										<div className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
											<div className="relative grid gap-6 bg-[#231f38] px-5 py-6 sm:gap-8 sm:p-8">
												{resourcesMenu.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className="-m-3 p-3 flex items-start rounded-lg hover:bg-white hover:bg-opacity-5"
													>
														<item.icon className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true" />
														<div className="ml-4">
															<p className="text-base font-medium text-white">{item.name}</p>
															<p className="mt-1 text-sm text-gray-300">{item.description}</p>
														</div>
													</a>
												))}
											</div>
											<div className="px-5 py-5 bg-[#2a2542] sm:px-8 sm:py-8">
												<div>
													<h3 className="text-sm tracking-wide font-medium text-gray-400 uppercase">Recent
														Posts</h3>
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
													<a href="#" className="font-medium text-purple-2 hover:text-indigo-500">
														{' '}
														View all posts <span aria-hidden="true">&rarr;</span>
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
			<Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
				<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
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
								<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Close menu</span>
									<XIcon className="h-6 w-6" aria-hidden="true" />
								</Popover.Button>
							</div>
						</div>
						<div className="mt-6">
							<nav className="grid gap-y-8">
								{launchpadMenu.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
									>
										<item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
										<span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
									</a>
								))}
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
							{resourcesMenu.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-base font-medium text-gray-900 hover:text-gray-700"
								>
									{item.name}
								</a>
							))}
						</div>
						<div>
							<a
								href="#"
								className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
							>
								Sign up
							</a>
							<p className="mt-6 text-center text-base font-medium text-gray-500">
								Existing customer?{' '}
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
// <div className="max-w-7xl mt-6 text-gray-200 mx-auto px-4 py-6 sm:px-6">
// 	<nav className="relative flex items-center justify-between sm:h-10 md:justify-center"
// 	     aria-label="Global">
// 		<div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
// 			<div className="flex items-center justify-between w-full md:w-auto">
// 				<Link href="/">
// 					<a>
// 						<span className="sr-only">Workflow</span>
// 						<Image src={logo} className="h-5" />
// 					</a>
// 					{/*<img className="h-8 w-auto sm:h-10"*/}
// 					{/*     src="https://tailwindui.com/img/logos/workflow-mark-purple-600.svg" alt="" />*/}
// 				</Link>
// 				<div className="-mr-2 flex items-center md:hidden">
// 					<button type="button"
// 					        className="bg-gradient-to-r from-purple-1 to-purple-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
// 					        aria-expanded="false">
// 						<span className="sr-only">Open main menu</span>
// 						<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
// 						     viewBox="0 0 24 24"
// 						     stroke="currentColor" aria-hidden="true">
// 							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
// 							      d="M4 6h16M4 12h16M4 18h16" />
// 						</svg>
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 		<div className="hidden md:flex items-center md:space-x-10">
// 			{/*<a href="#" className="font-bold text-sm hover:text-gray-300">Overview</a>*/}
// 			<Link href={"/swap"}>
// 				<a className="font-bold text-sm hover:text-gray-300">Swap</a>
// 			</Link>
// 			{/*<Link href={"/projects"}>*/}
// 			<a href="javascript:void(0);" className="relative">
// 				<a className="font-bold text-sm hover:text-gray-300">Projects</a>
// 				{/*<div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">*/}
// 				{/*	<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">*/}
// 				{/*		<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">*/}
// 				{/*			<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">*/}
// 				{/*				<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />*/}
// 				{/*				</svg>*/}
// 				{/*				<div className="ml-4">*/}
// 				{/*					<p className="text-base font-medium text-gray-900">Analytics</p>*/}
// 				{/*					<p className="mt-1 text-sm text-gray-500">Get a better understanding of*/}
// 				{/*						where your traffic is coming from.</p>*/}
// 				{/*				</div>*/}
// 				{/*			</a>*/}
// 				{/*			<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">*/}
// 				{/*				<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />*/}
// 				{/*				</svg>*/}
// 				{/*				<div className="ml-4">*/}
// 				{/*					<p className="text-base font-medium text-gray-900">Engagement</p>*/}
// 				{/*					<p className="mt-1 text-sm text-gray-500">Speak directly to your customers*/}
// 				{/*						in a more meaningful way.</p>*/}
// 				{/*				</div>*/}
// 				{/*			</a>*/}
// 				{/*			<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">*/}
// 				{/*				<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />*/}
// 				{/*				</svg>*/}
// 				{/*				<div className="ml-4">*/}
// 				{/*					<p className="text-base font-medium text-gray-900">Security</p>*/}
// 				{/*					<p className="mt-1 text-sm text-gray-500">Your customers&#039; data will be*/}
// 				{/*						safe and secure.</p>*/}
// 				{/*				</div>*/}
// 				{/*			</a>*/}
// 				{/*			<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">*/}
// 				{/*				<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />*/}
// 				{/*				</svg>*/}
// 				{/*				<div className="ml-4">*/}
// 				{/*					<p className="text-base font-medium text-gray-900">Integrations</p>*/}
// 				{/*					<p className="mt-1 text-sm text-gray-500">Connect with third-party tools*/}
// 				{/*						that you&#039;re already using.</p>*/}
// 				{/*				</div>*/}
// 				{/*			</a>*/}
// 				{/*			<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">*/}
// 				{/*				<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />*/}
// 				{/*				</svg>*/}
// 				{/*				<div className="ml-4">*/}
// 				{/*					<p className="text-base font-medium text-gray-900">Automations</p>*/}
// 				{/*					<p className="mt-1 text-sm text-gray-500">Build strategic funnels that will*/}
// 				{/*						drive your customers to convert</p>*/}
// 				{/*				</div>*/}
// 				{/*			</a>*/}
// 				{/*		</div>*/}
// 				{/*		<div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">*/}
// 				{/*			<div className="flow-root">*/}
// 				{/*				<a href="#" className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">*/}
// 				{/*					<svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />*/}
// 				{/*						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
// 				{/*					</svg>*/}
// 				{/*					<span className="ml-3">Watch Demo</span>*/}
// 				{/*				</a>*/}
// 				{/*			</div>*/}
// 				{/*			<div className="flow-root">*/}
// 				{/*				<a href="#" className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">*/}
// 				{/*					<svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
// 				{/*						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />*/}
// 				{/*					</svg>*/}
// 				{/*					<span className="ml-3">Contact Sales</span>*/}
// 				{/*				</a>*/}
// 				{/*			</div>*/}
// 				{/*		</div>*/}
// 				{/*	</div>*/}
// 				{/*</div>*/}
// 			</a>
// 			{/*</Link>*/}
// 			<Link href={"/tiers"}>
// 				<a className="font-bold text-sm hover:text-gray-300">NFT Access Keys</a>
// 			</Link>
// 			<a href="#" className="flex items-center gap-x-2 font-bold text-sm hover:text-gray-300">
// 				More
// 				<ChevronDownIcon className="h-4" />
// 			</a>
// 		</div>
// 		<div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
// 			<span className="inline-flex rounded-md shadow">
// 				<WalletConnector theme={Themes.Dark} />
// 			</span>
// 		</div>
// 	</nav>
// </div>
// )
export default Header;
