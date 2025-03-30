import '@rainbow-me/rainbowkit/styles.css';

import {
    connectorsForWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider } from 'wagmi';
import {
    mainnet,
    sepolia,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { metaMaskWallet, okxWallet, phantomWallet } from '@rainbow-me/rainbowkit/wallets';


const connectors = connectorsForWallets(
    [
        {
            groupName: "My wallets",
            wallets: [metaMaskWallet, phantomWallet, okxWallet],
        },
    ],
    {
        appName: "Dashboard",
        projectId: "YOUR_PROJECT_ID",
    }
);

const config = createConfig({
    chains: [sepolia],
    connectors: connectors,
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
