import React from "react";
import { useForm } from "react-hook-form";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  NicknameInput,
  JoinButton,
} from "./style";

const InputNickNameModal = ({ joinRoom }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    joinRoom(data.nickname);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>닉네임을 입력하세요</ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NicknameInput
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 2,
                message: "닉네임은 최소 2자 이상이어야 합니다.",
              },
              maxLength: {
                value: 12,
                message: "닉네임은 최대 12자까지 입력 가능합니다.",
              },
            })}
          />
          {errors.nickname && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.nickname.message}
            </p>
          )}
          <JoinButton type="submit">입장하기</JoinButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InputNickNameModal;
