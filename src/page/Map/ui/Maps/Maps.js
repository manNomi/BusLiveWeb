import React, { useState } from "react";
import Style from "./style";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
import DirectionsModal from "../Direction/Direction";
import Aside from "../aside";
import Advertise from "../Advertise";
import useMapAPI from "../../../../shared/recoil/useMap";
import NaverMapDiv from "./NaverMap";
import GoogleMap from "./GoogleMap";
import KakaoMapDiv from "./KakaoMap";
import DefalutMap from "./DefaultMap";

const Maps = () => {
  const [center, setCenter] = useState({ lat: 37.450284, lng: 126.653478 });
  const [zoom, setZoom] = useState(13);
  const [map] = useMapAPI();
  const [check, setCheck] = useCheckAtom();

  return (
    <>
      <Aside />
      <Style.Container>
        {map === "Naver" && (
          <NaverMapDiv
            center={center}
            zoom={zoom}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )}
        {map === "Google" && (
          <GoogleMap
            center={center}
            zoom={zoom}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )}
        {map === "Kakao" && (
          <KakaoMapDiv
            center={center}
            zoom={zoom}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )}
        {map === "Default" && (
          <DefalutMap
            center={center}
            zoom={zoom}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )}
      </Style.Container>
      <DirectionsModal
        isOpen={check.direction && check.route}
        onClose={() => setCheck("both_click")}
      />
      <Advertise />
    </>
  );
};

export default Maps;
