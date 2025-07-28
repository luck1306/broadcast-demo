import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Video from "./component/common/CusVideoBox.jsx";
// import Socket from "./component/common/CusSocketClient.jsx";
import TestWebRtc from "./component/common/testing/TestWebRtc.jsx";
import RootPage from "./component/page/RootPage.jsx";
import { useState } from "react";
import ViewerPage from "./component/page/ViewerPage.jsx";

function App() {
  const [isStreamer, setIsStreamer] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Video /> */}
        {/* <Socket /> */}
        <Route path="/" element={<RootPage setState={setIsStreamer} />} />
        <Route
          path="/broadcast"
          element={<TestWebRtc isStreamer={isStreamer} />}
        />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
