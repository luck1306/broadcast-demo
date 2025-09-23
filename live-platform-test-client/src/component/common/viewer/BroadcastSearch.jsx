import { useState } from "react";
import SearchChannelApi from "../../../library/api/SearchChannelApi";

/**
 * props: { setCnlist }
 */
const BroadcastSearch = (props) => {
    const [cn, setCn] = useState("");
    const api = () => {
        SearchChannelApi({ cn })
            .then((res) => {
                props.setCnlist(res.data["channelNames"] || []);
            })
            .catch((err) => {
                props.setCnlist([]);
                console.error("SearchChannelApi error:", err);
            });
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px 8px",
                width: "250px",
            }}
        >
            <input
                id="channelName"
                type="text"
                placeholder="채널 검색"
                style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                }}
                onChange={(e) => setCn(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && api()}
            />
            <button
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={api}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.0271 14.0282C11.9245 14.9124 10.5247 15.4413 9.00143 15.4413C5.44504 15.4413 2.56201 12.5583 2.56201 9.00191C2.56201 5.44552 5.44504 2.5625 9.00143 2.5625C12.5578 2.5625 15.4409 5.44552 15.4409 9.00191C15.4409 10.5246 14.9123 11.9239 14.0287 13.0263L17.2307 16.2283C17.5073 16.5049 17.5073 16.9534 17.2307 17.2301C16.9541 17.5067 16.5056 17.5067 16.229 17.2301L13.0271 14.0282ZM14.0242 9.00191C14.0242 11.7759 11.7754 14.0246 9.00143 14.0246C6.22742 14.0246 3.97867 11.7759 3.97867 9.00191C3.97867 6.22794 6.22742 3.97917 9.00143 3.97917C11.7754 3.97917 14.0242 6.22794 14.0242 9.00191Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    );
};

export default BroadcastSearch;
