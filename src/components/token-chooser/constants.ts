import {useJupiter} from "@jup-ag/react-hook";

export interface Token {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    tags: string[];
}

export interface IJupiterFormProps
{
}

export type UseJupiterProps = Parameters<typeof useJupiter>[0];
