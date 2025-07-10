import React, { useMemo, useCallback } from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import useCheckAtom from "../../4_Shared/recoil/useCheckAtom";

const useGetBusData = () => {
  const [busData, setBusData] = React.useState([]);
  const [serverState, request] = useFetchData();
  const [, setCheckTypeEvent] = useCheckAtom();
  const endpoint = useMemo(() => process.env.REACT_APP_API_URL + "/bus", []);

  const getBusData = useCallback(() => {
    request("GET", endpoint);
  }, [request, endpoint]);

  React.useEffect(() => {
    if (serverState?.status) {
      switch (serverState.status) {
        case 200:
          setBusData(serverState.data);
          break;

        default:
          setCheckTypeEvent("test");
          console.error("알 수 없는 오류입니다.");
      }
    }
  }, [serverState, setCheckTypeEvent]);

  return [busData, getBusData];
};

export default useGetBusData;
