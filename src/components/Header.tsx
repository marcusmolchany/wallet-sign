import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <h2 className="header_h2">✍️ Wallet Sign</h2>
      <ConnectButton chainStatus="none" />
    </header>
  );
}
