import { utils as ethersUtils } from "ethers";
import { ChangeEvent, useMemo, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { CopyButton } from "./CopyButton";
import { SafeExternalLink } from "./SafeExternalLink";
import "./SignatureForm.css";
import { TweetButton } from "./TweetButton";

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
  const combinedMessages = useMemo(
    () => [messageToSign, hashedMessage, signedMessage].join("\n\n"),
    [messageToSign, hashedMessage, signedMessage]
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
        <button disabled={!signedMessage} onClick={onResetClick}>
          Reset
        </button>
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
            <CopyButton text={hashedMessage} />
            <TweetButton
              text="Tweet your hashed message"
              tweetText={hashedMessage}
            />
          </div>
          <div>
            <h3>Signed message:</h3>
            <p>{signedMessage}</p>
            <CopyButton text={signedMessage} />
            <TweetButton
              text="Tweet your signed message"
              tweetText={signedMessage}
            />
          </div>
          <div>
            <h3>Message, hashed message, and signed message:</h3>
            <CopyButton text={combinedMessages} />
            <TweetButton
              text="Tweet your message, hashed message, and signed message"
              tweetText={combinedMessages}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
