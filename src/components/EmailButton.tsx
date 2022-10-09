import { ReactElement } from "react";
import { SafeExternalLink } from "./SafeExternalLink";

const getMailtoLink = (emailText: string): string =>
  `mailto:?subject=Wallet Sign Message&body=${emailText}`;

type Props = {
  emailText: string;
  text?: string;
};

export function EmailButton({
  emailText,
  text = "Email",
}: Props): ReactElement {
  return (
    <SafeExternalLink href={getMailtoLink(emailText)}>{text}</SafeExternalLink>
  );
}
