import { UserChatBubble, Container } from "./Style";

const MyChat = (props) => {
  const content = props.message;
  return (
    <Container>
      <UserChatBubble id="message">{content}</UserChatBubble>
    </Container>
  );
};
export default MyChat;
