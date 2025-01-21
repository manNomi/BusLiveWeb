import styled from "styled-components";

// 채팅 목록 전체 컨테이너
export const ChatListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #eee;
`;

// 채팅 항목 하나의 스타일
export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

// 프로필 사진 스타일
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

// 채팅 내용 컨테이너
export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// 이름과 시간 컨테이너
export const NameAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

// 채팅방 이름 스타일
export const ChatName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

// 시간 스타일
export const Time = styled.span`
  font-size: 12px;
  color: #888;
`;

// 마지막 메시지 스타일
export const LastMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
