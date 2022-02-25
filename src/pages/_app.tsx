import '../styles/globals.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { AppProps } from 'next/app';
import React, { FC, useMemo } from 'react';
import Head from "next/head";
import { JupiterProvider } from "@jup-ag/react-hook";
import { TokenModalProvider } from "../components/token-chooser/TokenModalProvider";
import Header from "../components/header";
import { WalletModalProvider } from "../components/wallet-connector";
import AnnounceBar from "../components/announce-bar";
import Footer from "../components/footer";
import SimpleReactLightbox from 'simple-react-lightbox'

const JupiterWrapper: React.FC = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  return (
    <JupiterProvider
      // cluster="mainnet-beta"
      cluster="mainnet-beta"
      connection={connection}
      userPublicKey={wallet.publicKey || undefined}
      routeCacheDuration={5000}
    >
      {children}
    </JupiterProvider>
  );
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const network = WalletAdapterNetwork.Mainnet;
  // const network = WalletAdapterNetwork.Devnet;
  const endpoint = "https://solana-api.projectserum.com" // useMemo(() => clusterApiUrl(network, true), [network]);
  // const endpoint = "https://api.devnet.solana.com";
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );
  return <>
    <Head>
      <title>Parasol Finance ($PSOL) | Community Governed Launchpad on Solana</title>
      <link rel="icon" href="/favicon.svg" type="image/svg" />
    </Head>
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          wallets={wallets}
          // onError={(messages) => alert(messages.error)}
          autoConnect={true}>
          <JupiterWrapper>
            <TokenModalProvider>
              <AnnounceBar />
              <WalletModalProvider>
                <Header />
                <main role={"main"}>
                  <SimpleReactLightbox>
                    <Component {...pageProps} />
                  </SimpleReactLightbox>
                </main>
                <Footer />
              </WalletModalProvider>
            </TokenModalProvider>
          </JupiterWrapper>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  </>;
};

export default App;
