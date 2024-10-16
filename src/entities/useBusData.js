import { useEffect, useState } from "react";

const getBusData = async () => {
  try {
    const response = await fetch("http://43.202.84.174:8500/busLife", {});
    const status = response.status;

    // 상태 코드에 따른 처리
    if (!response.ok) {
      switch (status) {
        case 400:
          alert("입력 값 오류");
          break;
        case 409:
          alert("중복임");
          break;
        default:
          alert("서버 오류 발생");
      }
      return; // 에러 발생 시 이후 처리 중단
    }

    // 응답이 성공한 경우만 JSON 처리
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("네트워크 또는 서버 오류:", error);
  }
};

const useBusData = () => {
  const [busData, setBusData] = useState({});
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      const busData = await getBusData();
      setBusData(busData);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    const initInterval = setInterval(() => {
      // fetchData();
      setBusData({
        data: [
          {
            lastNode: 0,
            lat: 37.4478052441598,
            lng: 126.646296789041,
          },
        ],
      });
    }, 5000);
    return () => clearInterval(initInterval);
  }, []);

  return [busData, error];
};
export default useBusData;