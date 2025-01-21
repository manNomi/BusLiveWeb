import {
  ChatListContainer,
  ChatItem,
  ChatContent,
  NameAndTime,
  ChatName,
  Time,
  LastMessage,
} from "./style";

const ChatList = (props) => {
  return (
    <ChatListContainer onClick={props.onClick}>
      {/* 예시 채팅방 */}
      <ChatItem>
        <ChatContent>
          <NameAndTime>
            <ChatName>{props.title}</ChatName>
            <Time>511 활동시간</Time>
          </NameAndTime>
          <LastMessage>클릭해 지금 바로 참여하기</LastMessage>
        </ChatContent>
      </ChatItem>
      {/* 여러 개의 ChatItem을 반복 */}
    </ChatListContainer>
  );
};
export default ChatList;
