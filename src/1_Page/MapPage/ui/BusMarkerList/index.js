import React from "react";

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

  return (
    <>
      {closestBusLocation ? (
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
      ) : (
        disPlayBusPoint.map((b) => (
          <Marker
            key={b.id || `${b.lat}-${b.lng}`}
            position={new window.naver.maps.LatLng(b.lat, b.lng)}
            icon={{
              content: getBusMarker(b.congestion, b.lastbusyn),
            }}
          />
        ))
      )}
    </>
  );
};

export default React.memo(BusMarkerList);
