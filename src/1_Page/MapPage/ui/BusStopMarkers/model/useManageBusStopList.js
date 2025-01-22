import { useEffect, useState } from "react";

import BUS_STOP_CONFIG from "../config/busStopConfig";

import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useManageBusStopList = (busStopListData) => {
  const [disPlayBusStopList, setDisplayBusStop] = useState(null);
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

  // 특정 방향의 버스 필터링
  const filterBusStops = (threshold, type) => {
    const filteredStops = busStopListData.filter((busStation) =>
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

  // 특정 방향의 버스 정류장 제거
  const removeBusStops = (threshold, direction) => {
    setDisplayBusStop((busStopList) =>
      busStopList.filter((busStop) =>
        direction === "up"
          ? busStop.lastNode < threshold
          : busStop.lastNode >= threshold
      )
    );
  };

  return { disPlayBusStopList };
};

export default useManageBusStopList;
