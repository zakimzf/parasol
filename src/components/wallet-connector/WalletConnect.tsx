import React, { Fragment, MouseEventHandler, useCallback, useEffect, useMemo, useState, } from "react";
import { useWalletModal } from "./useWalletModal";
import { Menu, Transition } from "@headlessui/react";
import { ClipboardCopyIcon, LogoutIcon } from "@heroicons/react/outline";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, NftStore, NftStoreConfig, User } from "parasol-finance-sdk";

type WalletConnectDetail = {
  Width: String;
  nfts?: Array<any>;
};

const WalletConnect = ({ Width }: WalletConnectDetail) => {
  const { connection } = useConnection();
  const { publicKey, wallet, disconnect, connected }: any = useWallet();
  const wallet_ = useWallet();
  const { setVisible } = useWalletModal();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const [nfts, setNfts] = useState<any>([])

  const getNFTList = async () => {
    const config: NftStoreConfig = {
      paymentMint: new PublicKey(process.env.NEXT_PUBLIC_PAYMENT_MINT as string),
      collectionMint: new PublicKey(process.env.NEXT_PUBLIC_COLLECTION_MINT as string),
    };
    const provider = new AnchorProvider(connection, wallet_ as any, {
      preflightCommitment: "confirmed",
    });
    const nftStore = await new NftStore(provider, config).build();
    const user = await new User(provider, nftStore).build();
    if (user) setNfts(await user.getNFTList());
    console.log(nfts)
  }

  useEffect(() => {
    if (!connected) return;
    getNFTList();
  }, [connected]);

  const content = useMemo(() => {
    if (!wallet || !base58) return null;
    return base58.slice(0, 7) + ".." + base58.slice(-5);
  }, [wallet, base58]);

  const disconnectWallet: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      if (!event.defaultPrevented) disconnect().catch(() => { });
    },
    [disconnect]
  );

  if (!wallet)
    return (
      <button
        onClick={() => setVisible(true)}
        className={`inline-flex items-center px-4 py-2 gap-x-2 text-base font-medium rounded-md bg-purple-2 -bg-gradient-to-r from-purple-1 to-purple-2 text-white hover:bg-white hover:text-purple-2 hover:from-purple-2 hover:to-purple-1 ${Width == "full" ? "w-full items-center justify-center" : ""}`}>
        <svg
          className="h-3"
          viewBox="0 0 96 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M95.5053 67.8049L79.658 84.8288C79.3134 85.1986 78.8966 85.4934 78.4334 85.6949C77.9703 85.8964 77.4706 86.0003 76.9656 86H1.8398C1.48134 86 1.13068 85.8951 0.830924 85.6982C0.531164 85.5013 0.295357 85.221 0.152475 84.8917C0.00959266 84.5624 -0.03414 84.1985 0.0266501 83.8446C0.0874403 83.4908 0.250105 83.1624 0.494658 82.8999L16.3543 65.876C16.6979 65.5072 17.1134 65.2129 17.5751 65.0115C18.0368 64.81 18.5349 64.7056 19.0385 64.7048H94.1602C94.5187 64.7048 94.8693 64.8097 95.1691 65.0066C95.4688 65.2035 95.7046 65.4838 95.8475 65.8131C95.9904 66.1424 96.0341 66.5063 95.9734 66.8601C95.9126 67.214 95.7499 67.5423 95.5053 67.8049ZM79.658 33.5236C79.3134 33.1538 78.8966 32.859 78.4334 32.6575C77.9703 32.456 77.4706 32.3521 76.9656 32.3524H1.8398C1.48134 32.3524 1.13068 32.4573 0.830924 32.6542C0.531164 32.8511 0.295357 33.1314 0.152475 33.4607C0.00959266 33.79 -0.03414 34.1539 0.0266501 34.5078C0.0874403 34.8616 0.250105 35.19 0.494658 35.4525L16.3543 52.4764C16.6979 52.8452 17.1134 53.1394 17.5751 53.3409C18.0368 53.5424 18.5349 53.6468 19.0385 53.6476H94.1602C94.5187 53.6476 94.8693 53.5427 95.1691 53.3458C95.4688 53.1489 95.7046 52.8686 95.8475 52.5393C95.9904 52.21 96.0341 51.8461 95.9734 51.4922C95.9126 51.1384 95.7499 50.81 95.5053 50.5475L79.658 33.5236ZM1.8398 21.2952H76.9656C77.4706 21.2955 77.9703 21.1917 78.4334 20.9902C78.8966 20.7887 79.3134 20.4938 79.658 20.124L95.5053 3.1001C95.7499 2.83758 95.9126 2.50922 95.9734 2.15538C96.0341 1.80153 95.9904 1.4376 95.8475 1.10831C95.7046 0.779013 95.4688 0.498699 95.1691 0.301804C94.8693 0.10491 94.5187 1.21255e-05 94.1602 0L19.0385 0C18.5349 0.000858433 18.0368 0.105251 17.5751 0.306715C17.1134 0.508179 16.6979 0.802426 16.3543 1.17124L0.498747 18.1951C0.25443 18.4574 0.0918367 18.7854 0.0309086 19.1389C-0.0300194 19.4923 0.0133662 19.8559 0.155745 20.1851C0.298123 20.5142 0.533305 20.7945 0.832447 20.9918C1.13159 21.189 1.48169 21.2944 1.8398 21.2952Z"
            fill="currentColor"
          />
        </svg>
        Connect Wallet
        {content}
      </button>
    );

  return (
    <Menu as="div" className={`relative z-10 inline-block text-left ${Width == "full" ? "w-full" : ""}`}>
      <div>
        <Menu.Button className={`inline-flex items-center px-4 py-2 gap-x-2 text-base font-medium rounded-md bg-purple-2 -bg-gradient-to-r from-purple-1 to-purple-2 text-white hover:bg-white hover:text-purple-2 hover:from-purple-2 hover:to-purple-1 ${Width == "full" ? "w-full items-center justify-center" : ""}`}>
          <svg
            className="h-3"
            viewBox="0 0 96 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M95.5053 67.8049L79.658 84.8288C79.3134 85.1986 78.8966 85.4934 78.4334 85.6949C77.9703 85.8964 77.4706 86.0003 76.9656 86H1.8398C1.48134 86 1.13068 85.8951 0.830924 85.6982C0.531164 85.5013 0.295357 85.221 0.152475 84.8917C0.00959266 84.5624 -0.03414 84.1985 0.0266501 83.8446C0.0874403 83.4908 0.250105 83.1624 0.494658 82.8999L16.3543 65.876C16.6979 65.5072 17.1134 65.2129 17.5751 65.0115C18.0368 64.81 18.5349 64.7056 19.0385 64.7048H94.1602C94.5187 64.7048 94.8693 64.8097 95.1691 65.0066C95.4688 65.2035 95.7046 65.4838 95.8475 65.8131C95.9904 66.1424 96.0341 66.5063 95.9734 66.8601C95.9126 67.214 95.7499 67.5423 95.5053 67.8049ZM79.658 33.5236C79.3134 33.1538 78.8966 32.859 78.4334 32.6575C77.9703 32.456 77.4706 32.3521 76.9656 32.3524H1.8398C1.48134 32.3524 1.13068 32.4573 0.830924 32.6542C0.531164 32.8511 0.295357 33.1314 0.152475 33.4607C0.00959266 33.79 -0.03414 34.1539 0.0266501 34.5078C0.0874403 34.8616 0.250105 35.19 0.494658 35.4525L16.3543 52.4764C16.6979 52.8452 17.1134 53.1394 17.5751 53.3409C18.0368 53.5424 18.5349 53.6468 19.0385 53.6476H94.1602C94.5187 53.6476 94.8693 53.5427 95.1691 53.3458C95.4688 53.1489 95.7046 52.8686 95.8475 52.5393C95.9904 52.21 96.0341 51.8461 95.9734 51.4922C95.9126 51.1384 95.7499 50.81 95.5053 50.5475L79.658 33.5236ZM1.8398 21.2952H76.9656C77.4706 21.2955 77.9703 21.1917 78.4334 20.9902C78.8966 20.7887 79.3134 20.4938 79.658 20.124L95.5053 3.1001C95.7499 2.83758 95.9126 2.50922 95.9734 2.15538C96.0341 1.80153 95.9904 1.4376 95.8475 1.10831C95.7046 0.779013 95.4688 0.498699 95.1691 0.301804C94.8693 0.10491 94.5187 1.21255e-05 94.1602 0L19.0385 0C18.5349 0.000858433 18.0368 0.105251 17.5751 0.306715C17.1134 0.508179 16.6979 0.802426 16.3543 1.17124L0.498747 18.1951C0.25443 18.4574 0.0918367 18.7854 0.0309086 19.1389C-0.0300194 19.4923 0.0133662 19.8559 0.155745 20.1851C0.298123 20.5142 0.533305 20.7945 0.832447 20.9918C1.13159 21.189 1.48169 21.2944 1.8398 21.2952Z" fill="currentColor"/>
          </svg>
          {content}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-60 mt-2 origin-top-right bg-[#231f38] rounded-lg shadow-lg divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="relative grid gap-6 gap-8 px-7 py-8">
            {/*<Menu.Item>*/}
            {/*  <Link href={"/profile"}>*/}
            {/*    <a className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5">*/}
            {/*      <span className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true">*/}
            {/*        <UserIcon/>*/}
            {/*      </span>*/}
            {/*      <div className="ml-4">*/}
            {/*        <p className="text-base font-medium text-white">My Profile</p>*/}
            {/*      </div>*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</Menu.Item>*/}
            {nfts.length > 0 && (
              <Menu.Item>
                <ul className={"space-y-4"}>
                  {nfts.map((nft: any) => (<>
                    <div className="relative rounded-lg shadow-md cursor-pointer flex focus:outline-none">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <p className="font-medium text-white">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <img className={"w-12 h-12 rounded-md"} src={nft.image} alt={nft.name}/>
                                </div>
                                <div>
                                  <p className="text-xs">{nft.name}</p>
                                  <h2 className="text-lg whitespace-nowrap">{nft.attributes[0].value}</h2>
                                </div>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>))}
                </ul>
              </Menu.Item>
            )}
            <Menu.Item>
              <a
                onClick={() => navigator.clipboard.writeText(base58 as string)}
                className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5">
                <span className="flex-shrink-0 h-6 w-6 text-purple-2" aria-hidden="true">
                  <ClipboardCopyIcon />
                </span>
                <div className="ml-4">
                  <p className="text-base font-medium whitespace-nowrap text-white">Copy Address</p>
                </div>
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={disconnectWallet}
                className="-m-3 p-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-5"
              >
                <span
                  className="flex-shrink-0 h-6 w-6 text-purple-2"
                  aria-hidden="true"
                >
                  <LogoutIcon />
                </span>
                <div className="ml-4">
                  <p className="text-base font-medium text-white">Disconnect Wallet</p>
                </div>
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default WalletConnect;
