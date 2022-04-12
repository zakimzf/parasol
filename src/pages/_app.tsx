import React, { FC, useEffect, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
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
import SimpleReactLightbox from "simple-react-lightbox";

import Header from "../components/header";
import AnnounceBar from "../components/slices/announce-bar";
import Notification, { NotificationType } from "../components/notifications";
import Footer from "../components/footer";
import { TokenModalProvider } from "../components/token-chooser/TokenModalProvider";
import { getWalletAdapterNetwork } from "../core/solana-network";
import { WalletModalProvider } from "../components/wallet-connector";
import { NftProvider } from "../context/NftContext";

import "../styles/globals.css";
import { resolveValue, Toaster } from "react-hot-toast";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const network: WalletAdapterNetwork = getWalletAdapterNetwork(
    process.env.NETWORK
  );

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
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
  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Community Governed Launchpad on Solana.</title>
        <meta charSet="UTF-8"/>
        <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="title" content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."/>
        <meta name="description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."/>
        <meta name="keywords" content="parasol,parasol-finance,launchpad,solana,ido,ico,cryptocurrencies,binance"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.parasol.finance/"/>
        <meta property="og:title" content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."/>
        <meta property="og:description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."/>
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:site" content="@parasol_finance"/>
        <meta property="twitter:creator" content="@parasol_finance"/>
        <meta property="twitter:url" content="https://www.parasol.finance/"/>
        <meta property="twitter:title" content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."/>
        <meta property="twitter:description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."/>
        <meta property="og:image" content="/images/preview/default.png"/>
        <meta property="twitter:image" content="/images/preview/default.png"/>
      </Head>
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            autoConnect={true}
          >
            <WalletModalProvider>
              <AnnounceBar/>
              <Toaster
                position="top-right"
                reverseOrder={false}
                containerClassName="stickyImportant top-0"
              /> 
              {/* <Notification type={NotificationType.Danger} title={"Saved Changes"} message={"The content has been successfully saved."}/> */}
              <Header/>
              <main role="main">
                <SimpleReactLightbox>
                  <TokenModalProvider>
                    <NftProvider {...pageProps} >
                      <Component {...pageProps} />
                    </NftProvider>
                  </TokenModalProvider>
                </SimpleReactLightbox>
              </main>
              <Footer/>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </>
  );
};

export default App;
