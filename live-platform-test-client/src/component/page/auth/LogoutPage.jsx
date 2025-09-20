import { useEffect } from "react";
import LogoutApi from "../../../library/api/LogoutApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        LogoutApi().then((res) => {
            Cookies.remove("accessToken", { path: "/" });
            Cookies.remove("refreshToken", { path: "/" });
            Cookies.remove("nickname", { path: "/" });
            alert("로그아웃 되었습니다.");
            navigate("/", { replace: true });
        });
    }, []);
    return null;
};

export default LogoutPage;
