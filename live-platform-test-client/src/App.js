import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Video from "./component/common/CusVideoBox.jsx";
// import Socket from "./component/common/CusSocketClient.jsx";
// import TestWebRtc from "./component/common/testing/TestWebRtc.jsx";
import RootPage from "./component/page/RootPage.jsx";
import BroadcastListPage from "./component/page/live/BroadcastListPage.jsx";
import NotFoundPage from "./component/page/NotFoundPage.jsx";
import ChattingBox from "./component/common/chatting/ChattingBox.jsx";
import LoginPage from "./component/page/auth/LoginPage.jsx";
import JoiningMembershipPage from "./component/page/auth/JoiningMembershipPage.jsx";
import Header from "./component/common/header/Header.jsx";
import StreamerPage from "./component/page/live/StreamerPage.jsx";
import LogoutPage from "./component/page/auth/LogoutPage.jsx";
import ViewerPage from "./component/page/live/ViewerPage.jsx";
// import { AuthProvider } from "./component/page/auth/AuthProvider.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                {/* <Video /> */}
                {/* <Socket /> */}
                <Route path="/" element={<RootPage />} />
                <Route path="/broadcast" element={<StreamerPage />} />
                <Route path="/live-list" element={<BroadcastListPage />} />
                <Route
                    path="/live/:channelName"
                    element={<ViewerPage />}
                />
                {/* <Route path="/dashboard" element={<StreamerDashBoard />} /> */}
                <Route path="/chatting" element={<ChattingBox />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoiningMembershipPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
/**
- 방송 검색
- 방송 페이지(수신자)
- 방송 페이지(송신자)
- react 페이지 인가 인터셉터
 */
export default App;
