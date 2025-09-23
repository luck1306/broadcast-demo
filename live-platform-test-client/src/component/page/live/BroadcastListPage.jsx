import { useEffect, useState } from "react";
import BroadcastListElement from "../../common/viewer/BroadcastListElement";
import GetChannelsApi from "../../../library/api/GetChannelsApi";
import Cookies from "js-cookie";
import BroadcastSearch from "../../common/viewer/BroadcastSearch";

const BroadCastListPage = () => {
    const [nickname, setNickname] = useState(null);
    const [cnlist, setCnlist] = useState([]);
    useEffect(() => {
        console.log("BroadCastListPage mounted");
        setNickname(Cookies.get("nickname"));

        GetChannelsApi().then((res) => {
            // axios get
            setCnlist(res.data["channelNames"] || []);
        });
        return () => {
            console.log("BroadCastListPage unmounted");
            setNickname(null);
            setCnlist([]);
        };
    }, []);

    console.log("Signal Server URL: ", process.env.REACT_APP_SIGSERVER);

    return (
        <>
            <h1>Welcome! Enjoy Broadcast!</h1>
            <BroadcastSearch setCnlist={setCnlist} />
            <div className="live-list">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {cnlist.length === 0 ? (
                        <li>채널을 찾을 수 없거나, 방송중인 채널이 없습니다.</li>
                    ) : (
                        cnlist.map((cn) => (
                            <BroadcastListElement
                                key={cn}
                                channelName={cn}
                                nickname={nickname}
                            ></BroadcastListElement>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default BroadCastListPage;
