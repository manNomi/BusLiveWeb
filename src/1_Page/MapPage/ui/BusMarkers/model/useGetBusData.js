import { useEffect, useState } from "react";
import getBusData from "../../../../../3_Entities/Bus/getBusData";

// 커스텀 훅 - 버스 위치를 가져오는 훅
const useGetBusData = () => {
  const [busData, setBusData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBusData();
        if (data) {
          setBusData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { busData, error };
};

export default useGetBusData;
