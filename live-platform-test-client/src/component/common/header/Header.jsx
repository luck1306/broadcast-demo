import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [token, setToken] = useState(Cookies.get("accessToken"));

    const issueToken = () => {
        Cookies.set("accessToken", "test");
        setToken("test");
    };
    
    const removeToken = () => {
        Cookies.remove("accessToken");
        setToken(null);
    }
    return (
        <div>
            {token ? (
                <>
                    {/* <button onClick={removeToken}>rm accessToken</button> */}
                    <Link to="/">홈</Link> |{" "}
                    <Link to="/broadcast">방송하기</Link> |{" "}
                    <Link to="/broadcast-list">방송보기</Link> |{" "}
                    <Link to="/chatting">채팅</Link> |{" "}
                    <Link to="/logout">로그아웃</Link>
                </>
            ): (
                <>
                    {/* <button onClick={issueToken}>set accessToken</button> */}
                    <Link to="/">홈</Link> |{" "}
                    <Link to="/login">로그인</Link> |{" "}
                    <Link to="/join">회원가입</Link> |{" "}
                </>
            )}
        </div>
    );
}
export default Header;