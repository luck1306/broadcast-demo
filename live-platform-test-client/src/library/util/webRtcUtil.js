/**
 * WebRTC를 사용한 P2P 통신을 위한 유틸리티 함수 모음
 * chrome://webrtc-internals/
 * @author 김운일(해당 파일 작성자, **아래의 원본 참조는 본 인물과 무관함**)
 * Original Article: Getting Started with WebRTC: A Practical Guid with Example Code
 * @see https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
 */

// @ts-check
/**
 * WebRTC 관련 타입 정의
 * @typedef {import("./webRtcUtil").OnAnswerProps} OnAnswerProps
 * @typedef {import("./webRtcUtil").JoinProps} JoinProps
 * @typedef {import("./webRtcUtil").HangUpOnClickProps} HangUpOnClickProps
 * @typedef {import("./webRtcUtil").SendOnClickProps} SendOnClickProps
 * @typedef {import("./webRtcUtil").CloseDataChannelProps} CloseDataChannelProps
 * @typedef {import("./webRtcUtil").GotRemoteDescriptionProps} GotRemoteDescriptionProps
 * @typedef {import("./webRtcUtil").HandleMessageProps} HandleMessageProps
 * @typedef {import("./webRtcUtil").LocalIceCandidateOfferProps} LocalIceCandidateOfferProps
 * @typedef {import("./webRtcUtil").CallOnClickProps} CallOnClickProps
 */

// -------- WebRTC 관련 변수 선언 및 초기화 -------
/**
 * @type {MediaStream}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream type info
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia associated info
 */
let localStream;
// /**
//  * @type {RTCConfiguration[]}
//  * @deprecated if you're not using STUN/TURN servers, you can set this to null or an empty object.
//  */
// let servers;
/**
 * @type {RTCPeerConnection | null}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
 */
let localPeerConnection = null;
/**
 * @type {RTCDataChannel}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
 * type is RTCDataChannel.
 */
let sendChannel;
/**
 * @type {RTCDataChannel}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
 * type is RTCDataChannel.
 */
let receiveChannel;
// /**
//  * @deprecated 2015년 이후로 w3c 표준에서 제거됨 별도의 인자값 없이 생성가능
//  * pcConstraints(PeerConnection Constraints)
//  */
// const pcConstraints = {
//     optional: [{ DtlsSrtpKeyAgreement: true }],
// };

const contraints = {
    video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        frameRate: { min: 15, ideal: 30, max: 60 },
    },
    // audio: true,
};

const candidateQueue = [];

// -------- WebRTC 관련 함수 선언 및 초기화 -------

/**
 * getUserMedia()를 사용하여 카메라와 마이크에 접근하기 위한 설정
 * if you want to capture your screen, you can use getDisplayMedia() instead of getUserMedia()
 */
const setUpDevice = async () => {
    console.log("setUpDevice invoked");
    // conosle.log(navigator);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("no existing media devices");
        return;
    }
    await navigator.mediaDevices
        .getUserMedia(contraints)
        .then((stream) => {
            const localPlayer = document.getElementById("localPlayer");
            if (localPlayer instanceof HTMLVideoElement)
                localPlayer.srcObject = stream;
            localStream = stream;
        })
        .catch((err) => {
            console.error(`Error accessing media devices. ${err}`);
        });
    localPeerConnection = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
        console.log("track add in RTCPeerConnection");
        localPeerConnection?.addTrack(track, localStream);
    });
};

/**
 * ~~When user clicks call button, we will create the p2p connection with RTCPeerConnection~~
 * only viewr use this func
 * @param {CallOnClickProps} props
 */
