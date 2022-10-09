import { utils as ethersUtils } from "ethers";
import { ChangeEvent, useMemo, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { CopyButton } from "./CopyButton";
import { EmailButton } from "./EmailButton";
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
  "hereby decree that this message has been signed by me.\n\nSigned using Wallet Sign";

export function SignatureForm() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>(INITIAL_MESSAGE);
  const [messageThatWasSigned, setMessageThatWasSigned] = useState<string>("");
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
    () => [messageThatWasSigned, hashedMessage, signedMessage].join("\n\n"),
    [messageThatWasSigned, hashedMessage, signedMessage]
  );
  const isAddressConnected = !!address;

  const resetMessageState = () => {
    setMessageThatWasSigned("");
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
      setMessageThatWasSigned(messageToSign);
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
        <div className="signatureForm_connectMessage">
          ℹ️ Connect your account to sign this message
        </div>
      ) : null}
      <h3>Name (optional)</h3>
      <input
        className="signatureForm_input"
        disabled={!isAddressConnected}
        type="text"
        placeholder="Vitalik Buterin"
        onChange={onNameChange}
      />
      <h3>Message</h3>
      <textarea
        className="signatureForm_textarea"
        disabled={!isAddressConnected}
        rows={4}
        onChange={onMessageChange}
        value={message}
      ></textarea>
      <h3>Message to sign</h3>
      <div className="signatureForm_code">
        <code>{messageToSign}</code>
      </div>
      <div className="signatureForm_buttonGroup flexEnd">
        <button disabled={!signedMessage} onClick={onResetClick}>
          Reset
        </button>
        <button disabled={!isAddressConnected} onClick={onSignClick}>
          Sign
        </button>
      </div>
      <p>
        ℹ️ Wallet Sign <i>only</i> uses the <code>personal_sign</code> method in
        your wallet and does not require a blockchain transaction. Wallet Sign
        will never ask you to sign a transaction that requries using gas, or
        sending ETH, ERC-20 tokens, NFTs, or any other crypto-asset.
      </p>
      {signedMessage ? (
        <div>
          <hr className="signatureForm_hr" />
          <div>
            <h3>Message:</h3>
            <div className="signatureForm_code">
              <code>{messageThatWasSigned}</code>
            </div>
            <div className="signatureForm_buttonGroup">
              <CopyButton text={messageThatWasSigned} />
            </div>
          </div>
          <div>
            <h3>Hashed message (keccak256):</h3>
            <div className="signatureForm_code">
              <code>{hashedMessage}</code>
            </div>
            <div className="signatureForm_buttonGroup">
              <CopyButton text={hashedMessage} />
              <TweetButton
                text="Tweet your hashed message"
                tweetText={hashedMessage}
              />
              <EmailButton
                text="Email your hashed message"
                emailText={hashedMessage}
              />
            </div>
          </div>
          <div>
            <h3>Signed message:</h3>
            <div className="signatureForm_code">
              <code>{signedMessage}</code>
            </div>
            <div className="signatureForm_buttonGroup">
              <CopyButton text={signedMessage} />
              <TweetButton
                text="Tweet your signed message"
                tweetText={signedMessage}
              />
              <EmailButton
                text="Email your signed message"
                emailText={signedMessage}
              />
            </div>
          </div>
          <div>
            <h3>Message, hashed message, and signed message:</h3>
            <details>
              <summary className="signatureForm_summary">Expand</summary>
              <div className="signatureForm_code">
                <code>{combinedMessages}</code>
              </div>
            </details>
            <div className="signatureForm_buttonGroup">
              <CopyButton text={combinedMessages} />
              <TweetButton
                text="Tweet everything"
                tweetText={combinedMessages}
              />
              <EmailButton
                text="Email everything"
                emailText={combinedMessages}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
