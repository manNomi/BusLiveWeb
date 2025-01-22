import { NavermapsProvider } from "react-naver-maps";
import React, { useEffect } from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import STYLE from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";
import BusMarkers from "../Bus/BusMarkers";
import Aside from "../Aside";
import TestBusMarkers from "../Bus/TestBusMarker";
import useCheckAtom from "../../../../4_Shared/recoil/useCheckAtom";

const MapPage = () => {
  const [check] = useCheckAtom();
  return (
    <>
      <Aside />
      <STYLE.Container>
        <MapDiv style={{ width: "100%", height: "90vh" }}>
          <NaverMap
            center={{ lat: 37.450284, lng: 126.653478 }}
            minZoom={10}
            maxZoom={18}
            zoom={13}>
            {check.test ? <TestBusMarkers /> : <BusMarkers />}
            <Markers />
          </NaverMap>
        </MapDiv>
      </STYLE.Container>
    </>
  );
};

export default MapPage;
