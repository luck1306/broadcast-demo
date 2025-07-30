const PCInit = (props) => {
  console.log("PCInit invoked");
  props.pc.onicecandidate = (e) => {
    console.log("setting about [icecandidate] event in RTCPeerConnection");
    const answer = props.pc?.localDescription;

    props.pc.setRemoteDescription(props.sdp);
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
  props.pc
    .createAnswer()
    .then((result) => props.pc.setLocalDescription(result));
};

const userInfoConfirm = (props) => {
  const confirmed = window.confirm("Confirm your user information?");
  if (confirmed) {
    const inputs = document.getElementsByClassName("streamer-input");
    for (const i of inputs) i.disabled = true;
    getStream();
    props.setStartBtnDisabled(false);
    props.setUserInfoConfirmed(true);
  } else {
    window.alert("not confirmed");
    props.setUserId("");
    props.setChannelName("");
  }
};

const getStream = async () => {
  mediaStream.current = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });
  const video = document.getElementById("streamed-video");
  video.srcObject = mediaStream.current;
  video.play();
};

const userInfoInit = (props) => {
  props.setUserInfoConfirmed(false);
  props.setStartBtnDisabled(true);
  const video = document.getElementById("streamed-video");
  video.srcObject = null;
  video.load();
  props.mediaStream = null;
  const inputs = document.getElementsByClassName("streamer-input");
  for (const i of inputs) i.disabled = false;
};

export default {
  PCInit,
  userInfoConfirm,
  getStream,
  userInfoInit,
};
