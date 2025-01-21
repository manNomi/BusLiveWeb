import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Style from "./style";
import CommentInput from "../../../../widget/comment_input";
import { io } from "socket.io-client";
import MyChat from "../Chat/MyChat";
import AnotherChat from "../Chat/AnotherChat";
import InputNickName from "../InputNickName/InputNickName";
import usePageChange from "../../../Map/model/usePageChange";

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const pageChange = usePageChange();
  useEffect(() => {
    // 소켓 초기화
    socket.current = io("http://43.202.84.174:7700/");

    // 연결 성공 이벤트
    socket.current.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected:", socket.current.connected);
    });

    // 연결 끊김 이벤트
    socket.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected:", socket.current.connected);
    });

    // 메시지 수신 이벤트 리스너 추가
    socket.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, { message, nickname }]);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.current.disconnect();
    };
  }, []); // 빈 의존성 배열로 한 번만 실행
  const param = useParams("id").id;
  useEffect(() => {
    if (param !== "주안역환승정류장" && param !== "인하대후문") {
      alert(
        "개발중인 채팅방입니다 현재 가능 채팅방 [주안역환승정류장,인하대후문]"
      );
      pageChange("/home");
    }
  }, [param]);
  const joinRoom = (param) => {
    if (!nickname) return;
    if (param === "주안역환승정류장") {
      setRoom(1);
      socket.current.emit("join room", { room: 1, nickname });
    } else if (param === "인하대후문") {
      setRoom(2);
      socket.current.emit("join room", { room: 2, nickname });
    } else {
      alert("아직 개발중인 채팅방입니다");
    }
  };

  const sendMessage = (message) => {
    if (!room) return alert("방에 먼저 입장하세요.");
    socket.current.emit("chat message", { message, room });
  };
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef]);

  return room === "" ? (
    <>
      <InputNickName
        nickname={nickname}
        setNickname={setNickname}
        joinRoom={() => {
          joinRoom(param);
        }}
      />
    </>
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
            <AnotherChat
              key={index}
              message={value.message.message}
              nickname={value.message.nickname}
            />
          ) : (
            <MyChat key={index} message={value.message.message} />
          )
        )}
      </Style.Content>
      {/* CommentInput에 sendMessage 함수 전달 */}
      <CommentInput onSendMessage={sendMessage} />
    </Style.Container>
  );
};
export default ChatPage;
