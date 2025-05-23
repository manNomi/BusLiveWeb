import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { BUS_STOP_LOCATION } from "../../4_Shared/mock/busStop511/BUS_STOP_LOCATION";
import { NODE_LOCATION } from "../../4_Shared/mock/busStop511/NODE_LOCATION";

export const useGetBusStopData = (busId) => {
  const [busStopData, setBusStopData] = React.useState([]);
  const [serverState, request] = useFetchData();
  const endpoint = process.env.REACT_APP_API_URL + "/bus/busStop/time";

  React.useEffect(() => {
    if (busId == null) return;
    // 현재 511 번 api 미구현으로 constant 값으로 대체
    if (busId === 511) {
      setBusStopData({ node: NODE_LOCATION, busStop: BUS_STOP_LOCATION });
      return;
    }
    const url = `${endpoint}?busId=${busId}`;
    request("GET", url);
  }, [busId, request, endpoint]);

  React.useEffect(() => {
    if (serverState?.status) {
      switch (serverState.status) {
        case 200:
          setBusStopData(serverState.data);
          break;
        case 400:
          console.error("잘못된 요청입니다.");
          break;
        case 500:
          console.error("서버 오류입니다.");
          break;
        default:
          console.error("알 수 없는 오류입니다.");
      }
    }
  }, [serverState]);

  return [busStopData];
};

export default useGetBusStopData;
