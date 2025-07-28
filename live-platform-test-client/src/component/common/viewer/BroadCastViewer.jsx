import { useParams } from "react-router-dom";

const BroadcastViewer = () => {
  const { channelName } = useParams();
  return (
    <>
      <h1>여긴 {channelName}의 방송입니다.</h1>
      <video id="remotePlayer" style={{ width: 640, height: 480 }}></video>
    </>
  );
};

export default BroadcastViewer;
