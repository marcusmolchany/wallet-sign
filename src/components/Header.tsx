import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__links">
        <NavLink to="/" end>
          <h2 className="header_h2">✍️ Wallet Sign</h2>
        </NavLink>
        <NavLink to="/" end>
          Sign
        </NavLink>
        <NavLink to="verify" end>
          Verify
        </NavLink>
      </div>
      <ConnectButton chainStatus="none" />
    </header>
  );
}
