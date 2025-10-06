import { useState, useRef, useEffect } from "react";
import {
    PCInit,
    userInfoInit,
    joinInWs,
} from "../../../library/util/streamerUtil";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const URL_WEB_SOCKET = process.env.REACT_APP_SIGSERVER;

const StreamerDashBoard = () => {
    const userId =
        Cookies.get("nickname") + "#" + crypto.randomUUID().slice(0, 4);
    const channelName = useParams();
    const [assignedAtWs, setAssignedAtWs] = useState(false);

    const mediaStream = useRef(null);
    const ws = useRef(null);
    const pcs = useRef(new Map());
    const iceCandidateQueue = useRef([]);

    const addCandidate = (cd, pc) => {
        // console.log(
        //     `addCandidate invoked ${
        //         pc?.remoteDescription ? "[add in pc]" : "[push in queue]"
        //     }`
        // );
        if (!pc || pc?.remoteDescription === null)
            iceCandidateQueue.current.push(cd);
        else pc.addIceCandidate(cd);
    };

    const setAllCandidates = (pc) => {
        // console.log("setAllCandidates invoked");
        iceCandidateQueue.current.forEach((cd) => {
            console.log("add candidate in queue");
            addCandidate(cd, pc);
        });
        iceCandidateQueue.current = [];
    };

    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);

        wsClient.onopen = () => {
            // console.log("WebSocket opened");
            ws.current = wsClient;
            if (ws.current != null) setAssignedAtWs(true);
        };

        // wsClient.onclose = () => console.log("WebSocket closed");

        return () => {
            wsClient.close(1000, "S"); // "S"treamer
            ws.current = null;
            setAssignedAtWs(false);
            userInfoInit({
                mediaStream: mediaStream.current,
            });
            for (const e of pcs.current.values()) e.close();
            pcs.current = new Map();
        };
    }, []);

    useEffect(() => {
        if (userId === "" || channelName === "") return;
        if (!assignedAtWs) return;
        ws.current.onmessage = async (msg) => {
            const parsedMessage = JSON.parse(msg.data);
            // console.log(`WebSocket message received: ${parsedMessage.type}`);
            const body = parsedMessage.body;
            switch (parsedMessage.type) {
                case "joined": {
                    // console.log(`User enter channel ${channelName}`);
                    break;
                }
                case "offer_sdp_received": {
                    const pc = new RTCPeerConnection();
                    pcs.current.set(body.sender, pc);
                    PCInit({
                        pc,
                        ws: ws.current,
                        channelName,
                        userId,
                        sender: body.sender,
                        sdp: body.sdp,
                        mediaStream: mediaStream.current,
                        setAllCandidates,
                    });
                    break;
                }
                case "ice_candidate_received": {
                    // console.log(`ice candidate received at viewer ${body}`);
                    // console.log(body);
                    addCandidate(body.candidate, pcs.current.get(body.sender));
                    break;
                }
                default:
                    break;
            }
        };
    }, [userId, channelName]);

    return (
        <div className="container">
            <div className="header" style={{ textAlign: "center" }}>
                <h1>Streamer's DashBoard</h1>
            </div>
            <div className="body">
                <button
                    onClick={() =>
                        joinInWs({
                            ws: ws.current,
                            channelName,
                            userId,
                        })
                    }
                >
                    Streaming Start !!!
                </button>
                <br />
                <video
                    id="streamed-video"
                    style={{
                        width: 640,
                        height: 480,
                        border: "black solid 1px",
                    }}
                    autoPlay
                    muted
                ></video>
            </div>
        </div>
    );
};

export default StreamerDashBoard;
