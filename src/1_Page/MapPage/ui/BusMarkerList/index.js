import React, { useMemo } from "react";
import ReactDOMServer from "react-dom/server";

import BusIcon from "./assets/YellowBusIcon";
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

const BusMarkerList = ({ nodeListData }) => {
  const { busData } = useGetBusData(); // 10초에 한 번씩 호출
  const { disPlayBusPoint, closestBusLocation } = useManageBusData(
    busData,
    nodeListData
  );

  // 가까운 버스 마커 아이콘 메모이제이션
  const closestBusIcon = useMemo(() => {
    if (!closestBusLocation) return null;
    return getBusMarkerIcon(
      closestBusLocation.congestion,
      closestBusLocation.lastbusyn
    );
  }, [closestBusLocation]);

  // 버스 아이콘을 메모이제이션하여 중복 생성 방지
  const busIconHtml = useMemo(() => {
    return (color) =>
      ReactDOMServer.renderToString(
        <BusIcon width={20} height={20} color={color} />
      );
  }, []);

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
              icon={
                busIconHtml(busLocation.congestion)
                  ? `data:image/svg+xml,${encodeURIComponent(
                      busIconHtml(busLocation.congestion)
                    )}`
                  : "/icons/default-bus.svg"
              }
            />
          ))
      )}
    </>
  );
};

export default React.memo(BusMarkerList);
