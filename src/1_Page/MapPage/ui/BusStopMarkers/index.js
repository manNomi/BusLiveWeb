import BusStopMarker from "./ui/BusStopMarker";

import useManageBusStopList from "./model/useManageBusStopList";

const BusStopMarkers = (props) => {
  const { busStopListData } = props;

  const { disPlayBusStopList } = useManageBusStopList(busStopListData);

  return (
    <>
      {disPlayBusStopList.map((stopData, index) => (
        <BusStopMarker key={index} stopData={stopData} />
      ))}
    </>
  );
};

export default BusStopMarkers;
