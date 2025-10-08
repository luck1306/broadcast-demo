import request from "./BaseApi";

const StreamStatSwitchApi = (props) => {
    const res = request.put("/channels/stream", null, {
        params: {
            stat: props.stat,
        },
    });
    return res;
};

export default StreamStatSwitchApi;
