import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import OLMapComponent from "./OLMap";

const KakaoMapDiv = ({ center, zoom, setCenter, setZoom }) => {
  const [kakaoZoom, setKakaoZoom] = useState(zoom);

  const zoomToLevel = (zoom) => Math.max(1, 14 - zoom); // 일반 Zoom → Kakao Level
  const levelToZoom = (level) => Math.max(1, 14 - level); // Kakao Level → 일반 Zoom

  const handleCenterChange = (map) => {
    const lat = map.getCenter().getLat();
    const lng = map.getCenter().getLng();
    setCenter({ lat, lng });
  };

  const handleZoomChange = (map) => {
    const newLevel = map.getLevel();
    setZoom(levelToZoom(newLevel));
    setKakaoZoom(newLevel);
  };

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      {/* Kakao Map */}
      <Map
        center={center}
        level={zoomToLevel(kakaoZoom)}
        style={{ width: "100%", height: "100%" }}
        onCenterChanged={handleCenterChange}
        onZoomChanged={handleZoomChange}>
        <MapMarker position={center}>
          <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
        </MapMarker>
      </Map>

      {/* OpenLayers 맵 컨테이너 */}
      <div
        id="ol-map"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}>
        <OLMapComponent
          center={center}
          zoom={zoom}
          onMapChange={(newCenter, newZoom) => {
            setCenter(newCenter);
            setZoom(newZoom);
          }}
        />
      </div>
    </div>
  );
};

export default KakaoMapDiv;
