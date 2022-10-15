import { useSearchParams } from "react-router-dom";
import { SignatureForm } from "../components/SignatureForm";

export function Sign() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message") || undefined;

  return <SignatureForm initialMessage={message} />;
}
