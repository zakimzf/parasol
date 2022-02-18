import Image from 'next/image'

import {QuestionMarkCircleIcon} from '@heroicons/react/outline'
import {Fragment, useState} from "react";
import {Dialog, Transition} from '@headlessui/react'

const SolanaLogo = require('./assets/solana-logo.svg');
const PhantomWalletLogo = require('./assets/phantom-wallet-logo.svg');
const SolflareLogo = require('./assets/solflare-logo.svg');
const SolletLogo = require('./assets/sollet-logo.svg');
const SlopeLogo = require('./assets/slope-logo.svg');
const LedgerLogo = require('./assets/ledger-logo-white.svg');

export enum Themes {
	Light,
	Dark
}

type WalletConnectorOptions = {
	theme: Themes
}

const providers = [
	{id: 'phantom', logo: PhantomWalletLogo, name: 'Phantom Wallet', description: 'Support Solana and SPL tokens.'},
	{id: 'solflare', logo: SolflareLogo, name: 'Solflare Wallet', description: 'Connect using Solflare wallet.'},
	{id: 'sollet', logo: SolletLogo, name: 'Sollet Wallet', description: 'Connect using Sollet wallet.'},
	{id: 'ledger', logo: LedgerLogo, name: 'Ledger Wallet', description: 'Connect your Ledger hardware wallet.'},
	{id: 'slope', logo: SlopeLogo, name: 'Slope Wallet', description: 'Connect using Slope wallet.'},
]

const WalletConnector = function ({theme}: WalletConnectorOptions) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="inline-flex items-center px-4 py-2 gap-x-2 text-base font-medium rounded-md bg-purple-2 -bg-gradient-to-r from-purple-1 to-purple-2 text-white hover:bg-white hover:text-purple-2 hover:from-purple-2 hover:to-purple-1">
				<svg className="h-3" viewBox="0 0 96 86" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M95.5053 67.8049L79.658 84.8288C79.3134 85.1986 78.8966 85.4934 78.4334 85.6949C77.9703 85.8964 77.4706 86.0003 76.9656 86H1.8398C1.48134 86 1.13068 85.8951 0.830924 85.6982C0.531164 85.5013 0.295357 85.221 0.152475 84.8917C0.00959266 84.5624 -0.03414 84.1985 0.0266501 83.8446C0.0874403 83.4908 0.250105 83.1624 0.494658 82.8999L16.3543 65.876C16.6979 65.5072 17.1134 65.2129 17.5751 65.0115C18.0368 64.81 18.5349 64.7056 19.0385 64.7048H94.1602C94.5187 64.7048 94.8693 64.8097 95.1691 65.0066C95.4688 65.2035 95.7046 65.4838 95.8475 65.8131C95.9904 66.1424 96.0341 66.5063 95.9734 66.8601C95.9126 67.214 95.7499 67.5423 95.5053 67.8049ZM79.658 33.5236C79.3134 33.1538 78.8966 32.859 78.4334 32.6575C77.9703 32.456 77.4706 32.3521 76.9656 32.3524H1.8398C1.48134 32.3524 1.13068 32.4573 0.830924 32.6542C0.531164 32.8511 0.295357 33.1314 0.152475 33.4607C0.00959266 33.79 -0.03414 34.1539 0.0266501 34.5078C0.0874403 34.8616 0.250105 35.19 0.494658 35.4525L16.3543 52.4764C16.6979 52.8452 17.1134 53.1394 17.5751 53.3409C18.0368 53.5424 18.5349 53.6468 19.0385 53.6476H94.1602C94.5187 53.6476 94.8693 53.5427 95.1691 53.3458C95.4688 53.1489 95.7046 52.8686 95.8475 52.5393C95.9904 52.21 96.0341 51.8461 95.9734 51.4922C95.9126 51.1384 95.7499 50.81 95.5053 50.5475L79.658 33.5236ZM1.8398 21.2952H76.9656C77.4706 21.2955 77.9703 21.1917 78.4334 20.9902C78.8966 20.7887 79.3134 20.4938 79.658 20.124L95.5053 3.1001C95.7499 2.83758 95.9126 2.50922 95.9734 2.15538C96.0341 1.80153 95.9904 1.4376 95.8475 1.10831C95.7046 0.779013 95.4688 0.498699 95.1691 0.301804C94.8693 0.10491 94.5187 1.21255e-05 94.1602 0L19.0385 0C18.5349 0.000858433 18.0368 0.105251 17.5751 0.306715C17.1134 0.508179 16.6979 0.802426 16.3543 1.17124L0.498747 18.1951C0.25443 18.4574 0.0918367 18.7854 0.0309086 19.1389C-0.0300194 19.4923 0.0133662 19.8559 0.155745 20.1851C0.298123 20.5142 0.533305 20.7945 0.832447 20.9918C1.13159 21.189 1.48169 21.2944 1.8398 21.2952Z" fill="currentColor" />
				</svg>
				Connect Wallet
			</button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
					<div
						className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 transition-opacity" />
						</Transition.Child>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="inline-block align-bottom rounded-xl text-left overflow-hidden shadow-strong transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
								<div className="bg-[#231f38] text-gray-100 px-5 py-6 sm:p-8">
									<div className="mb-8">
										<h1 className="mb-1 font-bold text-2xl">Connect a Wallet</h1>
										<p className="text-gray-200">You have to connect your wallet first.</p>
									</div>
									<div className="grid gap-6 sm:gap-8">
										{providers.map((provider) => (
											<a href="#" className="-m-3 p-3 flex items-center rounded-lg focus:outline-none -focus:ring focus:ring-purple-2 hover:bg-white hover:bg-opacity-5 focus:bg-white focus:bg-opacity-5">
												<Image src={provider.logo} />
												<div className="ml-4 w-full">
													<div className="text-base font-medium">
														{provider.name}
													</div>
													<p className="mt-1 text-sm text-gray-300">
														{provider.description}
													</p>
												</div>
											</a>
										))}
									</div>
								</div>
								<div className="px-5 py-5 bg-[#2a2542] space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
									<div className="flow-root">
										<a href="https://docs.parasol.finance/" target={"_blank"} className="flex items-center font-medium text-gray-200">
											<QuestionMarkCircleIcon className="h-5 text-gray-200" />
											<span className="ml-2">Your wallet is not supported?</span>
										</a>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}
export default WalletConnector;
