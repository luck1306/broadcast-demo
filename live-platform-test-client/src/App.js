import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Video from "./component/common/CusVideoBox.jsx";
// import Socket from "./component/common/CusSocketClient.jsx";
// import TestWebRtc from "./component/common/testing/TestWebRtc.jsx";
import RootPage from "./component/page/RootPage.jsx";
import ViewerPage from "./component/page/BroadcastListPage.jsx";
import BroadcastViewer from "./component/common/viewer/BroadcastViewer.jsx";
import StreamerDashBoard from "./component/common/streamer/StreamerDashBoard.jsx";
import NotFoundPage from "./component/page/NotFoundPage.jsx";
import ChattingBox from "./component/common/chatting/ChattingBox.jsx";
import LoginPage from "./component/page/LoginPage.jsx";
import JoiningMembershipPage from "./component/page/JoiningMembershipPage.jsx";
import Header from "./component/common/header/Header.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                {/* <Video /> */}
                {/* <Socket /> */}
                <Route path="/" element={<RootPage />} />
                <Route path="/broadcast" element={<StreamerDashBoard />} />
                <Route path="/live-list" element={<ViewerPage />} />
                <Route
                    path="/live/:channelName"
                    element={<BroadcastViewer />}
                />
                {/* <Route path="/dashboard" element={<StreamerDashBoard />} /> */}
                <Route path="/chatting" element={<ChattingBox />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoiningMembershipPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
/**
- 방송 목록
- 방송 검색
- 방송 페이지(수신자)
- 방송 페이지(송신자)
 */
export default App;
