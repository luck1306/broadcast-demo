const ChattingElement = ({ message }) => {
  return (
    <li className="chatting-element">
      <span className="chatting-username">{message.username}</span>
      <span className="chatting-message">{message.message}</span>
    </li>
  );
}

export default ChattingElement;