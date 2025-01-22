import { useEffect, useState } from "react";

import getBusStopNodeListData from "../../../../../3_Entities/Bus/getBusStopNodeListData";

// 커스텀 훅 - 버스 위치를 가져오는 훅
const useGetBusStopListData = () => {
  const [nodeListData, setNodeList] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBusStopNodeListData();
        if (data) {
          setNodeList(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return { nodeListData, error };
};

export default useGetBusStopListData;
