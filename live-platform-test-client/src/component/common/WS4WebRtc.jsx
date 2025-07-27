/**
 * @deprecated Refactoring 
 * reference : https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
 */

import { useEffect, useRef } from "react";

const URL_WEB_SOCKET = "ws://localhost:4041/ws";

const WS4WebRtc = () => {
    const ws = useRef(null);
    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);

        wsClient.onopen = () => {
            console.log("ws opened");
            ws.current = wsClient;
            // setup camera and join channel after ws opened
            join();
            setupDevice();
        };
        wsClient.onclose = () => console.log("ws closed");
        wsClient.onmessage = (msg) => {
            console.log(`ws message received ${msg.data}`);
            const parsedMessage = JSON.parse(msg.data);
            switch (parsedMessage.type) {
                case "joined":
                    const body = parsedMessage.body;
                    console.log(`users in this channel ${body}`);
                    break;
                case "offer_sdp_received":
                    const offer = parsedMessage.body;
                    // onAnswer(offer);
                    break;
                case "answer_sdp_received":
                    // gotRemoteDescription(parsedMessage.body);
                    break;
                case "quit":
                    break;
                default:
                    break;
            }
        };
        return () => {
            wsClient.close();
        }
    }, []);
};

export default WS4WebRtc;
