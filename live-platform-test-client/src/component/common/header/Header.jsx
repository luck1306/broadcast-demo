import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            {Cookies.get("accessToken") ? (
                <>
                    <Link to="/">홈</Link> |{" "}
                    <Link to="/broadcast">방송하기</Link> |{" "}
                    <Link to="/live-list">방송보기</Link> |{" "}
                    <Link to="/chatting">채팅</Link> |{" "}
                    <Link
                        onClick={() => {
                            Cookies.remove("accessToken");
                            Cookies.remove("refreshToken");
                            window.alert("로그아웃 되었습니다.");
                            window.location.href = "/";
                        }}
                    >
                        로그아웃
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/">홈</Link> | <Link to="/login">로그인</Link> |{" "}
                    <Link to="/join">회원가입</Link> |{" "}
                </>
            )}
        </div>
    );
};
export default Header;
