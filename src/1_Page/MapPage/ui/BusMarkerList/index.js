import React, { useEffect, useMemo } from "react";
import ReactDOMServer from "react-dom/server";

import busIcon from "../../assets/bus.svg";
import BusStopIcon from "../../assets/BusIcon";
import BusStopIconLast from "../../assets/BusIconLast";

import BusMarker from "./ui/BusMarker";

import useGetBusData from "./model/useGetBusData";
import useManageBusData from "./model/useManageBusData";

// 마커 아이콘을 메모이제이션 처리
const getBusMarkerIcon = (congestion, lastbusyn) => {
  return ReactDOMServer.renderToString(
    lastbusyn === 1 ? (
      <BusStopIconLast color={congestion} width={40} height={40} />
    ) : (
      <BusStopIcon color={congestion} width={40} height={40} />
    )
  );
};

const BusMarkerList = (props) => {
  const { nodeListData } = props;

  const { busData } = useGetBusData(); // 10초에 한번씩 호출
  const { disPlayBusPoint, closestBusLocation } = useManageBusData(
    busData,
    nodeListData
  );

  // 가까운 버스 위치 마커 아이콘 메모이제이션
  const closestBusIcon = useMemo(() => {
    if (!closestBusLocation) return null;
    return getBusMarkerIcon(
      closestBusLocation.congestion,
      closestBusLocation.lastbusyn
    );
  }, [closestBusLocation]);

  return (
    <>
      {closestBusLocation ? (
        <BusMarker
          lat={closestBusLocation.lat}
          lng={closestBusLocation.lng}
          icon={closestBusIcon}
        />
      ) : (
        disPlayBusPoint
          .filter((bus) => bus?.lat && bus?.lng) // 유효한 좌표만 필터링
          .map((busLocation) => (
            <BusMarker
              key={busLocation.id || `${busLocation.lat}-${busLocation.lng}`} // 고유한 키 적용
              lat={busLocation.lat}
              lng={busLocation.lng}
              icon={`<img src="${busIcon}" width="20" height="20" />`}
            />
          ))
      )}
    </>
  );
};

export default React.memo(BusMarkerList);
