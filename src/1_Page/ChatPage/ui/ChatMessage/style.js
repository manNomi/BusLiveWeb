import styled from "styled-components";
import back_icon from "../../assets/back_icon.svg";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
  `,

  ChatUser: styled.div`
    display: flex;
    width: 100%;
    font-weight: 900;
  `,

  // 상대방 메시지 말풍선
  ChatBubble: styled.div`
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
  `,

  // 사용자 메시지 말풍선
  UserChatBubble: styled.div`
    max-width: 60%;
    padding: 10px 15px;
    margin: 10px 0;
    background-color: #d4f8e8;
    color: #333;
    font-size: 14px;
    border-radius: 12px;
    position: relative;
    align-self: flex-end;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 12px;
      height: 12px;
      background-color: #d4f8e8;
      transform: rotate(45deg);
      border-bottom-right-radius: 3px;
    }
  `,

  // 뒤로가기 버튼 스타일
  BackBtn: styled.button`
    width: 40px;
    height: 40px;
    background-image: url(${back_icon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    border: none;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      opacity: 0.8;
    }
  `,
};

export default STYLE;
