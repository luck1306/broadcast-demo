import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import viewerUtil from "../../../library/util/viewerUtil";

const URL_WEB_SOCKET = process.env.REACT_APP_SIGSERVER;

const BroadcastViewer = () => {
    const [muted, setMuted] = useState(true);
    const ws = useRef(null);
    const peerConnection = useRef(new RTCPeerConnection());
    const iceCandidateQueue = useRef([]);
    const { channelName } = useParams();
    const receivedState = useLocation().state;
    const userId = receivedState.current;

    const addCandidate = (cd) => {
        console.log(
            `addCandidate invoked ${
                peerConnection.current.remoteDescription
                    ? "[add in pc]"
                    : "[push in queue]"
            }`
        );
        if (peerConnection.current.remoteDescription === null)
            iceCandidateQueue.current.push(cd);
        else peerConnection.current.addIceCandidate(cd);
    };

    useEffect(() => {
        const signalingSocket = new WebSocket(URL_WEB_SOCKET);
        signalingSocket.onopen = () => {
            console.log("WebSocket opened");
            ws.current = signalingSocket;
            signalingSocket.send(
                JSON.stringify({ type: "join", body: { channelName, userId } })
            );
        };
        signalingSocket.onclose = () => {
            console.log("WebSocket closed");
        };
        signalingSocket.onmessage = async (message) => {
            console.log("WebSocket message received");
            // console.log(message.data);
            const msg = JSON.parse(message.data);
            const body = msg.body;
            switch (msg.type) {
                case "joined": {
                    console.log("User enter channel " + channelName);
                    viewerUtil.settingViewerPC(
                        peerConnection.current,
                        channelName,
                        userId,
                        ws.current
                    );
                    break;
                }
                case "answer_sdp_received": {
                    console.log("received success answer sdp");
                    console.log(msg);
                    await peerConnection.current.setRemoteDescription(body);
                    iceCandidateQueue.current.forEach((e) => {
                        console.log(
                            `addCandidate invoked ${
                                peerConnection.current.remoteDescription
                                    ? "[add in pc]"
                                    : "[push in queue]"
                            }`
                        );
                        // if (peerConnection.current.remoteDescription === null)
                        //     console.log("add candidate in queue");
                        peerConnection.current.addIceCandidate(e);
                    });
                    iceCandidateQueue.current = [];
                    break;
                }
                case "ice_candidate_received": {
                    console.log("ice candidate received at streamer");
                    addCandidate(body);
                    break;
                }
                case "quit": {
                    window.alert("User quit channel " + channelName);
                    signalingSocket.close();
                    ws.current = null;
                    peerConnection.current.close();
                    peerConnection.current = new RTCPeerConnection();
                    iceCandidateQueue.current = [];
                    window.location.href = "/broadcast-list";
                    break;
                }
                default:
                    break;
            }
        };
        return () => {
            signalingSocket.close();
            ws.current = null;
        };
    }, []);

    return (
        <>
            <h1>여긴 {channelName}의 방송입니다.</h1>
            <p>"{userId}"님 반갑습니다!</p>
            <video
                id="peerPlayer"
                style={{ width: 640, height: 480 }}
                muted={muted}
                autoPlay
                onClick={(e) => console.log(e)}
            ></video>
            <button onClick={() => console.log(peerConnection.current)}>
                rtcpeerconnecton
            </button>
            <button onClick={() => setMuted(false)}>sound enable</button>
        </>
    );
};

export default BroadcastViewer;
