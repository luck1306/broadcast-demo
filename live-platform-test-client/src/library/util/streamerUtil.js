const PCInit = async (props) => {
  console.log("PCInit invoked");
  props.pc.onicecandidate = (e) => {
    console.log("setting about [icecandidate] event in RTCPeerConnection");
    const answer = props.pc?.localDescription;

    props.ws.send(
      JSON.stringify({
        type: "send_ice_candidate",
        body: {
          channelName: props.channelName,
          userId: props.userId,
          candidate: e.candiate,
          sdp: answer,
          sender: props.sender,
        },
      })
    );
  };
  props.mediaStream.getTracks().forEach((track) => {
    props.pc.addTrack(track);
  });
  await props.pc.setRemoteDescription(props.sdp);
  props.pc
    .createAnswer()
    .then((result) => props.pc.setLocalDescription(result));
};

const userInfoConfirm = (props) => {
  console.log("userInfoConfirm invoked");
  const confirmed = window.confirm("Confirm your user information?");
  if (confirmed) {
    const inputs = document.getElementsByClassName("streamer-input");
    for (const i of inputs) i.disabled = true;
    getStream(props.mediaStream);
    props.setStartBtnDisabled(false);
    props.setUserInfoConfirmed(true);
  } else {
    window.alert("not confirmed");
    props.setUserId("");
    props.setChannelName("");
  }
};

const getStream = async (mediaStream) => {
  console.log("getStraem invoked");
  mediaStream.current = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });
  const video = document.getElementById("streamed-video");
  video.srcObject = mediaStream.current;
  video.play();
};

const userInfoInit = (props) => {
  console.log("userInfoInit invoked");
  props.setUserInfoConfirmed(false);
  props.setStartBtnDisabled(true);
  const video = document.getElementById("streamed-video");
  video.srcObject = null;
  video.load();
  props.mediaStream = null;
  const inputs = document.getElementsByClassName("streamer-input");
  for (const i of inputs) i.disabled = false;
};

const joinInWs = (props) => {
  console.log("joinInWs invoked");
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

export default {
  PCInit,
  userInfoConfirm,
  getStream,
  userInfoInit,
  joinInWs,
};
