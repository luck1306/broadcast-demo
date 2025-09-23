import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            {Cookies.get("accessToken") ? (
                <>
                    | <Link to="/">홈</Link> |{" "}
                    <Link to="/broadcast">방송하기</Link> |{" "}
                    <Link to="/live-list">방송보기</Link> |{" "}
                    <Link to={"/logout"}>로그아웃</Link>
                </>
            ) : (
                <>
                    | <Link to="/">홈</Link> | <Link to="/login">로그인</Link> |{" "}
                    <Link to="/join">회원가입</Link> |{" "}
                </>
            )}
        </header>
    );
};
export default Header;
