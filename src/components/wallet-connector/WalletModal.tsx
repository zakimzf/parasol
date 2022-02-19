import React, {FC, Fragment, useCallback, useMemo} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {useWallet, Wallet} from "@solana/wallet-adapter-react";
import {WalletName, WalletReadyState} from "@solana/wallet-adapter-base";
import {WalletListItem} from "./WalletListItem";
import {useWalletModal} from "./useWalletModal";

export const WalletModal: FC = () => {
	const {wallets, select} = useWallet();
	const {visible, setVisible} = useWalletModal();

	const [installedWallets, otherWallets] = useMemo(() => {
		const installed: Wallet[] = [];
		const notDetected: Wallet[] = [];
		const loadable: Wallet[] = [];

		for (const wallet of wallets) {
			if (wallet.readyState === WalletReadyState.NotDetected) {
				notDetected.push(wallet);
			} else if (wallet.readyState === WalletReadyState.Loadable) {
				loadable.push(wallet);
			} else if (wallet.readyState === WalletReadyState.Installed) {
				installed.push(wallet);
			}
		}
		return [installed, [...loadable, ...notDetected]];
	}, [wallets]);

	const handleWalletClick = useCallback((event, walletName: WalletName) => {
			select(walletName);
			setVisible(false);
		},
		[select]
	);
	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setVisible}>
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
									{installedWallets.map((wallet) => (
										<WalletListItem
											key={wallet.adapter.name}
											handleClick={(event) => handleWalletClick(event, wallet.adapter.name)}
											wallet={wallet}
										/>
									))}
									{otherWallets.map((wallet) => (
										<WalletListItem
											key={wallet.adapter.name}
											handleClick={(event) => handleWalletClick(event, wallet.adapter.name)}
											wallet={wallet}
										/>
									))}
								</div>
							</div>
							<div className="px-5 py-5 bg-[#2a2542] space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
								<div className="flow-root">
									<a href="https://phantom.app/" target={"_blank"} className="flex items-center font-medium text-gray-200">
										{/*<QuestionMarkCircleIcon className="h-5 text-gray-200" />*/}
										<span>Don't have a Solana wallet already?</span>
									</a>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
