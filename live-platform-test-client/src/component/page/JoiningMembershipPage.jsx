import { useState } from "react";
import JoinMembership from "../../library/api/JoinMemebership";
import { useNavigate } from "react-router-dom";

const JoiningMembership = () => {
    const navigate = useNavigate
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        accountId: "",
        password: "",
    });
    return (
        <div>
            <p>회원가입 페이지</p>
            <input
                type="text"
                placeholder="nickname"
                value={userInfo.nickname}
                onChange={(e) =>
                    setUserInfo({ ...userInfo, nickname: e.target.value })
                }
            />
            <br />
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
            <button onClick={() => {
                JoinMembership(userInfo)
                    .then((res) => {
                        console.log(res.data);
                        alert("회원가입 성공");
                        navigate("/login");
                    })
                    .catch((err) => {
                        alert(
                            `[${err.response?.data.statCode}] - ${err.response?.data.message}`
                        );
                    });
            }}>회원가입</button>
        </div>
    );
};

export default JoiningMembership;
