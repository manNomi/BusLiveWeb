import { Marker } from "react-naver-maps";

import useManageBusStopList from "./model/useManageBusStopList";

const BusStopMarkers = (props) => {
  const { busStopListData } = props;

  const { disPlayBusStopList } = useManageBusStopList(busStopListData);

  return (
    <>
      {disPlayBusStopList.map((stopData, index) => (
        <Marker key={index} position={stopData.busPoint} />
      ))}
    </>
  );
};

export default BusStopMarkers;
