import { ReactElement } from "react";
import { SafeExternalLink } from "./SafeExternalLink";

const getTwitterShareLink = (tweetText: string): string => {
  const twitterShareIntentBase = "https://twitter.com/intent/tweet";
  return `${twitterShareIntentBase}?text=${encodeURI(tweetText)}`;
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
