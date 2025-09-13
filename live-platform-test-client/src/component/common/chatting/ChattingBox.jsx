import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChattingBox = () => {
    const clientRef = useRef(null);
    const [inputMessage, setInputMessage] = useState("");
    // const [csrf, setCsrf] = useState([]); // [headerName, headerValue]
    const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZjEzNTcyOS02NjMyLTQzM2MtYmY0MS1jOWRiMzYxMDY5ZjYiLCJleHAiOjE3NjAyNjY3OTgsInR5cCI6InJlZnJlc2gifQ.2OOOUpa40z5M612EczVQKfoZO4vaqkv-nbrFa_01nRI";

    // useEffect(() => {
    //     axios.get("http://localhost:8080/csrf").then((res) => {
    //         const hn = res.data.headerName;
    //         const hv = res.data.token;
    //         setCsrf([hn, hv]);
    //     });
    // }, []);

    useEffect(() => {
        // if (csrf !== null && csrf !== undefined && csrf.length > 1) {
            const client = new Client({
                webSocketFactory: () =>
                    new SockJS("http://localhost:8080/chatting"),
                // brokerURL: "ws://localhost:8080/chatting",
                reconnectDelay: 5000,
                debug: (str) => console.log("[STOMP]", str),
                onConnect: () => {
                    console.log("O STOMP connection success!");
                    client.subscribe("/sub/chat/woonil_channel", (msg) => {
                        console.log("[SUBSCRIBE]");
                        console.log(msg);
                        console.log("[---------]");
                    });
                },
                onStompError: (frame) => {
                    console.error("X STOMP error", frame.headers["message"]);
                    console.error(frame);
                },
                connectHeaders: {
                    Authorization: "Bearer " + token,
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
        const destination = "/app/message/woonil_channel";
        const body = {
            sender: "theodore",
            message: inputMessage,
        };
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination,
                body: JSON.stringify(body),
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
        } else {
            console.warn("! STOMP client isn't connect yet");
        }
    };
    return (
        <div className="chatting-box">
            <ul id="chatList"></ul>
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
