import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__links">
        <Link to="/">
          <h2 className="header_h2">✍️ Wallet Sign</h2>
        </Link>
        <Link to="/">Sign</Link>
        <Link to="verify">Verify</Link>
      </div>
      <ConnectButton chainStatus="none" />
    </header>
  );
}
