import { ReactElement } from "react";
import packageJson from "../../package.json";
import { SafeExternalLink } from "./SafeExternalLink";
import "./Footer.css";

const { repository, version } = packageJson;

export function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div>
        <SafeExternalLink href={repository.url}>Github</SafeExternalLink>
      </div>
      <div>v{version}</div>
      <div>
        Made by{" "}
        <SafeExternalLink href="https://twitter.com/marcusmolch">
          molchanimal.eth
        </SafeExternalLink>
      </div>
    </footer>
  );
}
