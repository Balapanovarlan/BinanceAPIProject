import '@rainbow-me/rainbowkit/styles.css';

import {
    connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider } from 'wagmi';
import {
  mainnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'My wallets',
            wallets: [metaMaskWallet],
        }
    ],
    {
        appName: 'Dashboard',
        projectId: "YOUR_PROJECT_ID",
    }
)

const config = createConfig({
    chains: [mainnet],
    connectors: connectors,
});

const queryClient = new QueryClient();

export const Web3Provider = ({children}) => {
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

