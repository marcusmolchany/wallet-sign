import { utils as ethersUtils } from "ethers";
import { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { CopyButton } from "./CopyButton";
import { EmailButton } from "./EmailButton";
import { PreWrap } from "./PreWrap";
import "./SignatureForm.css";
import { TweetButton } from "./TweetButton";

const getRandomName = (): string => {
  const names = [
    "Vitalik Buterin",
    "Grace Hopper",
    "Alan Turing",
    "Kanye West",
    "Elon Musk",
    "Barak Obama",
    "Justin Bieber",
    "Katy Perry",
    "Rihanna",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};
const RANDOM_NAME = getRandomName();

const getPostmessage = ({
  address,
  name,
}: {
  address?: string;
  name?: string;
}): string => {
  let postMessage = "";
  if (address) {
    postMessage += `\n\naddress: ${address}`;
  }
  if (name) {
    postMessage += `\nname: ${name}`;
  }
  return postMessage;
};

const INITIAL_MESSAGE =
  "I hereby decree that this message has been signed by me.\n\nSigned using Wallet Sign";

type Props = {
  initialMessage?: string;
};

export function SignatureForm({
  initialMessage = INITIAL_MESSAGE,
}: Props): ReactElement {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>(initialMessage);
  const [messageThatWasSigned, setMessageThatWasSigned] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");
  const [hashedMessage, setHashedMessage] = useState<string>("");

  const postMessage = useMemo(
    () => getPostmessage({ address, name }),
    [address, name]
  );
  const messageToSign = useMemo(
    () => `${message}${postMessage}`,
    [address, name, message]
  );
  const combinedMessages = useMemo(
    () => [messageThatWasSigned, signedMessage, hashedMessage].join("\n\n"),
    [messageThatWasSigned, signedMessage, hashedMessage]
  );
  const isAddressConnected = !!address;

  const resetMessageState = () => {
    setMessageThatWasSigned("");
    setSignedMessage("");
    setHashedMessage("");
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setName(value.trim());
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    setMessage(value.trimStart());
  };

  const onResetClick = () => {
    resetMessageState();
  };

  const onSignClick = async () => {
    resetMessageState();

    try {
      const _signedMessage = await signMessageAsync({ message: messageToSign });
      setMessageThatWasSigned(messageToSign);
      setSignedMessage(_signedMessage);
      setHashedMessage(
        ethersUtils.keccak256(ethersUtils.toUtf8Bytes(messageToSign))
      );
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
        placeholder={RANDOM_NAME}
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
      <div className="signatureForm_pre">
        <PreWrap>{messageToSign}</PreWrap>
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
            <div className="signatureForm_pre">
              <PreWrap>{messageThatWasSigned}</PreWrap>
            </div>
            <div className="signatureForm_buttonGroup">
              <CopyButton text={messageThatWasSigned} />
            </div>
          </div>
          <div>
            <h3>Signed message:</h3>
            <p>
              ℹ️ This is your wallet’s signature of the original message. This
              proves that you signed the original message.
            </p>
            <div className="signatureForm_pre">
              <PreWrap>{signedMessage}</PreWrap>
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
            <h3>Hashed unsigned message (keccak256):</h3>
            <p>
              ℹ️ This is the keccak256 hash of the original <i>unsigned</i>{" "}
              message. This can be used to prove authenticity of the original
              message text string. It <i>does not</i> prove that you signed the
              original message.
            </p>
            <div className="signatureForm_pre">
              <PreWrap>{hashedMessage}</PreWrap>
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
            <h3>Message, signed message, and hashed unsigned message:</h3>
            <details>
              <summary className="signatureForm_summary">Expand</summary>
              <div className="signatureForm_pre">
                <PreWrap>{combinedMessages}</PreWrap>
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
