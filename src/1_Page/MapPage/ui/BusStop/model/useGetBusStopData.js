import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getBusStopData from "../../../../../3_Entities/Bus/getBusStopData";

// 커스텀 훅 - 버스 위치를 가져오는 훅
const useGetBusData = () => {
  const { busId } = useParams();
  const [busStopData, setStopBusData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (busId) => {
      try {
        const data = await getBusStopData(busId);
        if (data) {
          setStopBusData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData(busId);
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { busStopData, error };
};

export default useGetBusData;
