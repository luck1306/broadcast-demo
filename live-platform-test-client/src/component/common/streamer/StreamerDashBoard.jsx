import { useState, useRef, useEffect } from "react";

const StreamerDashBoard = () => {
  const [userId, setUserId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [userInfoConfirmed, setUserInfoConfirmed] = useState(false);
  const [confirmBtnDisabled, setConfirmBtnDisabled] = useState(true);
  const [startBtnDisabled, setStartBtnDisabled] = useState(true);
  const mediaStream = useRef(null);

  useEffect(() => {
    if (userId === "" || channelName === "") return;
    setConfirmBtnDisabled(false);
  }, [userId, channelName]);

  const userInfoConfirm = () => {
    const confirmed = window.confirm("Confirm your user information?");
    if (confirmed) {
      const inputs = document.getElementsByClassName("streamer-input");
      for (const i of inputs) i.disabled = true;
      getStream();
      setStartBtnDisabled(false);
      setUserInfoConfirmed(true);
    } else {
      window.alert("not confirmed");
      setUserId("");
      setChannelName("");
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

  const userInfoInit = () => {
    setUserInfoConfirmed(false);
    setStartBtnDisabled(true);
    const video = document.getElementById("streamed-video");
    video.srcObject = null;
    video.load();
    mediaStream.current = null;
    const inputs = document.getElementsByClassName("streamer-input");
    for (const i of inputs) i.disabled = false;
  };

  return (
    <div className="container">
      <div className="header" style={{ textAlign: "center" }}>
        <h1>Streamer's DashBoard</h1>
      </div>
      <div className="body">
        <div id="input-area">
          <input
            className="streamer-input"
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <br />
          <input
            className="streamer-input"
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <button
          disabled={confirmBtnDisabled}
          onClick={() => {
            if (userInfoConfirmed) userInfoInit();
            else userInfoConfirm();
          }}
        >
          {userInfoConfirmed ? "Cancel" : "Confirm"}
        </button>
        <button disabled={startBtnDisabled}>Streaming Start !!!</button>
        <br />
        <video
          id="streamed-video"
          style={{ width: 640, height: 480, border: "black solid 1px" }}
        ></video>
        {/* <button onClick={() => console.log(mediaStream)}>MediaStream</button> */}
      </div>
    </div>
  );
};

export default StreamerDashBoard;
