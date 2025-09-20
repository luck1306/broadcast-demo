import request from "./BaseApi";

export default async () => {
    await request.delete("/users/logout");
    return null;
};
