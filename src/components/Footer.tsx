import { ReactElement } from "react";
import packageJson from "../../package.json";
import { SafeExternalLink } from "./SafeExternalLink";
import "./Footer.css";

const { homepage, version } = packageJson;

export function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div>
        <SafeExternalLink href={homepage}>Github</SafeExternalLink>
      </div>
      <div>v{version}</div>
      <div>Made by molchanimal.eth</div>
    </footer>
  );
}
