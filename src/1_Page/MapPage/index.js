import React from "react";
import { NaverMap, Container as MapContainer } from "react-naver-maps";

import STYLE from "./style";

import NodeMarkers from "./ui/NodeMarkers";
import BusStopMarkers from "./ui/BusStopMarkers";
import TestBusMarkers from "./ui/TestBusMarker";
import BusMarkers from "./ui/BusMarkers";
import Aside from "./ui/Aside";

import useCheckAtom from "../../4_Shared/recoil/useCheckAtom";

const MapPage = () => {
  const [check] = useCheckAtom();
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
            {check.test ? <TestBusMarkers /> : <BusMarkers />}
            <NodeMarkers />
            <BusStopMarkers />
          </NaverMap>
        </MapContainer>
      </STYLE.Container>
    </>
  );
};

export default MapPage;
