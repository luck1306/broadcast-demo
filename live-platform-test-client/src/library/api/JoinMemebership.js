import request from "./BaseApi";

/**
 * {
 *  "nickname": string,
 *  "accountId": string,
 *  "password": string,
 * }
 */
export default async function JoinMembership(props) {
    const res = await request.post("/users/signup", {...props, role: "ROLE_USER"});
    console.log(res);
    return res;
}