const callOnClick = (props) => {
    console.log("callOnClick invoked");
    props.setCallBtnDisabled(true);
    props.setHangUpBtnDisabled(false);

    // if (localStream.getVideoTracks().length > 0) {
    //     console.log(
    //         `[Local] Using video device: ${
    //             localStream.getVideoTracks()[0].label
    //         }`
    //     );
    // }
    // if (localStream.getAudioTracks().length > 0) {
    //     console.log(
    //         `[Local] Using audio device: ${
    //             localStream.getAudioTracks()[0].label
    //         }`
    //     );
    // }

    /**
     * 54번째 줄에 대한 이전(원본)코드 ⬇️
     * "localPeerConnection = new RTCPeerConnection(servers, pcConstraints);"
     * @deprecated 2015년 이후로 w3c 표준에서 제거됨 별도의 인자값 없이 생성가능
     * @see https://www.w3.org/TR/2016/WD-webrtc-20160531/#rtcsessiondescription-class
     */
    localPeerConnection = new RTCPeerConnection();
    localPeerConnection.onicecandidate = (e) =>
        gotLocalIceCandidateOffer(e, props.localIcecandidateOffer);

    localPeerConnection.addTransceiver("video", { direction: "recvonly" });
    localPeerConnection.addTransceiver("audio", { direction: "recvonly" });
    // get remote stream to peerPlayer
    localPeerConnection.ontrack = (e) => {
        console.log("invoked ontrack event");
        gotRemoteStream(e);
    };

    createDataChannel(props.handleMessage);

    // send local media stream to remote peer -> @deprecated this section
    // localStream.getTracks().forEach((track) => {
    //     // localPeerConnection.addTrack(localStream.getTracks());
    //     localPeerConnection?.addTrack(track, localStream);
    // });

    // localPeerConnection.onicegatheringstatechange = () => {
    //     console.log("--------onicegatheringstatechange invoked----------");
    //     console.log(localPeerConnection?.iceGatheringState);
    //     console.log("---------------------------------------------------");
    // };
    localPeerConnection.createOffer().then(gotLocalDescription);
};

/**
 * async function to handle offer SDP(Session Description Protocol)
 * @param {RTCSessionDescriptionInit} offer
 */
const gotLocalDescription = (offer) => {
    console.log(
        `gotLocalDescription invoked: ${offer.type} ${offer.sdp?.substring(
            0,
            50
        )}...`
    );
    const sdp = new RTCSessionDescription(offer);
    localPeerConnection?.setLocalDescription(sdp);
};

/**
 * ~~async funciton to handle received remote stream~~
 * 원격 비디오/오디오 스트림 수신
 * @param {RTCTrackEvent} event
 */
const gotRemoteStream = (event) => {
    console.log("gotRemoteStream invoked");
    console.log(event.streams);
    const remotePlayer = document.getElementById("peerPlayer");
    // console.log(typeof remotePlayer);
    if (remotePlayer instanceof HTMLVideoElement)
        remotePlayer.srcObject = event.streams[0];
    else console.log("remotePlayer is not an HTMLVideoElement");
};

/**
 * async function to handle ICE(Interactive Connectivity Establishment) candidates
 * @param {RTCPeerConnectionIceEvent} e
 * @param {LocalIceCandidateOfferProps} props
 */
const gotLocalIceCandidateOffer = (e, props) => {
    const offer = localPeerConnection?.localDescription;
    console.log(`gotLocalIceCandidateOffer invoked: ${e.candidate} ${offer}`);

    if (props.channelName === "") {
        console.log("channelName is empty");
        alert("채널 이름을 입력해주세요.");
        return;
    }

    if (props.userId === "") {
        console.log("userId is empty");
        alert("사용자 ID를 입력해주세요.");
        return;
    }

    // send ice candidates
    sendWsMessage(props.socket, "send_ice_candidate", {
        channelName: props.channelName,
        userId: props.userId,
        candidate: e.candidate,
    });

    // when gathering candidate finished, send complete SDP(Session Description Protocol)
    if (!e.candidate) {
        // send offer SDP(Session Description Protocol) to signaling server via websocket
        sendWsMessage(props.socket, "send_offer", {
            channelName: props.channelName,
            userId: props.userId,
            sdp: offer,
        });
    }
};

/**
 * only streamer use this func
 * @param {OnAnswerProps} props
 */
