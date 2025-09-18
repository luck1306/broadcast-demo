import { Link } from "react-router-dom";

const BroadcastList = (props) => {
  return (
    <li style={{ margin: "10px 10px" }}>
      <button>
        <Link
          to={{
            pathname: `/broadcast/${props.channelName}`,
          }}
          state={props.userId}
        >
          보러가기
        </Link>
      </button>
      <span>{props.channelName}</span>
    </li>
  );
};

export default BroadcastList;
