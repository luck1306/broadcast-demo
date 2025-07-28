import { useEffect, useRef, useState } from "react";
import { videoUtil } from "../../../library/util/videoUtil";

const CusVideoBox = () => {
  const videoRef = useRef(null);
  const chunk = useRef([]);

  const [cameraStream, setCameraStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecord, setIsRecord] = useState(false);
  const [isRecordPause, setIsRecordPause] = useState(false);

  function chunkPush(datas) {
    chunk.current.push(datas);
  }

  useEffect(() => {
    if (mediaRecorder !== null) {
      mediaRecorder.ondataavailable = (e) => {
        chunkPush(e.data);
      };

      mediaRecorder.onstop = () => {
        const url = URL.createObjectURL(
          new Blob(chunk.current, { type: "video/webm" })
        );

        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded_video.webm";
        a.click();

        chunk.current = [];
        setMediaRecorder(null);
      };
    }
  }, [mediaRecorder]);

  return (
    <>
      <input type="text" placeholder="RTMP Server Link" id="server_link" />
      <video
        id="camera"
        poster="test_thumbnail2.png"
        width="854px"
        height="480px"
        style={{ backgroundColor: "antiquewhite" }}
        ref={videoRef}
      ></video>
      <button
        onClick={() => videoUtil.accessCamera({ videoRef, setCameraStream })}
      >
        Access
      </button>
      <br />
      <button
        onClick={() => {
          videoUtil.startRecord({
            cameraStream,
            setMediaRecorder,
          }) && setIsRecord(true);
        }}
      >
        START RECORD
      </button>
      {isRecord && (
        <div>
          <button
            onClick={() => {
              mediaRecorder.state === "recording"
                ? mediaRecorder.pause()
                : mediaRecorder.resume();
              if (isRecordPause === false) {
                document.getElementById("camera").load();
                setIsRecordPause(true);
              } else {
                document.getElementById("camera").play();
                setIsRecordPause(false);
              }
            }}
          >
            {isRecordPause === false ? "PAUSE" : "RESUME"}
          </button>
          <br />
          <button
            onClick={() => {
              mediaRecorder.stop();
              setIsRecord(false);
            }}
          >
            END
          </button>
        </div>
      )}
    </>
  );
};

export default CusVideoBox;
