import { useState } from "react";
import LoginApi from "../../../library/api/LoginApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../asset/css/LoginPage.css";
import { Space } from "antd";

const LoginPage = () => {
    const [userInfo, setUserInfo] = useState({
        accountId: "",
        password: "",
    });
    const navigate = useNavigate();

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="login-page-container">
            <div>
                <div className="login-page-content-container">
                    <div className="login-page-content">
                        <p>
                            Join the broadcast now. <br />
                            Moments of laughter, fun, and connection with your
                            viewers await you.
                        </p>
                    </div>
                    <div className="login-input-box-container">
                        <h2>Login Page</h2>
                        <p>지금 로그인하여 수백명의 방송인을 만나보세요!</p>

                        <div className="login-input-container">
                            <input
                                className="login-input"
                                type="text"
                                placeholder="account_id"
                                value={userInfo.accountId}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        accountId: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="password"
                                value={userInfo.password}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <div className="login-button">
                                <button
                                    onClick={async () => {
                                        // console.log(userInfo);
                                        LoginApi(userInfo)
                                            .then((res) => {
                                                // console.log(res.data);
                                                Cookies.set(
                                                    "accessToken",
                                                    "Bearer " +
                                                        res.data.accessToken
                                                );
                                                Cookies.set(
                                                    "refreshToken",
                                                    "Bearer " +
                                                        res.data.refreshToken
                                                );
                                                Cookies.set(
                                                    "nickname",
                                                    parseJwt(
                                                        res.data.accessToken
                                                    )["sub"] // get logined user nickname
                                                );
                                                alert("로그인 성공");
                                                navigate("/", {
                                                    replace: true,
                                                });
                                            })
                                            .catch((err) => {
                                                alert(
                                                    `[${err.response?.data.statCode}] - ${err.response?.data.message}`
                                                );
                                            });
                                    }}
                                >
                                    로그인
                                </button>
                            </div>
                            <p className="signin-text">
                                아직 회원이 아니신가요? <Space />
                                <Link to="/join">회원가입</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-page-red-box" />
        </div>
    );
};

export default LoginPage;
