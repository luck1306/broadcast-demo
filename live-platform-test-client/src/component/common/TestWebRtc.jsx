/**
 * @see https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
 */

import { Button, Typography, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import UTILS from "../../library/util/webRtcUtil.js";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const URL_WEB_SOCKET = "wss://192.168.0.11:4040/ws";

const renderHelper = (props) => {
    return (
        <div className="wrapper">
            <Input
                placeholder="User ID"
                style={{ width: 240, marginTop: 16 }}
                value={props.userId}
                onChange={(e) => props.setUserId(e.target.value)}
            />
            <Input
                placeholder="Channel Name"
                style={{ width: 240, marginTop: 16 }}
                value={props.channelName}
                onChange={(e) => props.setChannelName(e.target.value)}
            />
            <Button
                style={{ width: 240, marginTop: 16 }}
                type="primary"
                disabled={props.joinBtnDisabled}
                onClick={() =>
                    UTILS.join({
                        channelName: props.channelName,
                        userId: props.userId,
                        setCallBtnDisabled: props.setCallBtnDisabled,
                        setJoinBtnDisabled: props.setJoinBtnDisabled,
                        socket: props.ws,
                    })
                }
            >
                Join
            </Button>
            {/* <Button
                style={{ width: 240, marginTop: 16 }}
                type="primary"
                disabled={props.callBtnDisabled}
                onClick={() => {
                    UTILS.callOnClick({
                        localIcecandidateOffer: {
                            userId: props.userId,
                            channelName: props.channelName,
                            socket: props.ws,
                        },
                        handleMessage: {
                            setReceiveMessage: props.setReceiveMessage,
                            setSendMessage: props.setSendMessage,
                            setSendBtnDisabled: props.setSendBtnDisabled,
                        },
                        setCallBtnDisabled: props.setCallBtnDisabled,
                        setHangUpBtnDisabled: props.setHangUpBtnDisabled,
                    });
                }}
            >
                Call
            </Button> */}
            <Button
                danger
                style={{ width: 240, marginTop: 16 }}
                type="primary"
                disabled={props.hangUpBtnDisabled}
                onClick={() => {
                    UTILS.hangUpOnClick({
                        setHangUpBtnDisabled: props.setHangUpBtnDisabled,
                        setCallBtnDisabled: props.setCallBtnDisabled,
                        setSendBtnDisabled: props.setSendBtnDisabled,
                    });
                }}
            >
                Hangup
            </Button>
        </div>
    );
};

const renderTextArea = (props) => {
    return (
        <div className="wrapper">
            <TextArea
                style={{ width: 240, marginTop: 16 }}
                placeholder="Send message"
                onChange={(e) => {
                    props.setSendMessage(e.target.value);
                }}
                value={props.sendMessage}
            />
            <TextArea
                style={{ width: 240, marginTop: 16 }}
                placeholder="Receive message"
                disabled
                value={props.receiveMessage}
            />
            <Button
                style={{ width: 240, marginTop: 16 }}
                type="primary"
                disabled={props.sendBtnDisabled}
                onClick={() => {
                    UTILS.sendOnClick({
                        sendMessage: props.sendMessage,
                        setSendMessage: props.setSendMessage,
                    });
                }}
            >
                Send Message
            </Button>
            <Button onClick={() => UTILS.consolingDataChannel()}>
                Print DataChannel Info
            </Button>
            <Button onClick={() => UTILS.consolingPeerConnection()}>
                Print RTCPeerConnection info
            </Button>
        </div>
    );
};

const TestWebRtc = (props) => {
    // renderHelper
    const [userId, setUserId] = useState("");
    const [channelName, setChannelName] = useState("");
    const [joinBtnDisabled, setJoinBtnDisabled] = useState(true);
    const [callBtnDisabled, setCallBtnDisabled] = useState(true);
    const [hangUpBtnDisabled, setHangUpBtnDisabled] = useState(true);

    //  renderTextArea
    const [sendMessage, setSendMessage] = useState("");
    const [receiveMessage, setReceiveMessage] = useState("");
    const [sendBtnDisabled, setSendBtnDisabled] = useState(true);

    const ws = useRef(null);
    // ws가 할당되기 전 onmessage 정의 시도로 인한 오류 해결을 위함 
    const assignedAtWs = useRef(false);

    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);

        wsClient.onopen = () => {
            console.log("WebSocket opened");
            ws.current = wsClient;
            // setup camera and join channel after ws opened
            if (props.isStreamer) UTILS.setUpDevice();
            if (ws.current != null) assignedAtWs.current = true;
        };

        wsClient.onclose = () => console.log("WebSocket closed");

        return () => {
            wsClient.close();
            ws.current = null;
            assignedAtWs.current = false;
        };
    }, []);

    useEffect(() => {
        if (userId && channelName) {
            setJoinBtnDisabled(false);
        } else {
            setJoinBtnDisabled(true);
        }
        if (!assignedAtWs.current) return;

        ws.current.onmessage = (msg) => {
            const parsedMessage = JSON.parse(msg.data);
            console.log(`WebSocket message received: ${parsedMessage.type}`);
            const body = parsedMessage.body;

            switch (parsedMessage.type) {
                case "joined":
                    console.log(`Users in this channel: ${body}`);
                    if (!props.isStreamer) UTILS.callOnClick({
                        localIcecandidateOffer: {
                            userId,
                            channelName,
                            socket: ws.current,
                        },
                        handleMessage: {
                            setReceiveMessage,
                            setSendMessage,
                            setSendBtnDisabled,
                        },
                        setCallBtnDisabled,
                        setHangUpBtnDisabled,
                    });
                    break;
                case "offer_sdp_received": // streamer side
                    // console.log(
                    //     `channelName is: ${channelName}, type is: ${typeof channelName}`
                    // );
                    // console.log(
                    //     `userId is: ${userId}, type is: ${typeof userId}`
                    // );
                    UTILS.onAnswer({
                        body,
                        setCallBtnDisabled,
                        setHangUpBtnDisabled,
                        localIceCandidateOffer: {
                            userId,
                            channelName,
                            socket: ws.current,
                        },
                        handleMessage: {
                            setReceiveMessage,
                            setSendMessage,
                            setSendBtnDisabled,
                        },
                    });
                    break;
                case "answer_sdp_received": // viewr side
                    UTILS.gotRemoteDescription({ answer: body });
                    for (let cd in UTILS.candidateQueue) UTILS.addCandidate(cd);
                    break;
                case "ice_candidate_received":
                    console.log("ice candidate received at remote peer");
                    UTILS.addCandidate(body);
                    break;
                case "quit":
                    break;
                default:
                    break;
            }
        };
    }, [userId, channelName, assignedAtWs]);

    return (
        <div className="App">
            <div className="App-header">
                <Title>WebRTC</Title>
                <Paragraph>
                    This is a simple demo app that demonstartes how to build a
                    WebRTC application from scratch.
                </Paragraph>
                <button onClick={() => console.log(props.isStreamer)}>consoling isStreamer?</button>
                <button onClick={UTILS.consolingReceiver}>consoling receiver</button>
                <div
                    className="wrapper-row"
                    style={{
                        justifyContent: "center",
                        width: "50%",
                        display: "flex",
                    }}
                >
                    {renderHelper({
                        userId,
                        setUserId,
                        channelName,
                        setChannelName,
                        joinBtnDisabled,
                        setJoinBtnDisabled,
                        callBtnDisabled,
                        setCallBtnDisabled,
                        hangUpBtnDisabled,
                        setHangUpBtnDisabled,
                        sendBtnDisabled,
                        setSendBtnDisabled,
                        setReceiveMessage,
                        setSendMessage,
                        ws: ws.current,
                    })}
                    {renderTextArea({
                        sendMessage,
                        setSendMessage,
                        receiveMessage,
                        setReceiveMessage,
                        sendBtnDisabled,
                        setSendBtnDisabled,
                    })}
                </div>

                <div
                    className="playerContainer"
                    id="playerContainer"
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <div>
                        <Title style={{ padding: "0px", margin: "0px" }}>
                            REMOTE
                        </Title>
                        <video
                            id="peerPlayer"
                            autoPlay
                            style={{ width: 640, height: 480 }}
                        />
                    </div>
                    <div>
                        <Title style={{ padding: "0px", margin: "0px" }}>
                            LOCAL
                        </Title>
                        <video
                            id="localPlayer"
                            autoPlay
                            style={{ width: 640, height: 480 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestWebRtc;
