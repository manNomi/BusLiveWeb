import STYLE from "./style";
import ChatList from "./ui/ChatList";
import { useNavigate } from "react-router-dom";
import useGetBusChatList from "./model/useGetBusChatList";

const ChatListContainer = () => {
  const navigate = useNavigate();
  const { busChatList } = useGetBusChatList();

  return (
    <STYLE.Container>
      <STYLE.Header>
        <STYLE.BackBtn
          onClick={() => {
            navigate("/home");
          }}></STYLE.BackBtn>
        <STYLE.Logo>목록</STYLE.Logo>
        <STYLE.Title>511번 채팅방</STYLE.Title>
      </STYLE.Header>
      <STYLE.Content>
        {busChatList?.map((busStation) => (
          <ChatList
            title={busStation.name}
            onClick={() => {
              alert(
                "현재 서버 점검으로 인해 채팅방 사용이 불가합니다 없습니다."
              );
              navigate("/home");
              // pageChange(`/chat/${busStation.name}`);
            }}
          />
        ))}
      </STYLE.Content>
      2
    </STYLE.Container>
  );
};
export default ChatListContainer;
