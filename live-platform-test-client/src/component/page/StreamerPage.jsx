import ChattingBox from "../common/ChattingBox";
import StreamerDashBoard from "../common/streamer/StreamerDashBoard";

const StreamerPage = () => {
    return (
        <div className="streamer-page">
            <h1>Streamer Page</h1>
            <StreamerDashBoard />
            <ChattingBox />
        </div>
    );
};

export default StreamerPage;
