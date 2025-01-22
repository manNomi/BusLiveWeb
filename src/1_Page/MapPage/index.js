import React from "react";
import { NaverMap, Container as MapContainer } from "react-naver-maps";

import STYLE from "./style";

import useGetBusStopNodeList from "./model/useGetBusStopNodeList";

import NodeMarkers from "./ui/NodeMarkers";
import BusStopMarkers from "./ui/BusStopMarkers";

import BusMarkerList from "./ui/BusMarkerList";
import Aside from "./ui/Aside";

const MapPage = () => {
  const { nodeListData } = useGetBusStopNodeList();

  return (
    <>
      <Aside />
      <STYLE.Container>
        <MapContainer style={{ width: "100%", height: "90vh" }}>
          <NaverMap
            center={{ lat: 37.450284, lng: 126.653478 }}
            minZoom={10}
            maxZoom={18}
            zoom={13}>
            <BusMarkerList nodeListData={nodeListData} />
            <NodeMarkers nodeListData={nodeListData} />
            <BusStopMarkers />
          </NaverMap>
        </MapContainer>
      </STYLE.Container>
    </>
  );
};

export default MapPage;
