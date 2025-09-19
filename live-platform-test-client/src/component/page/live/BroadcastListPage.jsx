import { useEffect, useState } from "react";
import BroadcastList from "../../common/viewer/BroadcastListElement";
import GetChannelsApi from "../../../library/api/GetChannelsApi";
import Cookies from "js-cookie";

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
            <div className="live-list">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {cnlist.map((cn) => (
                        <BroadcastList
                            key={cn}
                            channelName={cn}
                            nickname={nickname}
                        ></BroadcastList>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default BroadCastListPage;