const onAnswer = (props) => {
    console.log("onAnswer invoked");
    props.setCallBtnDisabled(true);
    props.setHangUpBtnDisabled(false);

    if (localStream.getVideoTracks().length > 0)
        console.log(
            `[Local] Using video device: ${
                localStream.getVideoTracks()[0].label
            }`
        );
    if (localStream.getAudioTracks().length > 0)
        console.log(
            `[Local] Using audio device: ${
                localStream.getAudioTracks()[0].label
            }`
        );
    if (!localPeerConnection) return;
    /**
     * 107번째 줄에 대한 이전(원본)코드 ⬇️
     * "localPeerConnection = new RTCPeerConnection(servers, pcConstraints);"
     * @deprecated 2015년 이후로 w3c 표준에서 제거됨 별도의 인자값 없이 생성가능
     * @see https://www.w3.org/TR/2016/WD-webrtc-20160531/#rtcsessiondescription-class
     */
    // localPeerConnection = new RTCPeerConnection();
    localPeerConnection.onicecandidate = (e) =>
        gotLocalIceCandidateAnswer(e, props.localIceCandidateOffer, props.body.sender);
    // localPeerConnection.ontrack = gotRemoteStream;
    createDataChannel(props.handleMessage);

    // localStream.getTracks().forEach((track) => {
    //     console.log("track");
    //     localPeerConnection?.addTrack(track);
    // });
    // localPeerConnection.addTrack(localStream);
    gotRemoteDescription({ answer: props.body.sdp });
    localPeerConnection.createAnswer().then(gotLocalDescription);
    // localPeerConnection.setRemoteDescription(props.body.sdp).then(() => {
    //     localPeerConnection?.createAnswer().then(gotAnswerDescription);
    // });
};

// /**
//  * @param {RTCSessionDescriptionInit} answer
//  */
// const gotAnswerDescription = (answer) => {
//     console.log(`gotAnswerDescription invoked: ${answer}`);
//     const sdp = new RTCSessionDescription(answer);
//     localPeerConnection?.setLocalDescription(sdp);
// };

/**
 * @param {RTCPeerConnectionIceEvent} event
 * @param {LocalIceCandidateOfferProps} props
 * @param {string} sender
 */
const gotLocalIceCandidateAnswer = (event, props, sender) => {
    const answer = localPeerConnection?.localDescription;
    console.log(
        `gotLocalIceCandidateAnswer invoked: ${event.candidate} ${answer}`
    );
    if (!props.channelName) {
        console.log("channelName is empty");
        alert("채널 이름을 입력해주세요.");
        return;
    }
    if (!props.userId) {
        console.log("userId is empty");
        alert("사용자 ID를 입력해주세요.");
        return;
    }
    sendWsMessage(props.socket, "send_ice_candidate", {
        channelName: props.channelName,
        userId: props.userId,
        candidate: event.candidate,
        sender,
    });

    // gathering canndidate finished, send complete SDP(Session Description Protocol)
    if (!event.candidate) {
        sendWsMessage(props.socket, "send_answer", {
            channelName: props.channelName,
            userId: props.userId,
            sdp: answer,
            sender,
        });
    }
};

/**
 * @param {WebSocket} socket
 * @param {string} type
 * @param {*} body
 */
const sendWsMessage = (socket, type, body) => {
    console.log(`sendWsMessage invoked: ${type} ${body}`);
    socket.send(JSON.stringify({ type, body }));
};

/**
 * @param {JoinProps} props
 */
const join = (props) => {
    console.log("join invoked");

    if (!props.channelName) {
        console.log("channelName is empty");
        return;
    } else if (!props.userId) {
        console.log("userId is empty");
        return;
    }

    props.setJoinBtnDisabled(true);
    props.setCallBtnDisabled(false);

    sendWsMessage(props.socket, "join", {
        channelName: props.channelName,
        userId: props.userId,
    });
};

/**
 * @param {HangUpOnClickProps} props
 */
const hangUpOnClick = (props) => {
    console.log("hanupOnClick invoked");
    closeDataChannel({ setSendBtnDisabled: props.setSendBtnDisabled });
    localPeerConnection?.close();
    localPeerConnection = null;
    props.setHangUpBtnDisabled(true);
    props.setCallBtnDisabled(true);
};

/**
 * @param {SendOnClickProps} props
 */
const sendOnClick = (props) => {
    console.log("sendOnclick invoked");
    sendChannel.send(props.sendMessage);
    props.setSendMessage("");
};

/**
 * @param {HandleMessageProps} props
 */
