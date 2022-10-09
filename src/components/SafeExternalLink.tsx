import { ReactElement } from "react";

type Props = {
  href: string;
  children: string | React.ReactNode;
};

export function SafeExternalLink({ href, children }: Props): ReactElement {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
