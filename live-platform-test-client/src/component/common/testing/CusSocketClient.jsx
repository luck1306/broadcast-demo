import { useState } from "react";
import {
  socketDisconnect,
  socketInit,
  socketSendMessage,
} from "../../../library/util/socketUtil";

const CusSocketClient = () => {
  const [serverUrl, setServerUrl] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <fieldset style={{ width: "500px" }}>
        <legend>Text Message</legend>
        <fieldset>
          <legend>Server Information</legend>
          <input
            type="text"
            name="serverUrl"
            id="serverUrl"
            placeholder="please input server url"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                socketInit({ serverUrl });
              }
            }}
            onChange={(e) => setServerUrl(e.target.value)}
          />
          <br />
          <button onClick={() => socketInit({ serverUrl })}>Connect</button>
          <button onClick={socketDisconnect}>DisConnect</button>
        </fieldset>
        <fieldset>
          <legend>Chatting Box</legend>
          <input
            id="inputMessage"
            type="text"
            name="inputMessage"
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                socketSendMessage({ message, setMessage });
              }
            }}
          />
          <br />
          <button onClick={() => socketSendMessage({ message, setMessage })}>
            Send
          </button>
        </fieldset>
      </fieldset>
    </>
  );
};

export default CusSocketClient;
