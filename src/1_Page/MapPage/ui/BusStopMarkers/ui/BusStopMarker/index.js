import { Marker } from "react-naver-maps";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import BusStopInfo from "../BusStop";

const BusStopMarker = (props) => {
  const { stopData } = props;
  const [isBusInfoVisible, toggleBusInfo] = useToggleState();
  return (
    <>
      <Marker position={stopData.busPoint} onClick={toggleBusInfo} />
      {isBusInfoVisible && (
        <BusStopInfo stopData={stopData} onClose={toggleBusInfo} />
      )}
    </>
  );
};
export default BusStopMarker;
