import request from "./BaseApi"

/**
 * {
 *   "accountId": string,
 *   "password": string
 * }
 */
export default async function LoginApi (props) {
    const res = await request.post("/users/signin", props)
    // console.log(res);
    return res;
}