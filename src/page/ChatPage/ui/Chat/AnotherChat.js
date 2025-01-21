import { ChatBubble, ChatUser, Container } from "./Style";

const AnotherChat = (props) => {
  const nickname = props.nickname;
  const content = props.message;
  return (
    <Container>
      <ChatUser>{nickname}</ChatUser>
      <ChatBubble>{content}</ChatBubble>
    </Container>
  );
};
export default AnotherChat;
