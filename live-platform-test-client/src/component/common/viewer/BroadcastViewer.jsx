import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { settingViewerPC } from "../../../library/util/viewerUtil";
import ChattingBox from "../chatting/ChattingBox";
import "../../../asset/css/BroadcastViewer.css";

const URL_WEB_SOCKET = process.env.REACT_APP_SIGSERVER;

const BroadcastViewer = () => {
  const [muted, setMuted] = useState(true);
  const ws = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());
  const iceCandidateQueue = useRef([]);
  const { channelName } = useParams();
  const receivedState = useLocation().state;
  const userId = receivedState + "#" + crypto.randomUUID().slice(0, 4);

  const addCandidate = (cd) => {
    if (peerConnection.current.remoteDescription === null)
      iceCandidateQueue.current.push(cd);
    else peerConnection.current.addIceCandidate(cd);
  };

  useEffect(() => {
    const signalingSocket = new WebSocket(URL_WEB_SOCKET);
    signalingSocket.onopen = () => {
      ws.current = signalingSocket;
      signalingSocket.send(
        JSON.stringify({ type: "join", body: { channelName, userId } })
      );
    };

    signalingSocket.onmessage = async (message) => {
      const msg = JSON.parse(message.data);
      const body = msg.body;
      switch (msg.type) {
        case "joined": {
          settingViewerPC(
            peerConnection.current,
            channelName,
            userId,
            ws.current
          );
          break;
        }
        case "answer_sdp_received": {
          await peerConnection.current.setRemoteDescription(body);
          iceCandidateQueue.current.forEach((e) =>
            peerConnection.current.addIceCandidate(e)
          );
          iceCandidateQueue.current = [];
          break;
        }
        case "ice_candidate_received": {
          addCandidate(body);
          break;
        }
        case "quit": {
          alert("스트리머가 방송을 종료했습니다.");
          signalingSocket.close();
          ws.current = null;
          window.location.replace("/");
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
    <div className="viewer-layout">
      <div className="viewer-content">
        <h2>{channelName} 방송</h2>
        <p>{receivedState}님, 환영합니다 👋</p>
        <video id="peerPlayer" autoPlay muted={muted}></video>
        {muted && (
          <button onClick={() => setMuted(false)}>🔊 소리 켜기</button>
        )}
      </div>

      <ChattingBox channelName={channelName} />
    </div>
  );
};

export default BroadcastViewer;
