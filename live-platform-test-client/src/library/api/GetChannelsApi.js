import request from "./BaseApi"

// path: ["/all", "/onair"]
export default async () => {
    const res = await request.get("/channels/onair");
    console.log(res);
    return res;
}