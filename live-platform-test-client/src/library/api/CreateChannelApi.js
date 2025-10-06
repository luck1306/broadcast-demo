import request from "./BaseApi";

const CreateChannelApi = async (props) => {
    const res = await request.post("/channels/create", null, {
        params: { channelName: props.channelName },
    });
    // console.log(res);
    return res;
};

export default CreateChannelApi;
