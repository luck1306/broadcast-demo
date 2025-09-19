import { Link } from "react-router-dom";

const BroadcastList = (props) => {
  return (
    <li>
      <button>
        <Link
          to={{
            pathname: `/live/${props.channelName}`,
          }}
          state={props.nickname}
        >
          보러가기
        </Link>
      </button>
      <span>{props.channelName}</span>
    </li>
  );
};

export default BroadcastList;
