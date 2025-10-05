import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetChannelName from "../../../library/api/GetChannelName";

const Header = () => {
    const [nickname, setNickname] = useState(Cookies.get("nickname") || "");
    const [myCnName, setMyCnName] = useState("");

    useEffect(() => {
        if (Cookies.get("accessToken")) {
            GetChannelName()
                .then((res) => {
                    setMyCnName(res.data);
                })
                .catch((err) => {
                    console.error("채널 이름을 불러오는 중 오류 발생:", err);
                    setMyCnName("");
                });
        }
    }, []);

    return (
        <header>
            | <Link to="/">홈</Link> |{" "}
            {Cookies.get("accessToken") ? (
                <>
                    {myCnName && (
                        <>
                            <Link
                                to={`/broadcast/${myCnName}`}
                                state={nickname}
                            >
                                방송하기
                            </Link>{" "}
                            |
                        </>
                    )}
                    <Link to="/live-list">방송보기</Link> |{" "}
                    <Link to="/logout">로그아웃</Link>
                </>
            ) : (
                <>
                    <Link to="/login">로그인</Link> |{" "}
                    <Link to="/join">회원가입</Link> |{" "}
                </>
            )}
        </header>
    );
};
export default Header;
