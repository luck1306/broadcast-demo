import request from "./BaseApi";

const GetRecentlyChats = async (props) => {
    const res = await request.get(`/chats/${props.channelName}`);
    // console.log(res);
    return res;
}

export default GetRecentlyChats;