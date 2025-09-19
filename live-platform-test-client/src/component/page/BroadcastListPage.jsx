import { useEffect, useRef } from "react";
import BroadcastList from "../common/viewer/BroadcastListElement";
import Cookies from "js-cookie";

const BroadCastListPage = () => {
    const nickname = useRef(null);
    useEffect(() => {
        console.log("BroadCastListPage mounted");
        nickname.current = Cookies.get("nickname");
        console.log("User Nickname: ", nickname.current);
    }, []);
    console.log("Signal Server URL: ", process.env.REACT_APP_SIGSERVER);
    return (
        <>
            <h1>Welcome! Enjoy Broadcast!</h1>
            <div className="live-list">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <BroadcastList
                        channelName={"test"}
                        nickname={nickname}
                    ></BroadcastList>
                    {/* <BroadcastList channelName={"calm-down-man"}></BroadcastList>
          <BroadcastList channelName={"God-Chgang-seop"}></BroadcastList>
          <BroadcastList channelName={"Faker"}></BroadcastList> */}
                </ul>
            </div>
        </>
    );
};

export default BroadCastListPage;
