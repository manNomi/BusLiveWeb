import STYLE from "./style";

const ChatList = (props) => {
  return (
    <STYLE.ChatListContainer onClick={props.onClick}>
      {/* 예시 채팅방 */}
      <STYLE.ChatItem>
        <STYLE.ChatContent>
          <STYLE.NameAndTime>
            <STYLE.ChatName>{props.title}</STYLE.ChatName>
            <STYLE.Time>511 활동시간</STYLE.Time>
          </STYLE.NameAndTime>
          <STYLE.LastMessage>클릭해 지금 바로 참여하기</STYLE.LastMessage>
        </STYLE.ChatContent>
      </STYLE.ChatItem>
      {/* 여러 개의 ChatItem을 반복 */}
    </STYLE.ChatListContainer>
  );
};
export default ChatList;
