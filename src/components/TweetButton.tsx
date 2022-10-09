import { ReactElement } from "react";
import packageJson from "../../package.json";
import { SafeExternalLink } from "./SafeExternalLink";

const { homepage } = packageJson;

const getTwitterShareLink = (tweetText: string): string => {
  const twitterShareIntentBase = "https://twitter.com/intent/tweet";
  const suffix = `Signed using Wallet Sign ${homepage}`;
  return `${twitterShareIntentBase}?text=${encodeURI(
    `${tweetText}\n\n${suffix}`
  )}`;
};

type Props = {
  text?: string;
  tweetText: string;
};

export function TweetButton({
  text = "Tweet",
  tweetText,
}: Props): ReactElement {
  return (
    <SafeExternalLink href={getTwitterShareLink(tweetText)}>
      {text}
    </SafeExternalLink>
  );
}
