import { Link } from "react-router-dom";

const BroadcastList = (props) => {
    return (
        <li>
            <button><Link to={`/broadcast/${props.channelName}`}>보러가기</Link></button>
            <span>{props.channelName}</span>
        </li>
    );
}

export default BroadcastList;