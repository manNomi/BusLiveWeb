import React, { useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import OLMapComponent from "../OLMap";

const GoogleMapDiv = ({ center, zoom, setCenter, setZoom }) => {
  const googleMapRef = useRef(null);

  // OpenLayers 같은 커스텀 맵 동기화 핸들러
  const handleOLMapChange = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);

    if (googleMapRef.current) {
      googleMapRef.current.panTo(newCenter);
      googleMapRef.current.setZoom(newZoom);
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "90vh",
    position: "relative",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={mapContainerStyle}>
        {/* Google Map */}
        <GoogleMap
          ref={googleMapRef}
          center={center}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => {
            googleMapRef.current = map;
          }}
        />
        <OLMapComponent
          center={center}
          zoom={zoom}
          onMapChange={handleOLMapChange}
        />
      </div>
    </LoadScript>
  );
};

export default GoogleMapDiv;
