import React, { FC, useEffect, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import Head from "next/head";
import SimpleReactLightbox from "simple-react-lightbox"

import Header from "../components/header";
import AnnounceBar from "../components/slices/announce-bar";
import Footer from "../components/footer";
import { TokenModalProvider } from "../components/token-chooser/TokenModalProvider";
import { getWalletAdapterNetwork } from "../core/solana-network";
import { WalletModalProvider } from "../components/wallet-connector";

import "../styles/globals.css"

const App: FC<AppProps> = ({Component, pageProps}) => {
  const network: WalletAdapterNetwork = getWalletAdapterNetwork(process.env.NETWORK);

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
  useEffect(() => {
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = "212516d5-ff63-4686-a490-d9f77ff93710";
    (() => {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = Boolean(1);
      d.getElementsByTagName("body")[0].appendChild(s);
    })();
  });
  return <>
    <Head>
      <title>Parasol Finance ($PSOL) | Community Governed Launchpad on Solana</title>
      <link rel="icon" href="/favicon.svg" type="image/svg"/>
    </Head>
    <body>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          wallets={wallets}
          // onError={(messages) => alert(messages.error)}
          autoConnect={true}>
          <WalletModalProvider>
            <AnnounceBar/>
            <Header/>
            <main role="main">
              <SimpleReactLightbox>
                <TokenModalProvider>
                  <Component {...pageProps} />
                </TokenModalProvider>
              </SimpleReactLightbox>
            </main>
            <Footer/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </body>
  </>;
};

export default App;