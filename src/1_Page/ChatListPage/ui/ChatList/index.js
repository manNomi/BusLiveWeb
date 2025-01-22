import STYLE from "./style";
import useTime from "./model/useTime";

const ChatList = (props) => {
  const { isBusTime } = useTime();

  return (
    <STYLE.ChatListContainer onClick={props.onClick}>
      <STYLE.ChatItem>
        <STYLE.ChatContent>
          <STYLE.NameAndTime>
            <STYLE.ChatName>{props.title}</STYLE.ChatName>
            <STYLE.Time>
              {isBusTime ? "511 활동시간" : "활동시간이 아닙니다"}
            </STYLE.Time>
          </STYLE.NameAndTime>
          <STYLE.LastMessage>클릭해 지금 바로 참여하기</STYLE.LastMessage>
        </STYLE.ChatContent>
      </STYLE.ChatItem>
    </STYLE.ChatListContainer>
  );
};
export default ChatList;
