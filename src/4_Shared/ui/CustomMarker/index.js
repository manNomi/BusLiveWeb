import { Marker } from "react-naver-maps";
import React from "react";

import { convertBusMarker } from "./lib/convertMarker";

const CustomMarker = React.memo(
  ({ lat, lng, Icon, width = `40px`, height = `40px`, color }) => {
    const converTedIcon = React.useMemo(
      () => convertBusMarker(color, Icon, width, height),
      [Icon]
    );

    return (
      <Marker
        position={new window.naver.maps.LatLng(lat, lng)}
        icon={{ content: converTedIcon }}
      />
    );
  }
);

export default CustomMarker;
