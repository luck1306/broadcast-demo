/**
 * default RTCPeerConnecton setting
 * @param {RTCPeerConnection} pc
 * @param {string} channelName
 * @param {string} userId
 * @param {WebSocket} socket
 */
const settingViewerPC = (pc, channelName, userId, socket) => {
  console.log("settingViewerPC invoked");
  console.log(pc);
  pc.onicecandidate = (e) =>
    iceCandidateOffer(e, { pc, userId, socket, channelName });
  pc.addTransceiver("video", { direction: "recvonly" });
  // pc.addTransceiver("audio", { direction: "recvonly" });
  pc.ontrack = gotRemoteStream;
  pc.createOffer().then((e) => gotLocalDescription(e, pc));
};

const iceCandidateOffer = (e, props) => {
  const offer = props.pc.localDescription;
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

  props.socket.send(
    JSON.stringify({
      type: "send_ice_candidate",
      body: {
        channelName: props.channelName,
        userId: props.userId,
        candidate: e.candidate,
      },
    })
  );

  if (!e.candidate) {
    props.socket.send(
      JSON.stringify({
        type: "send_offer",
        body: {
          channelName: props.channelName,
          userId: props.userId,
          sdp: offer,
        },
      })
    );
  }
};

/**
 * async function to handle offer SDP(Session Description Protocol)
 * @param {RTCSessionDescriptionInit} offer
 * @param {RTCPeerConnection} pc
 */
const gotLocalDescription = (offer, pc) => {
  console.log(
    `gotLocalDescription invoked: ${offer.type} ${offer.sdp?.substring(
      0,
      50
    )}...`
  );

  pc?.setLocalDescription(offer);
};

const gotRemoteStream = (e) => {
  console.log("gotRemoteStream invoked");
  console.log(e);
  const remotePlayer = document.getElementById("peerPlayer");
  if (remotePlayer instanceof HTMLVideoElement) {
    remotePlayer.srcObject = e.streams[0];
  } else console.log("remotePlayer is not an HTMLVideoElement");
  remotePlayer.play();
};

export default {
  settingViewerPC,
};
