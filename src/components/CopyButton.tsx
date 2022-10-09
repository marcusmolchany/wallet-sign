import { ReactElement, useState } from "react";

type Props = { text: string };

const BUTTON_TEXT = Object.freeze({
  COPY: "Copy",
  COPIED: "Copied!",
});

export function CopyButton({ text }: Props): ReactElement {
  const [buttonText, setButtonText] = useState<string>(BUTTON_TEXT.COPY);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    setButtonText(BUTTON_TEXT.COPIED);
    setTimeout(() => {
      setButtonText(BUTTON_TEXT.COPY);
    }, 800);
  };

  return <button onClick={onClick}>{buttonText}</button>;
}
