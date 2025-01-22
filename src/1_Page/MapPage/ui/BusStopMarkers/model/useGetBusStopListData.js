import { useEffect, useState } from "react";

import getBusStopListData from "../../../../../3_Entities/Bus/getBusStopListData";

// 커스텀 훅 - 버스 위치를 가져오는 훅
const useGetBusStopListData = () => {
  const [busStopListData, setBusStopListData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBusStopListData();
        if (data) {
          setBusStopListData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return { busStopListData, error };
};

export default useGetBusStopListData;
