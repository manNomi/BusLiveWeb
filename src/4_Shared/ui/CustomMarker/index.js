import React from "react";
import { Marker } from "react-naver-maps";
import { convertMarker } from "./lib/convertMarker";

const CustomMarker = React.memo(
  ({ lat, lng, icon: Icon, width = "40px", height = "40px", color }) => {
    const convertedIcon = React.useMemo(
      () => convertMarker(color, Icon, width, height),
      [Icon, color, width, height]
    );

    return (
      <Marker
        position={new window.naver.maps.LatLng(lat, lng)}
        icon={{ content: convertedIcon }}
      />
    );
  }
);

export default CustomMarker;
