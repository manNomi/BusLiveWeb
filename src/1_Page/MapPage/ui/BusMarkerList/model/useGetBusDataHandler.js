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
  const prevBusDataStringRef = React.useRef("");

  React.useEffect(() => {
    let timerId;
    const data = getBusTestData();

    const fetchData = async () => {
      if (test) {
        const newBusData = updateRandomBusNodes(data);
        // 실제로 데이터가 변경된 경우에만 상태 업데이트
        const newBusDataString = JSON.stringify(
          newBusData.map((bus) => bus.lastNode)
        );
        if (prevBusDataStringRef.current !== newBusDataString) {
          setBusData(newBusData);
          prevBusDataStringRef.current = newBusDataString;
        }
      } else {
        await getBusApiData();
      }
    };

    // 초기 데이터 로드
    fetchData();

    // 10초마다 폴링
    timerId = setInterval(fetchData, 10000);
    return () => clearInterval(timerId);
  }, [test, getBusApiData]);

  return [test ? busData : busApiData];
};

export default useGetBusDataHandler;
