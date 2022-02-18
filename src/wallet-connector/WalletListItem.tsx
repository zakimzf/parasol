import {WalletReadyState} from '@solana/wallet-adapter-base';
import {Wallet} from '@solana/wallet-adapter-react';
import React, {FC, MouseEventHandler} from 'react';

export interface WalletListItemProps {
	handleClick: MouseEventHandler<HTMLButtonElement>;
	tabIndex?: number;
	wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({handleClick, tabIndex, wallet}) =>
	<button
		onClick={handleClick}
		className="-m-3 p-3 flex items-center text-left rounded-lg focus:outline-none -focus:ring focus:ring-purple-2 hover:bg-white hover:bg-opacity-5 focus:bg-white focus:bg-opacity-5" tabIndex={tabIndex}>
		<img src={wallet.adapter.icon} className="w-6 h-6" alt={wallet.adapter.name} />
		<div className="ml-4 w-full">
			<div className="flex items-center justify-between text-base font-medium">
				{wallet.adapter.name}
				<span className="ml-auto mr-1 text-sm text-gray-400">
                    {wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
                </span>
			</div>
		</div>
	</button>;
