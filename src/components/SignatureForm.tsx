import { utils as ethersUtils } from "ethers";
import { ChangeEvent, useMemo, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SafeExternalLink } from "./SafeExternalLink";
import "./SignatureForm.css";

const getPremessage = ({
  address,
  name,
}: {
  address?: string;
  name?: string;
}): string => {
  const addressAndOrName =
    address || name
      ? `(${address && name ? `${address} ${name}` : address ? address : name})`
      : "";
  return `I ${addressAndOrName}`;
};

const getTwitterShareLink = (strings: string[]): string => {
  const twitterShareIntentBase = "https://twitter.com/intent/tweet";
  return `${twitterShareIntentBase}?text=${encodeURI(strings.join("\n\n"))}`;
};

const INITIAL_MESSAGE =
  "here by decree that this message has been signed by me.";

export function SignatureForm() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>(INITIAL_MESSAGE);
  const [hashedMessage, setHashedMessage] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");

  const preMessage = useMemo(
    () => getPremessage({ address, name }),
    [address, name]
  );
  const messageToSign = useMemo(
    () => `${preMessage} ${message}`,
    [address, name, message]
  );
  const isAddressConnected = !!address;

  const resetMessageState = () => {
    setHashedMessage("");
    setSignedMessage("");
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setName(value.trim());
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    setMessage(value.trim());
  };

  const onResetClick = () => {
    resetMessageState();
  };

  const onSignClick = async () => {
    resetMessageState();

    try {
      const _signedMessage = await signMessageAsync({ message: messageToSign });
      setHashedMessage(
        ethersUtils.keccak256(ethersUtils.toUtf8Bytes(messageToSign))
      );
      setSignedMessage(_signedMessage);
    } catch (e) {
      window.alert("Something went wrong...");
    }
  };

  return (
    <div className="signatureForm">
      {!isAddressConnected ? (
        <div>Connect your account to sign this message</div>
      ) : null}
      <h3>Name (optional)</h3>
      <input
        className="signatureForm_input"
        type="text"
        placeholder="Vitalik Buterin"
        onChange={onNameChange}
      />
      <h3>Message</h3>
      <textarea
        className="signatureForm_textarea"
        disabled={!isAddressConnected}
        onChange={onMessageChange}
        value={message}
      ></textarea>
      <h3>Message to sign</h3>
      <code>{messageToSign}</code>
      <div className="signatureForm_buttonGroup">
        <button onClick={onResetClick}>Reset</button>
        <button disabled={!isAddressConnected} onClick={onSignClick}>
          Sign
        </button>
      </div>
      {signedMessage ? (
        <div>
          <hr />
          <div>
            <h3>Message:</h3>
            <p>{messageToSign}</p>
          </div>
          <div>
            <h3>Hashed message (keccak256):</h3>
            <p>{hashedMessage}</p>
            <SafeExternalLink href={getTwitterShareLink([hashedMessage])}>
              Tweet your hashed message
            </SafeExternalLink>
          </div>
          <div>
            <h3>Signed message:</h3>
            <p>{signedMessage}</p>
            <SafeExternalLink href={getTwitterShareLink([signedMessage])}>
              Tweet your signed message
            </SafeExternalLink>
          </div>
          <div>
            <h3>Message, hashed message, and signed message:</h3>
            <SafeExternalLink
              href={getTwitterShareLink([
                messageToSign,
                hashedMessage,
                signedMessage,
              ])}
            >
              Tweet your message, hashed message, and signed message
            </SafeExternalLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
