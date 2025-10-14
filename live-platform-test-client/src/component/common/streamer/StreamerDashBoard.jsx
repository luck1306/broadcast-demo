import { useRef, useState, useEffect } from "react";
import {
  PCInit,
  getStream,
  userInfoInit,
  joinInWs,
} from "../../../library/util/streamerUtil";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import StreamStatSwitchApi from "../../../library/api/StreamStatSwitchApi";
import ChattingBox from "../chatting/ChattingBox";
import "../../../asset/css/StreamerDashBoard.css";

const URL_WEB_SOCKET = process.env.REACT_APP_SIGSERVER;

const StreamerDashBoard = () => {
  const userId =
    Cookies.get("nickname") + "#" + crypto.randomUUID().slice(0, 4);
  const { channelName } = useParams();
  const [assignedAtWs, setAssignedAtWs] = useState(false);

  const mediaStream = useRef(null);
  const ws = useRef(null);
  const pcs = useRef(new Map());
  const iceCandidateQueue = useRef([]);

  const addCandidate = (cd, pc) => {
    if (!pc || pc?.remoteDescription === null)
      iceCandidateQueue.current.push(cd);
    else pc.addIceCandidate(cd);
  };

  const setAllCandidates = (pc) => {
    iceCandidateQueue.current.forEach((cd) => addCandidate(cd, pc));
    iceCandidateQueue.current = [];
  };

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      ws.current = wsClient;
      setAssignedAtWs(true);
    };

    return () => {
      wsClient.close(1000, "S");
      ws.current = null;
      setAssignedAtWs(false);
      userInfoInit({ mediaStream: mediaStream.current });
      for (const e of pcs.current.values()) e.close();
      pcs.current = new Map();
      StreamStatSwitchApi({ stat: 0 });
    };
  }, []);

  useEffect(() => {
    if (!assignedAtWs || !userId || !channelName) return;
    ws.current.onmessage = async (msg) => {
      const parsedMessage = JSON.parse(msg.data);
      const body = parsedMessage.body;
      switch (parsedMessage.type) {
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
          addCandidate(body.candidate, pcs.current.get(body.sender));
          break;
        }
        default:
          break;
      }
    };
  }, [assignedAtWs]);

  return (
    <div className="dashboard-container">
      <div className="stream-section">
        <h1>🎥 Streamer's Dashboard</h1>
        <video id="streamed-video" autoPlay muted></video>
        <button
          onClick={() => {
            joinInWs({ ws: ws.current, channelName, userId });
            getStream(mediaStream);
            StreamStatSwitchApi({ stat: 1 });
          }}
        >
          방송 시작
        </button>
      </div>

      <ChattingBox channelName={channelName} />
    </div>
  );
};

export default StreamerDashBoard;
