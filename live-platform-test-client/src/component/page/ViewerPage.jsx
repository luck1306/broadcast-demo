import ChattingBox from "../common/ChattingBox";
import BroadcastViewer from "../common/viewer/BroadcastViewer";

const ViewerPage = () => {
    return (
        <div className="viewer-page">
            <h1>Viewer Page</h1>
            <BroadcastViewer />
            <ChattingBox />
        </div>
    );
};

export default ViewerPage;
