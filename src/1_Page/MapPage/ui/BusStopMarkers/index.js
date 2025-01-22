import React from "react";
import { Marker } from "react-naver-maps";

import useGetBusStopListData from "./model/useGetBusStopListData";

import useManageBusStopList from "./model/useManageBusStopList";

const BusStopMarkers = (props) => {
  const { setBusStopData } = props;

  const { busStopListData } = useGetBusStopListData();

  const { disPlayBusStopList } = useManageBusStopList(busStopListData);

  return (
    <>
      {disPlayBusStopList.map((stopData, index) => (
        <Marker
          key={index}
          position={stopData.busPoint}
          onClick={() => {
            setBusStopData(stopData);
          }}
        />
      ))}
    </>
  );
};

export default BusStopMarkers;
