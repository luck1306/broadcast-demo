import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Video from "./component/common/CusVideoBox.jsx";
// import Socket from "./component/common/CusSocketClient.jsx";
// import TestWebRtc from "./component/common/testing/TestWebRtc.jsx";
import RootPage from "./component/page/RootPage.jsx";
import ViewerPage from "./component/page/BroadCastListPage.jsx";
import BroadcastViewer from "./component/common/viewer/BroadCastViewer.jsx";
import StreamerDashBoard from "./component/common/streamer/StreamerDashBoard.jsx";
import NotFoundPage from "./component/page/NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Video /> */}
        {/* <Socket /> */}
        <Route path="/" element={<RootPage setState={setIsStreamer} />} />
        <Route path="/broadcast" element={<StreamerDashBoard />} />
        <Route path="/broadcast-list" element={<ViewerPage />} />
        <Route path="/broadcast/:channelName" element={<BroadcastViewer />} />
        <Route path="/dashboard" element={<StreamerDashBoard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
