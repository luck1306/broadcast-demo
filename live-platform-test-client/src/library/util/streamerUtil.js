const PCInit = async (props) => {
    // console.log("PCInit invoked");
    await props.pc.setRemoteDescription(props.sdp);
    props.mediaStream.getTracks().forEach((track) => {
        // console.log(track);
        props.pc.addTrack(track, props.mediaStream);
    });
    props.pc
        .createAnswer()
        .then((result) => props.pc.setLocalDescription(result));

    props.pc.onicecandidate = (e) => {
        const answer = props.pc?.localDescription;
        // console.log(
        //     `gotLocalIceCandidateAnswer invoked: ${e.candidate} ${answer}`
        // );

        props.ws.send(
            JSON.stringify({
                type: "send_ice_candidate",
                body: {
                    channelName: props.channelName,
                    userId: props.userId,
                    candidate: e.candidate,
                    sender: props.sender,
                },
            })
        );

        if (!e.candidate) {
            props.ws.send(
                JSON.stringify({
                    type: "send_answer",
                    body: {
                        channelName: props.channelName,
                        userId: props.userId,
                        sdp: answer,
                        sender: props.sender,
                    },
                })
            );
            props.setAllCandidates(props.pc);
        }
    };
};

const getStream = async (mediaStream) => {
    // console.log("getStraem invoked");
    mediaStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    const video = document.getElementById("streamed-video");
    video.srcObject = mediaStream.current;
};

const userInfoInit = (props) => {
    // console.log("userInfoInit invoked");
    const video = document.getElementById("streamed-video");
    // video.srcObject = null;
    video?.load();
    props.mediaStream = null;
    const inputs = document.getElementsByClassName("streamer-input");
    for (const i of inputs) i.disabled = false;
};

const joinInWs = (props) => {
    // console.log("joinInWs invoked");
    props.ws.send(
        JSON.stringify({
            type: "join",
            body: {
                channelName: props.channelName,
                userId: props.userId,
            },
        })
    );
};

export { PCInit, getStream, userInfoInit, joinInWs };
