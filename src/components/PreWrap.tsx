import { ReactElement } from "react";

type Props = {
  children: string;
};

export function PreWrap({ children }: Props): ReactElement {
  return <pre style={{ whiteSpace: "pre-wrap" }}>{children}</pre>;
}
