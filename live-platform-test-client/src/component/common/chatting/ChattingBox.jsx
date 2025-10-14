import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";
import GetRecentlyChats from "../../../library/api/GetRecentlyChats";
import "../../../asset/css/ChattingBox.css";

const ChattingBox = ({ channelName }) => {
  const clientRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [token, setToken] = useState("");
  const [chattingList, setChattingList] = useState([]);
  const URL_CHATTING_SERVER =
    process.env.REACT_APP_HTTPSERVER + "/chatting";

  useEffect(() => {
    setToken(Cookies.get("accessToken"));
    const client = new Client({
      webSocketFactory: () => new SockJS(URL_CHATTING_SERVER),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/sub/chat/${channelName}`, (msg) => {
          setChattingList((prev) => [...prev, JSON.parse(msg.body)]);
        });
        GetRecentlyChats({ channelName }).then((res) => {
          setChattingList(res.data.chats || []);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame.headers["message"]);
      },
      connectHeaders: {
        Authorization: token,
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) clientRef.current.deactivate();
    };
  }, [channelName]);

  const sendMessage = () => {
    const destination = `/app/message/${channelName}`;
    const body = {
      sender: Cookies.get("nickname") || "익명",
      message: inputMessage.trim(),
    };
    if (inputMessage.trim() === "") return;
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(body),
        headers: { Authorization: token },
      });
      setInputMessage("");
    } else {
      console.warn("STOMP client is not connected yet");
    }
  };

  return (
    <div className="chatting-box">
      <div className="chatting-header">💬 채팅</div>
      <div className="chatting-messages">
        {chattingList.map((chat, i) => (
          <div key={i} className="chat-message">
            <span className="chat-sender">{chat.sender}</span>
            <span className="chat-text">{chat.message}</span>
          </div>
        ))}
      </div>
      <div className="chatting-input-box">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChattingBox;
