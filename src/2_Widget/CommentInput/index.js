import STYLE from "./style";
import { useForm } from "react-hook-form";

const CommentInput = ({ onSendMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.message.trim()) {
      onSendMessage(data.message);
      reset(); // 입력 필드 초기화
    }
  };

  return (
    <STYLE.Container>
      <STYLE.UserImg src="https://via.placeholder.com/20" alt="User" />
      <STYLE.Write as="form" onSubmit={handleSubmit(onSubmit)}>
        <STYLE.WriteInput
          type="text"
          placeholder="메시지를 입력하세요..."
          {...register("message", {
            required: "메시지를 입력하세요.",
            minLength: {
              value: 1,
              message: "메시지는 최소 1자 이상 입력해야 합니다.",
            },
          })}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 기본 엔터 이벤트 방지
              handleSubmit(onSubmit)();
            }
          }}
        />
        {errors.message && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.message.message}
          </p>
        )}
      </STYLE.Write>
      <STYLE.WriteBtn type="submit">보내기</STYLE.WriteBtn>
    </STYLE.Container>
  );
};

export default CommentInput;
