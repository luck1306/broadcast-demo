import { useState } from "react";
import LoginApi from "../../library/api/LoginApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        accountId: "",
        password: "",
    });
    return (
        <div>
            <p>로그인 페이지</p>
            <input
                type="text"
                placeholder="account_id"
                value={userInfo.accountId}
                onChange={(e) =>
                    setUserInfo({ ...userInfo, accountId: e.target.value })
                }
            />
            <br />
            <input
                type="password"
                placeholder="password"
                value={userInfo.password}
                onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                }
            />
            <br />
            <button
                onClick={async () => {
                    console.log(userInfo);
                    LoginApi(userInfo)
                        .then((res) => {
                            console.log(res.data);
                            Cookies.set("accessToken", res.data.accessToken);
                            Cookies.set("refreshToken", res.data.refreshToken);
                            alert("로그인 성공");
                            // navigate("/");
                            window.location.href = "/"
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
            <br />
            <button>
                <Link to="/">회원가입</Link>
            </button>
            <br />
        </div>
    );
};

export default LoginPage;
