import React, { FC, useEffect, useMemo, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Router, { useRouter } from "next/router";

import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import SimpleReactLightbox from "simple-react-lightbox";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";

import Header from "components/header";
import AnnounceBar from "components/slices/announce-bar";
import Footer from "components/footer";
import { TokenModalProvider } from "components/token-chooser/TokenModalProvider";
import { getWalletAdapterNetwork } from "core/solana-network";
import { WalletModalProvider } from "components/wallet-connector";
import { ReminderModalProvider } from "components/reminder-modal/ReminderModalProvider";
import { NftProvider } from "context/NftContext";

import "styles/globals.scss";
import "nprogress/nprogress.css";
import ProjectProvider from "context/ProjectContext";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const network: WalletAdapterNetwork = getWalletAdapterNetwork(
    process.env.NEXT_PUBLIC_NETWORK
  );

  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_CUSTOM_RPC || clusterApiUrl(network),
    [network]
  );
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
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

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

  const [siteBg, setBackgroundCover] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    setBackgroundCover("");
  }, [router.query]);

  return (
    <>
      <Head>
        <title>
          Parasol Finance ($PSOL) | Community Governed Launchpad on Solana.
        </title>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="title"
          content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."
        />
        <meta
          name="description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."
        />
        <meta
          name="keywords"
          content="parasol,parasol-finance,launchpad,solana,ido,ico,cryptocurrencies,binance"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.parasol.finance/" />
        <meta
          property="og:title"
          content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."
        />
        <meta
          property="og:description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@parasol_finance" />
        <meta property="twitter:creator" content="@parasol_finance" />
        <meta property="twitter:url" content="https://www.parasol.finance/" />
        <meta
          property="twitter:title"
          content="Parasol Finance ($PSOL) | Community Governed Launchpad on Solana."
        />
        <meta
          property="twitter:description"
          content="Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs of both projects and investors alike."
        />
        <meta property="og:image" content="/assets/preview/default.png" />
        <meta property="twitter:image" content="/assets/preview/default.png" />
      </Head>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>
            <div
              className={
                "pointer-events-none absolute z-0 h-screen w-full opacity-30"
              }
            >
              <div className="absolute inset-0">
                <img
                  className="mask-image h-full w-full object-cover blur"
                  src={siteBg}
                  alt="IDO Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#b064fe4D]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0000004D]" />
              </div>
            </div>
            <AnnounceBar />
            <div className={"sticky top-0 z-50 w-full"}>
              <Toaster
                containerClassName={"!absolute !inset-0 w-full h-screen"}
                containerStyle={{}}
                position={"top-right"}
                gutter={0}
              />
            </div>
            <Header />
            <SimpleReactLightbox>
              <TokenModalProvider>
                <ReminderModalProvider>
                  <NftProvider>
                    <ProjectProvider>
                      <Component
                        {...pageProps}
                        setBackgroundCover={setBackgroundCover}
                      />
                    </ProjectProvider>
                  </NftProvider>
                </ReminderModalProvider>
              </TokenModalProvider>
            </SimpleReactLightbox>
            <Footer />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      {process.env.NEXT_PUBLIC_NETWORK == "mainnet" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_KEY}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${process.env.GOOGLE_ANALYTICS_KEY});
              `}
          </Script>
        </>
      )}
    </>
  );
};

export default App;
