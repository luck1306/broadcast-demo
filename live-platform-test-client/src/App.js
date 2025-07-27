import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Video from "./component/common/CusVideoBox.jsx";
// import Socket from "./component/common/CusSocketClient.jsx";
import TestWebRtc from "./component/common/TestWebRtc.jsx";
import RootPage from "./component/page/RootPage.jsx"
import { useState } from "react";

function App() {
    const [isStreamer, setIsStreamer] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                {/* <Video /> */}
                {/* <Socket /> */}
                <Route path="/" element={<RootPage setState={setIsStreamer} />} />
                <Route path="/broadcast" element={<TestWebRtc isStreamer={isStreamer} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
