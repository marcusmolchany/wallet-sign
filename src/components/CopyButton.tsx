import { ReactElement } from "react";

type Props = { text: string };

export function CopyButton({ text }: Props): ReactElement {
  const onClick = () => {
    navigator.clipboard.writeText(text);
  };
  return <button onClick={onClick}>Copy</button>;
}
