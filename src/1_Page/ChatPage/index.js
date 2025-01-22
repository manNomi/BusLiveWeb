import { useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./style";

import ChatMessage from "./ui/ChatMessage";
import InputNickNameModal from "./ui/InputNickNameModal";
import CommentInput from "../../2_Widget/Comment_input";

import useChatListParam from "./model/useChatListParam";
import useScrollDown from "./model/useScrollDown";
import useSoket from "./model/useSoket";
import usePageChange from "../../4_Shared/model/usePageChange";

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState("");
  const pageChange = usePageChange();

  const { param } = useChatListParam(pageChange);
  const { scrollRef } = useScrollDown(messages);
  const { room, joinRoom, sendMessage } = useSoket(nickname, setMessages);

  return room === "" ? (
    <InputNickNameModal
      nickname={nickname}
      setNickname={setNickname}
      joinRoom={joinRoom(param)}
    />
  ) : (
    <Style.Container>
      <Style.Header>
        <Style.BackBtn
          onClick={() => {
            pageChange("/home");
          }}></Style.BackBtn>
        <Style.Logo>{id}</Style.Logo>
        <Style.Title>511번 채팅방</Style.Title>
      </Style.Header>
      <Style.Content ref={scrollRef}>
        {messages.map((value, index) =>
          value.message.nickname !== nickname ? (
            <ChatMessage
              message={value.message.message}
              nickname={value.message.nickname}
            />
          ) : (
            <ChatMessage message={value.message.message} isMine={true} />
          )
        )}
      </Style.Content>
      <CommentInput onSendMessage={sendMessage} />
    </Style.Container>
  );
};
export default ChatPage;
