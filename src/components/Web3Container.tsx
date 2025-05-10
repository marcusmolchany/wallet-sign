import { type ReactElement } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "WalletSign",
  projectId: "cf817cc7e3197441a6c2f4e61d96d01c",
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export function Web3Container({ children }: Props): ReactElement {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