const createDataChannel = (props) => {
    try {
        console.log("createDataChannel invoked");
        if (localPeerConnection)
            sendChannel =
                localPeerConnection.createDataChannel("sendDataChannel");
        else {
            throw new Error("localPeerConnection is not initialized");
        }
    } catch (err) {
        console.error(`createDataChannel error: ${err}`);
    }
    console.log("setup handleSendChannelStateChange");
    // console.log(localPeerConnection);
    sendChannel.onopen = () =>
        handleSendChannelStateChange({
            setSendBtnDisabled: props.setSendBtnDisabled,
        });
    sendChannel.onclose = () =>
        handleSendChannelStateChange({
            setSendBtnDisabled: props.setSendBtnDisabled,
        });

    console.log("setup localPeerConnection.ondatachannel");
    if (localPeerConnection)
        localPeerConnection.ondatachannel = (e) => gotReceiveChannel(e, props);
};

/**
 * @param {CloseDataChannelProps} props
 */
const closeDataChannel = (props) => {
    console.log("closeDataChannel invoked");
    sendChannel.close();
    receiveChannel.close();
    props.setSendBtnDisabled(true);
};

/**
 * @param {GotRemoteDescriptionProps} props
 */
const gotRemoteDescription = (props) => {
    console.log("gotRemoteDescription invoked");
    const sdp = new RTCSessionDescription(props.answer);
    localPeerConnection?.setRemoteDescription(sdp);
};

/**
 * @param {HandleMessageProps} props
 * @param {RTCDataChannelEvent} e
 */
const gotReceiveChannel = (e, props) => {
    console.log("gotReceiveChannel invoked");
    receiveChannel = e.channel;
    receiveChannel.onmessage = (e) => handleMessage(e, props);
    receiveChannel.onopen = handleReceiveChannelStateChange;
    receiveChannel.onclose = handleReceiveChannelStateChange;
};

/**
 * @param {MessageEvent} e
 * @param {HandleMessageProps} props
 */
const handleMessage = (e, props) => {
    console.log("handleMessage invoked");
    props.setReceiveMessage(e.data);
    props.setSendMessage("");
};

/**
 * sendChannel의 상태 변화에 따라 Send 버튼 활성화/비활성화 처리
 * @param {CloseDataChannelProps} props
 */
const handleSendChannelStateChange = (props) => {
    const readyState = sendChannel.readyState;
    console.log("handleSendChannelStateChange invoked");
    if (readyState === "open") {
        props.setSendBtnDisabled(false);
    } else {
        props.setSendBtnDisabled(true);
    }
};

/**
 * printf(receiveChannel.readyState);
 */
const handleReceiveChannelStateChange = () => {
    const readyState = receiveChannel.readyState;
    console.log(`handleReceiveChannelStateChange invoked ${readyState}`);
};

/**
 * 
 * @param {*} candidate 
 */
const addCandidate = (candidate) => {
    // const cd = new RTCIceCandidate({candidate});
    if (localPeerConnection?.remoteDescription === null) candidateQueue.push(candidate);
    else localPeerConnection?.addIceCandidate(candidate);
}

const consolingDataChannel = () => {
    console.log("consolingDataChannel invoked");
    console.log(`----sendChannel----`);
    console.log(sendChannel);
    console.log(`-------------------`);
    console.log(`----receiveChannel----`);
    console.log(receiveChannel);
    console.log(`----------------------`);
};

const consolingPeerConnection = () => {
    console.log("consolingPeerConnection invoked");
    console.log(`----localPeerConnection----`);
    console.log(localPeerConnection);
    console.log(`----------------------------`);
};

const consolingReceiver = () => {
    console.log("consolingReceiver invoked");
    localPeerConnection?.getReceivers().forEach(e => console.log(e));
}

export default {
    setUpDevice,
    callOnClick,
    onAnswer,
    gotRemoteStream,
    gotLocalDescription,
    gotLocalIceCandidateOffer,
    // gotAnswerDescription,
    gotLocalIceCandidateAnswer,
    sendWsMessage,
    join,
    hangUpOnClick,
    sendOnClick,
    createDataChannel,
    closeDataChannel,
    gotRemoteDescription,
    consolingDataChannel,
    consolingPeerConnection,
    addCandidate,
    candidateQueue,
    consolingReceiver,
};
