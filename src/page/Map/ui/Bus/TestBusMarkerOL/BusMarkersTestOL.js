import React from "react";
import useBusMarkersTestLogic from "./useBusMarkersTestLogic";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../entities/Bus/useTestBusData";
import { useParams } from "react-router-dom";

const BusMarkersTestOL = ({ mapInstance, vectorSource }) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();
  const { id: busStopId } = useParams();

  useBusMarkersTestLogic(
    mapInstance,
    vectorSource,
    bus,
    setBus,
    resetBusData,
    moveBusEvent,
    busData,
    busStopId
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  return null;
};

export default BusMarkersTestOL;
