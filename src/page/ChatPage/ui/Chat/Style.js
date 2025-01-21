import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const ChatUser = styled.div`
  display: flex;
  width: 100%;
  font-weight: 900;
`;

// 상대방 메시지 말풍선
export const ChatBubble = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  margin: 10px 0;
  background-color: #f1f0f0;
  color: #333;
  font-size: 14px;
  border-radius: 12px;
  position: relative;
  align-self: flex-start;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -8px;
    width: 12px;
    height: 12px;
    background-color: #f1f0f0;
    transform: rotate(45deg);
    border-bottom-left-radius: 3px;
  }
`;

// 사용자 메시지 말풍선
export const UserChatBubble = styled(ChatBubble)`
  background-color: #d4f8e8;
  color: #333;
  align-self: flex-end;

  &:after {
    left: auto;
    right: -8px;
    background-color: #d4f8e8;
  }
`;
