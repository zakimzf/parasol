import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export enum CLUSTERS {
    Dev = "devnet",
    Main = "mainnet",
    Test = "testnet",
}

export const getWalletAdapterNetwork = (networkName: String|undefined): WalletAdapterNetwork => {
  switch (networkName) {
    case CLUSTERS.Main:
      return WalletAdapterNetwork.Mainnet;
    case CLUSTERS.Dev:
      return WalletAdapterNetwork.Devnet;
    case CLUSTERS.Test:
      return WalletAdapterNetwork.Testnet;
    default:
      return WalletAdapterNetwork.Mainnet;
  }
}