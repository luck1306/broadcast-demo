import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const token = Cookies.get("accessToken");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return props.children;
};

export default PrivateRoute;
