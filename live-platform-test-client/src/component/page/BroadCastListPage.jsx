import { useRef, useState } from "react";
import BroadcastList from "../common/viewer/BroadcastList";

const BroadCastListPage = () => {
  const userId = useRef(crypto.randomUUID());
  return (
    <>
      <h1>Welcome! Enjoy Broadcast!</h1>
      <div className="broadcast-list">
        <ul>
          <BroadcastList channelName={"test"} userId={userId}></BroadcastList>
          {/* <BroadcastList channelName={"calm-down-man"}></BroadcastList>
          <BroadcastList channelName={"God-Chgang-seop"}></BroadcastList>
          <BroadcastList channelName={"Faker"}></BroadcastList> */}
        </ul>
      </div>
    </>
  );
};

export default BroadCastListPage;
