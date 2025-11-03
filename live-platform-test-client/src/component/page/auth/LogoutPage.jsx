import { useEffect } from "react";
import LogoutApi from "../../../library/api/LogoutApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import StreamStatSwitchApi from "../../../library/api/StreamStatSwitchApi";
import { useDispatch } from "react-redux";
import { resetTokens } from "../../../redux/tokenSlice";

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        LogoutApi().then((res) => {
            Cookies.remove("accessToken", { path: "/" });
            Cookies.remove("refreshToken", { path: "/" });
            Cookies.remove("nickname", { path: "/" });
            StreamStatSwitchApi({ stat: 0 });
            dispatch(resetTokens());

            alert("로그아웃 되었습니다.");
            navigate("/", { replace: true });
        });
    }, []);
    return null;
};

export default LogoutPage;
