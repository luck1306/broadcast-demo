const ChattingElement = (props) => {
  return (
    <li className="chatting-element">
      <span className="chatting-username">{props.username}</span>
      <span className="chatting-message">{props.message}</span>
    </li>
  );
}

export default ChattingElement;   