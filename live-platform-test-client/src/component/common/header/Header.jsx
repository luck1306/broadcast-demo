import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetChannelName from "../../../library/api/GetChannelName";
import "../../../asset/css/Header.css";

const Header = () => {
  const [myCnName, setMyCnName] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    GetChannelName()
      .then((res) => setMyCnName(res.data))
      .catch((err) => {
        console.error("채널 이름을 불러오는 중 오류 발생:", err);
        setMyCnName("");
      });
  }, []);

  const isLoggedIn = !!Cookies.get("accessToken");

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          🎥 OnAir
        </Link>

        <nav className="nav">
          {isLoggedIn ? (
            <>
              {myCnName ? (
                <Link to={`/broadcast/${myCnName}`}>방송하기</Link>
              ) : (
                <Link to="/channel/join">채널 만들기</Link>
              )}
              <Link to="/live-list">방송보기</Link>
              <Link to="/logout">로그아웃</Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/join">회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
