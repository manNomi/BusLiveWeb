import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  NicknameInput,
  JoinButton,
} from "./style";

const InputNickName = ({ nickname, setNickname, joinRoom }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>닉네임을 입력하세요</ModalTitle>
        <NicknameInput
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <JoinButton onClick={joinRoom}>입장하기</JoinButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InputNickName;
