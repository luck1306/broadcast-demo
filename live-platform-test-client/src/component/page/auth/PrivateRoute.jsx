import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const token = useSelector((state) => state.token.value);
    if (!token.accessToken) {
        return <Navigate to="/login" replace />;
    }
    return props.children;
};

export default PrivateRoute;
