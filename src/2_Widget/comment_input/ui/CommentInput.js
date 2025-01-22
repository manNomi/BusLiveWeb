import { Write, UserImg, WriteInput, Container, WriteBtn } from "./style.js";
import { useEffect, useState, useRef } from "react";

const CommentInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const setMessageEvent = (text) => {
    setMessage(text);
  };
  const handleKeyPress = (e) => {
    if (e) e.stopPropagation();
    setMessage(e.target.value);
    if (e.key === "Enter") {
      handleSend(e);
    }
  };
  const handleClick = (e) => {
    if (e) e.stopPropagation();
    setMessage(e.target.value);
    handleSend();
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      inputRef.current.value = "";
    }
  };
  return (
    <Container>
      <UserImg />
      <Write>
        <WriteInput
          ref={inputRef}
          type="text"
          placeholder="메시지 입력..."
          onKeyDown={handleKeyPress}
        />
        <WriteBtn onClick={handleClick}>전송</WriteBtn>
      </Write>
    </Container>
  );
};

export default CommentInput;
