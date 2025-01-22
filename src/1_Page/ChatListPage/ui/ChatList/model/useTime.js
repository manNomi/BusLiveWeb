import { useState, useEffect } from "react";

const useTime = () => {
  const [isBusTime, setIsBusTime] = useState(false);

  useEffect(() => {
    const checkBusTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      //  5:30 부터 23:00 까지 true
      const startHour = 5;
      const startMinute = 30;
      const endHour = 23;
      const endMinute = 0;

      const currentTime = hours * 60 + minutes; // 현재 시간을 분 단위로 변환
      const startTime = startHour * 60 + startMinute; // 시작 시간을 분 단위로 변환
      const endTime = endHour * 60 + endMinute; // 종료 시간을 분 단위로 변환

      setIsBusTime(currentTime >= startTime && currentTime < endTime);
    };

    checkBusTime();

    // 매 분마다 시간을 업데이트하도록 설정
    const interval = setInterval(checkBusTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return { isBusTime };
};

export default useTime;
