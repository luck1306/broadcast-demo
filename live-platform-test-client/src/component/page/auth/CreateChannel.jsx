import { useNavigate } from "react-router-dom";
import CreateChannelApi from "../../../library/api/CreateChannelApi";
import { useState } from "react";

const CreateChannel = () => {
    const [channelName, setChannelName] = useState("");
    const nav = useNavigate();

    const channelCreateClick = () => {
        if (!channelName) {
            alert("채널 이름을 입력하시오.");
            setChannelName("");
        }
        CreateChannelApi({ channelName })
            .then(() => {
                nav("/");
            })
            .catch((e) => {
                if (e.status === 409) alert("[Error] 로그인 확인");
                else if (e.status === 400)
                    alert("[Error] 채널이 이미 존재합니다.");
                nav("/");
            });
    };

    return (
        <>
            <h1>Channel Create Page</h1>
            <input
                type="text"
                placeholder="channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
            />
            <button onClick={channelCreateClick}>Create</button>
        </>
    );
};

export default CreateChannel;
