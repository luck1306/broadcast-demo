import { useState, useRef, useEffect } from "react";
import streamerUtil from "../../../library/util/streamerUtil";

const URL_WEB_SOCKET = process.env.REACT_APP_SIGSERVER;

const StreamerDashBoard = () => {
  const [userId, setUserId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [userInfoConfirmed, setUserInfoConfirmed] = useState(false);
  const [assignedAtWs, setAssignedAtWs] = useState(false);
  const [confirmBtnDisabled, setConfirmBtnDisabled] = useState(true);
  const [startBtnDisabled, setStartBtnDisabled] = useState(true);

  const mediaStream = useRef(null);
  const ws = useRef(null);
  const pcs = useRef(new Map());

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);

    wsClient.onopen = () => {
      console.log("WebSocket opened");
      ws.current = wsClient;
      if (ws.current != null) setAssignedAtWs(true);
    };

    wsClient.onclose = () => console.log("WebSocket closed");

    return () => {
      wsClient.close();
      ws.current = null;
      setAssignedAtWs(false);
    };
  }, []);

  useEffect(() => {
    if (userId === "" || channelName === "") return;
    if (!assignedAtWs) return;
    setConfirmBtnDisabled(false);
    ws.current.onmessage = (msg) => {
      const parsedMessage = JSON.parse(msg.data);
      console.log(`WebSocket message received: ${parsedMessage.type}`);
      const body = parsedMessage.body;
      switch (parsedMessage.type) {
        case "joined": {
          // console.log(`User enter channel ${channelName}`);
          break;
        }
        case "offer_sdp_received": {
          const pc = new RTCPeerConnection();
          streamerUtil.PCInit({
            pc,
            ws: ws.current,
            channelName,
            userId,
            sender: body.sender,
            sdp: body.sdp,
            mediaStream: mediaStream.current,
          });
          pcs.current.set(body.sender, pc);
          break;
        }
        case "ice_candidate_received": {
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
            if (userInfoConfirmed)
              streamerUtil.userInfoInit({
                setUserInfoConfirmed,
                setStartBtnDisabled,
                mediaStream: mediaStream.current,
              });
            else
              streamerUtil.userInfoConfirm({
                setStartBtnDisabled,
                setUserInfoConfirmed,
                setUserId,
                setChannelName,
                mediaStream,
              });
          }}
        >
          {userInfoConfirmed ? "Cancel" : "Confirm"}
        </button>
        <button
          disabled={startBtnDisabled}
          onClick={() =>
            streamerUtil.joinInWs({ ws: ws.current, channelName, userId })
          }
        >
          Streaming Start !!!
        </button>
        <br />
        <video
          id="streamed-video"
          style={{ width: 640, height: 480, border: "black solid 1px" }}
        ></video>
        {/* <button onClick={() => console.log(mediaStream)}>MediaStream</button> */}
        <button onClick={() => console.log(`${channelName} ${userId}`)}>
          asdf
        </button>
      </div>
    </div>
  );
};

export default StreamerDashBoard;
