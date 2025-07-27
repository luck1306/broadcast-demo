function accessCamera(props) {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            props.videoRef.current.srcObject = stream;
            props.setCameraStream(stream);
            return true;
        })
        .then((available) => {
            if (available) {
                props.videoRef.current.play();
            }
        });
}

/**
 * * @param {Object} props {cameraStream, setMediaRecorder}
 */
function startRecord(props) {
    if (props.cameraStream === null) {
        alert("Please access the camera first");
        return false;
    } else {
        const recorder = new MediaRecorder(props.cameraStream, {
            mimeType: "video/webm; codecs=vp8",
        });
        recorder.start();
        props.setMediaRecorder(recorder);
        return true;
    }
}

export const videoUtil = {
    accessCamera,
    startRecord,
};
