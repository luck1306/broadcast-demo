import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = (props) => {
    const token = Cookies.get("accessToken");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return props.children;
};

export default PrivateRoute;
