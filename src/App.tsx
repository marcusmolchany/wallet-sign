import {
  getDefaultWallets,
  ConnectButton,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <header>
            <h2>✍️ Wallet Sign</h2>
            <ConnectButton />
          </header>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
