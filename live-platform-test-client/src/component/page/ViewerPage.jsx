import BroadcastList from "../common/viewer/BroadcastList";

const ViewerPage = () => {
  return (
    <>
      <h1>Welcome! Enjoy Broadcast!</h1>
      <div className="broadcast-list">
        <ul>
          <BroadcastList channelName={"test"}></BroadcastList>
          {/* <BroadcastList channelName={"calm-down-man"}></BroadcastList>
          <BroadcastList channelName={"God-Chgang-seop"}></BroadcastList>
          <BroadcastList channelName={"Faker"}></BroadcastList> */}
        </ul>
      </div>
    </>
  );
};

export default ViewerPage;
