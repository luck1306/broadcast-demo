import request from "./BaseApi";

const GetChannelName = async () => {
    const res = await request.get("/channels/info");
    // console.log(res);
    return res;
}

export default GetChannelName;