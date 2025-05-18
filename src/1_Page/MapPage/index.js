import { NaverMap, Container as MapContainer } from "react-naver-maps";
import STYLE from "./style";
import useGetBusStopData from "../../3_Entities/Bus/useGetBusStopData";

import NodeMarkers from "./ui/NodeMarkers";
import BusStopMarkers from "./ui/BusStopMarkers";
import BusMarkerList from "./ui/BusMarkerList";
import Aside from "./ui/Aside";

const MapPage = () => {
  const [busStopData] = useGetBusStopData(511);

  return (
    <>
      <Aside />
      <STYLE.Container>
        <MapContainer style={{ width: "100%", height: "100vh" }}>
          <NaverMap
            center={{ lat: 37.450284, lng: 126.653478 }}
            minZoom={10}
            maxZoom={18}
            zoom={13}>
            <BusStopMarkers busStopListData={busStopData.busStop} />
          </NaverMap>
        </MapContainer>
      </STYLE.Container>
    </>
  );
};

export default MapPage;
