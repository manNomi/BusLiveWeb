import React from "react";
import { useForm } from "react-hook-form";
import STYLE from "./style";

const InputNickNameModal = (props) => {
  const { joinRoom } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    joinRoom();
  };

  return (
    <STYLE.ModalOverlay>
      <STYLE.ModalContainer>
        <STYLE.ModalTitle>닉네임을 입력하세요</STYLE.ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <STYLE.NicknameInput
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
          <STYLE.ErrorMessage>
            {errors.nickname && errors.nickname.message}
          </STYLE.ErrorMessage>
          <STYLE.JoinButton type="submit">입장하기</STYLE.JoinButton>
        </form>
      </STYLE.ModalContainer>
    </STYLE.ModalOverlay>
  );
};

export default InputNickNameModal;
