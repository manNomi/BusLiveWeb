import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSoket = (nickname, setMessages) => {
  const [room, setRoom] = useState("");
  const socket = useRef(null);

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
    // 소켓 초기화
    socket.current = io("http://43.202.84.174:7700/");

    // 연결 성공 이벤트
    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.connected);
    });

    // 연결 끊김 이벤트
    socket.current.on("disconnect", () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 의존성 배열로 한 번만 실행
  return { room, joinRoom, sendMessage };
};
export default useSoket;
