import request from "./BaseApi";

const LogoutApi = async () => {
    await request.delete("/users/logout");
    return null;
};

export default LogoutApi;