import React, { useMemo } from "react";

import useGetBusDataHandler from "./model/useGetBusDataHandler";
import useManageBusData from "./model/useManageBusData";
import { Marker } from "react-naver-maps";
import { getBusMarker } from "./util/getBusMarker";

/* main */
const BusMarkerList = ({ nodeListData }) => {
  const [busData] = useGetBusDataHandler();
  const { disPlayBusPoint, closestBusLocation } = useManageBusData(
    busData,
    nodeListData
  );

  // 마커 렌더링을 메모이제이션
  const markers = useMemo(() => {
    if (closestBusLocation) {
      return (
        <Marker
          position={
            new window.naver.maps.LatLng(
              closestBusLocation.lat,
              closestBusLocation.lng
            )
          }
          icon={{
            content: getBusMarker(
              closestBusLocation.congestion,
              closestBusLocation.lastbusyn
            ),
          }}
        />
      );
    }

    return disPlayBusPoint.map((b) => (
      <Marker
        key={b.id || `${b.lat}-${b.lng}`}
        position={new window.naver.maps.LatLng(b.lat, b.lng)}
        icon={{
          content: getBusMarker(b.congestion, b.lastbusyn),
        }}
      />
    ));
  }, [closestBusLocation, disPlayBusPoint]);

  return <>{markers}</>;
};

export default React.memo(BusMarkerList);
