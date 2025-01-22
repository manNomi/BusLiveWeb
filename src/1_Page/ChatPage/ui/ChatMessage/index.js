import STYLE from "./style";

const ChatMessage = ({ message, nickname, isMine }) => {
  return (
    <STYLE.Container>
      {!isMine && <STYLE.ChatUser>{nickname}</STYLE.ChatUser>}
      {isMine ? (
        <STYLE.UserChatBubble id="message">{message}</STYLE.UserChatBubble>
      ) : (
        <STYLE.ChatBubble>{message}</STYLE.ChatBubble>
      )}
    </STYLE.Container>
  );
};

export default ChatMessage;
