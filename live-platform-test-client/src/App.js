import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./component/page/RootPage.jsx";
import BroadcastListPage from "./component/page/live/BroadcastListPage.jsx";
import NotFoundPage from "./component/page/NotFoundPage.jsx";
import LoginPage from "./component/page/auth/LoginPage.jsx";
import JoiningMembershipPage from "./component/page/auth/JoiningMembershipPage.jsx";
import Header from "./component/common/header/Header.jsx";
import StreamerPage from "./component/page/live/StreamerPage.jsx";
import LogoutPage from "./component/page/auth/LogoutPage.jsx";
import ViewerPage from "./component/page/live/ViewerPage.jsx";
import PrivateRoute from "./component/page/auth/PrivateRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<RootPage />} />
                <Route
                    path="/broadcast/:channelName"
                    element={
                        <PrivateRoute>
                            <StreamerPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/live-list"
                    element={
                        <PrivateRoute>
                            <BroadcastListPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/live/:channelName"
                    element={
                        <PrivateRoute>
                            <ViewerPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoiningMembershipPage />} />
                <Route
                    path="/logout"
                    element={
                        <PrivateRoute>
                            <LogoutPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
