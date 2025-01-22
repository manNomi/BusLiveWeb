import axios from "axios";

const example = {
  rows: [
    {
      id: 2,
      name: "인하대후문",
      lastMessage: "현재 교통 정체 중입니다.",
    },
    {
      id: 3,
      name: "주안역환승정류장",
      lastMessage: "정상 운행 중입니다.",
    },
  ],
};

const getBusChatList = async () => {
  try {
    return example.rows;
    const endpoint = "https://api.example.com/bus-chat-list";
    const response = await axios.get(endpoint);

    // API 응답 구조 변환
    return response.rows;
  } catch (error) {
    console.error("채팅방 리스트를 불러오는 데 실패했습니다:", error);
    throw new Error("채팅방 리스트를 가져올 수 없습니다.");
  }
};

export default getBusChatList;
