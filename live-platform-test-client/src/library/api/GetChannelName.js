import request from "./BaseApi";

const GetChannelName = async (prop) => {
    const res = await request.get("/channels/info/" + prop.nickname);
    // console.log(res);
    return res;
};

export default GetChannelName;
