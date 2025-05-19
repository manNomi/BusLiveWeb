import React from "react";
import useGetBusData from "../../../../../3_Entities/Bus/useGetBusData";
import {
  getBusTestData,
  updateRandomBusNodes,
} from "../../../../../4_Shared/mock/mockTestBusData";
import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useGetBusDataHandler = () => {
  const [busData, setBusData] = React.useState([]);
  const [busApiData, getBusApiData] = useGetBusData();
  const [{ test }] = useCheckAtom();

  React.useEffect(() => {
    let timerId;
    const data = getBusTestData();

    const fetchData = async () => {
      if (test) {
        setBusData(updateRandomBusNodes(data));
      } else {
        await getBusApiData();
      }
    };

    // 초기 데이터 로드
    fetchData();

    // 10초마다 폴링
    timerId = setInterval(fetchData, 10000);
    return () => clearInterval(timerId);
  }, [test]);

  return [test ? busData : busApiData];
};

export default useGetBusDataHandler;
