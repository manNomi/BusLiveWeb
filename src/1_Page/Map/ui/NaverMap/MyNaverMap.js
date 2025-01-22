import React, { useEffect } from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import Style from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";
import BusMarkers from "../Bus/BusMarkers";
import Aside from "../Aside";
import TestBusMarkers from "../Bus/TestBusMarker";
import useCheckAtom from "../../../../4_Shared/recoil/useCheckAtom";

const MyNaverMap = () => {
  const [check, setCheck] = useCheckAtom();
  const [option, setOptionEvent] = useMapOptions();

  useEffect(() => {
    setOptionEvent({
      minZoom: 10,
      maxZoom: 18,
      center: { lat: 37.450284, lng: 126.653478 },
    });
  }, []);

  return (
    <>
      <Aside />
      <Style.Container>
        <MapDiv style={{ width: "100%", height: "90vh" }}>
          <NaverMap
            center={option.center}
            minZoom={option.minZoom}
            maxZoom={option.maxZoom}
            zoom={13}>
            {check.test ? <TestBusMarkers /> : <BusMarkers />}
            <Markers />
          </NaverMap>
        </MapDiv>
      </Style.Container>
    </>
  );
};

export default MyNaverMap;
