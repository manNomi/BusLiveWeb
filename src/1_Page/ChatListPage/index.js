import STYLE from "./style";
import ChatList from "./ui/ChatList";
import { useNavigate } from "react-router-dom";

const ChatListContainer = () => {
  const pageChange = useNavigate();
  return (
    <STYLE.Container>
      <STYLE.Header>
        <STYLE.BackBtn
          onClick={() => {
            pageChange("/home");
          }}></STYLE.BackBtn>
        <STYLE.Logo>목록</STYLE.Logo>
        <STYLE.Title>511번 채팅방</STYLE.Title>
      </STYLE.Header>
      <STYLE.Content>
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
      </STYLE.Content>
      2
    </STYLE.Container>
  );
};
export default ChatListContainer;
