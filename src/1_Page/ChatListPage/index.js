import STYLE from "./style";
import ChatList from "./ui/ChatList";
import { useNavigate } from "react-router-dom";
import useGetBusChatList from "./model/useGetBusChatList";

const ChatListContainer = () => {
  const pageChange = useNavigate();
  const { busChatList } = useGetBusChatList();
  console.log(busChatList);
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
        {busChatList?.map((busStation) => (
          <ChatList
            title={busStation.name}
            onClick={() => {
              pageChange(`/chat/${busStation.name}`);
            }}
          />
        ))}
      </STYLE.Content>
      2
    </STYLE.Container>
  );
};
export default ChatListContainer;
