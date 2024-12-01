import { useEffect, useState } from "react";

const getDirectionsData = async (coordinates) => {
  try {
    const response = await fetch("http://localhost:5003/api/directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates }),
    });

    const status = response.status;

    // 상태 코드 처리
    if (!response.ok) {
      console.log("스테이터스", status);

      switch (status) {
        case 400:
          console.log("요청 데이터 오류");
          break;
        case 500:
          console.log("서버 내부 오류");
          break;
        default:
          console.log(status, "예상치 못한 오류 발생");
      }
      return; // 에러 발생 시 이후 처리 중단
    }

    // 응답 처리
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("네트워크 또는 서버 오류:", error);
  }
};

const useDirectionsData = () => {
  const [directionsData, setDirectionsData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [coordinates, setCoordinates] = useState(null);

  const fetchData = async () => {
    setLoading(true); // 로딩 시작
    try {
      const data = await getDirectionsData(coordinates);
      setDirectionsData(data);
      setError(false); // 에러 초기화
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (coordinates && coordinates.length === 2) {
      fetchData();
    }
  }, [coordinates]);

  return [directionsData, setCoordinates, error, loading];
};

export default useDirectionsData;
