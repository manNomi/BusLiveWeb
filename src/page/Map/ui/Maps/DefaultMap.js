import React from "react";
import OLMapComponent from "./OLMap";

const DefaultMap = ({ center, zoom, setCenter, setZoom }) => {
  console.log("asd");
  // OpenLayers 맵 변경 핸들러
  const handleOLMapChange = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);
  };

  return (
    <div
      id="ol-map"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: "#f0f0f0", // 디버깅용 배경색
      }}>
      <OLMapComponent
        center={center}
        zoom={zoom}
        onMapChange={handleOLMapChange}
        opacity={1}
      />
    </div>
  );
};

export default DefaultMap;
