import request from "./BaseApi"

// path: ["/all", "/onair"]

const GetChannelsApi = async () => {
    const res = await request.get("/channels/onair");
    console.log(res);
    return res;
}
export default GetChannelsApi;