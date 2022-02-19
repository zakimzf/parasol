import '../styles/globals.css'
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from "../wallet-connector";
import {
	LedgerWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {clusterApiUrl} from '@solana/web3.js';
import {AppProps} from 'next/app';
import React, {FC, useMemo} from 'react';
import Head from "next/head";
import Header from "../components/header";
import AnnounceBar from "../components/announce-bar";
import Footer from "../components/footer";
import SimpleReactLightbox from 'simple-react-lightbox'

const App: FC<AppProps> = ({Component, pageProps}) => {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter({network}),
			new TorusWalletAdapter(),
			new LedgerWalletAdapter(),
			new SolletWalletAdapter({network}),
			new SolletExtensionWalletAdapter({network}),
		],
		[network]
	);
	return <>
		<Head>
			<title>Parasol Finance ($PSOL) | Community Governed Launchpad on Solana</title>
			<link rel="icon" href="/favicon.svg" type="image/svg" />
		</Head>
		<body>
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider
				wallets={wallets}
				onError={(messages) => alert(messages.error)}
				autoConnect={true}>
				<WalletModalProvider>
					<AnnounceBar />
					<Header />
					<main role="main">
						<SimpleReactLightbox>
							<Component {...pageProps} />
						</SimpleReactLightbox>
					</main>
					<Footer />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
		</body>
	</>;
};

export default App;
