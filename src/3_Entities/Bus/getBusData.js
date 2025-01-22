import axios from "axios";

// 버스 데이터를 가져오는 비동기 함수
const getBusData = async () => {
  try {
    const endpoint = `http://43.202.84.174:7700/bus/info/all`;
    const response = await axios.get(endpoint, { data: [] });

    // 상태 코드에 따른 처리
    if (response.status !== 200) {
      switch (response.status) {
        case 400:
          console.error("입력 값 오류");
          break;
        case 409:
          console.error("중복 요청");
          break;
        default:
          console.error(response.status, "서버 오류 발생");
      }
      return null; // 오류 발생 시 처리 중단
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "서버 응답 오류:",
        error.response?.status || "네트워크 오류"
      );
    } else {
      console.error("네트워크 또는 서버 오류:", error.message);
    }
    return null;
  }
};

export default getBusData;
