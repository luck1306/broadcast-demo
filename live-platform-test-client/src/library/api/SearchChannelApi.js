import request from "./BaseApi";

const SearchChannelApi = async (props) => {
    const res = await request.get(
        `/channels/search?query=${encodeURIComponent(props.cn)}`
    );
    // console.log(res);
    return res;
};

export default SearchChannelApi;
