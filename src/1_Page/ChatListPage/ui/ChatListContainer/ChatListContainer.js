import Style from "./style";
import ChatList from "../ChatList/ChatList";
import { useNavigate } from "react-router-dom";

const ChatListContainer = () => {
  const pageChange = useNavigate();
  return (
    <Style.Container>
      <Style.Header>
        <Style.BackBtn
          onClick={() => {
            pageChange("/home");
          }}></Style.BackBtn>
        <Style.Logo>목록</Style.Logo>
        <Style.Title>511번 채팅방</Style.Title>
      </Style.Header>
      <Style.Content>
        <ChatList
          title={"인하대후문"}
          onClick={() => {
            pageChange("/chat/인하대후문");
          }}
        />
        <ChatList
          title={"주안역환승정류장"}
          onClick={() => {
            pageChange("/chat/주안역환승정류장");
          }}
        />
      </Style.Content>
      2
    </Style.Container>
  );
};
export default ChatListContainer;
