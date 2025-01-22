import { useEffect, useState } from "react";

import BUS_STOP_CONFIG from "../config/busStopConfig";

import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useManageBusStopList = (busStopListData) => {
  const [disPlayBusStopList, setDisplayBusStop] = useState([]);
  const [check] = useCheckAtom();

  useEffect(() => {
    setDisplayBusStop(busStopListData);
  }, [busStopListData]);

  useEffect(() => {
    if (check.low) {
      filterBusStops(BUS_STOP_CONFIG.LOW_THRESHOLD, "low");
    } else {
      handleBusDirection(BUS_STOP_CONFIG.DIRECTION.DOWN);
    }
  }, [check.low]);

  useEffect(() => {
    if (check.high) {
      filterBusStops(BUS_STOP_CONFIG.HIGH_THRESHOLD, "high");
    } else {
      handleBusDirection(BUS_STOP_CONFIG.DIRECTION.UP);
    }
  }, [check.high]);

  const filterBusStops = (threshold, type) => {
    // busStopListData가 배열이 아닌 경우 빈 배열을 기본값으로 설정
    const filteredStops = (
      Array.isArray(busStopListData) ? busStopListData : []
    ).filter((busStation) =>
      type === "low"
        ? busStation.lastNode < threshold
        : busStation.lastNode >= threshold
    );
    setDisplayBusStop((prev) => [...prev, ...filteredStops]);
  };

  // 버스 방향에 따른 제거 처리
  const handleBusDirection = (direction) => {
    if (direction === BUS_STOP_CONFIG.DIRECTION.UP) {
      removeBusStops(BUS_STOP_CONFIG.LOW_THRESHOLD, "up");
    }
    if (direction === BUS_STOP_CONFIG.DIRECTION.DOWN) {
      removeBusStops(BUS_STOP_CONFIG.HIGH_THRESHOLD, "down");
    }
  };

  const removeBusStops = (threshold, direction) => {
    setDisplayBusStop((busStopList) =>
      Array.isArray(busStopList)
        ? busStopList.filter((busStop) =>
            direction === "up"
              ? busStop.lastNode < threshold
              : busStop.lastNode >= threshold
          )
        : []
    );
  };

  return { disPlayBusStopList };
};

export default useManageBusStopList;
