import React from "react";
import OLMapComponent from "../OLMap";

const DefaultMap = ({ center, zoom, setCenter, setZoom }) => {
  // OpenLayers 맵 변경 핸들러
  const handleOLMapChange = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);
  };

  return (
    <div style={{ width: `100%`, height: `100%` }}>
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
