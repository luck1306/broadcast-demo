import { useState } from "react";
import JoinMembership from "../../../library/api/JoinMemebership";
import { useNavigate } from "react-router-dom";
import "../../../asset/css/LoginPage.css";

const JoiningMembership = () => {
    const navigate = useNavigate;
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        accountId: "",
        password: "",
    });
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
                        <h2>Signup Page</h2>
                        <p>지금 회원가입하여 수백명의 방송인을 만나보세요!</p>

                        <div className="login-input-container">
                            <input
                                className="login-input"
                                type="text"
                                placeholder="nickname"
                                value={userInfo.nickname}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        nickname: e.target.value,
                                    })
                                }
                            />
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
                                    onClick={() => {
                                        JoinMembership(userInfo)
                                            .then((res) => {
                                                // console.log(res.data);
                                                alert("회원가입 성공");
                                                navigate("/login");
                                            })
                                            .catch((err) => {
                                                alert(
                                                    `[${err.response?.data.statCode}] - ${err.response?.data.message}`
                                                );
                                            });
                                    }}
                                >
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-page-red-box" />
        </div>
    );
};

export default JoiningMembership;
