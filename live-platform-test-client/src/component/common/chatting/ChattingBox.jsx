import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import GetRecentlyChats from "../../../library/api/GetRecentlyChats";

const ChattingBox = () => {
    const clientRef = useRef(null);
    const [inputMessage, setInputMessage] = useState("");
    // const [csrf, setCsrf] = useState([]); // [headerName, headerValue]
    const [token, setToken] = useState("");
    const { channelName } = useParams();
    const [chattingList, setChattingList] = useState([]);
    const URL_CHATTING_SERVER = process.env.REACT_APP_CHATTING_SERVER;

    // useEffect(() => {
    //     axios.get("http://localhost:8080/csrf").then((res) => {
    //         const hn = res.data.headerName;
    //         const hv = res.data.token;
    //         setCsrf([hn, hv]);
    //     });
    // }, []);

    useEffect(() => {
        // if (csrf !== null && csrf !== undefined && csrf.length > 1) {
        setToken(Cookies.get("accessToken"));
        // console.log(token);
        const client = new Client({
            webSocketFactory: () => new SockJS(URL_CHATTING_SERVER),
            // brokerURL: "ws://localhost:8080/chatting",
            reconnectDelay: 5000,
            // debug: (str) => console.log("[STOMP]", str),
            onConnect: () => {
                // console.log("O STOMP connection success!");
                client.subscribe(`/sub/chat/${channelName}`, (msg) => {
                    // console.log("[SUBSCRIBE]");
                    // console.log(msg);
                    // console.log("[---------]");
                    setChattingList((prev) => [...prev, JSON.parse(msg.body)]);
                });
                client.subscribe("/sub/error", (msg) => {
                    // console.log("[ERROR]");
                    // console.log(msg);
                    // console.log("[---------]");
                });
                GetRecentlyChats({ channelName }).then((res) => {
                    const body = res.data;
                    setChattingList(body.chats);
                });
            },
            onStompError: (frame) => {
                console.error("X STOMP error", frame.headers["message"]);
                // console.error(frame);
            },
            connectHeaders: {
                Authorization: token,
                // [csrf[0]]: csrf[1],
                // "X-XSRF-TOKEN": csrf[1]
            },
        });
        client.activate();
        clientRef.current = client;
        // }
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);
    const sendMessage = () => {
        const destination = `/app/message/${channelName}`;
        const body = {
            sender: Cookies.get("nickname"),
            message: inputMessage,
        };
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination,
                body: JSON.stringify(body),
                headers: {
                    Authorization: token,
                },
            });
        } else {
            console.warn("! STOMP client isn't connect yet");
        }
        setInputMessage("");
    };

    // const causeError = () => {
    //     const dest = "/app/cause/exception";
    //     if (clientRef.current && clientRef.current.connected) {
    //         clientRef.current.publish({
    //             destination: dest,
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //     } else {
    //         console.warn("! STOMP client isn't connect yet");
    //     }
    // };

    return (
        <div
            className="chatting-box"
            style={{ border: "1px solid black", padding: "10px", width: "50%" }}
        >
            <ul id="chatList">
                {chattingList.map((chat, index) => (
                    <li key={index}>
                        {chat.sender}: {chat.message}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="채팅을 입력해주세요"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default ChattingBox;
