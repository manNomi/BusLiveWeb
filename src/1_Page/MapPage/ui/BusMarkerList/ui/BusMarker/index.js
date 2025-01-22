import { Marker } from "react-naver-maps";
import React from "react";
// 개별 버스 마커 컴포넌트 (리렌더링 방지)
const BusMarker = React.memo(({ lat, lng, icon }) => (
  <Marker
    position={new window.naver.maps.LatLng(lat, lng)}
    icon={{ content: icon }}
  />
));

export default BusMarker;
