import BusStopIcon from "../../../../4_Shared/assets/BusIcon";
import BusIconLast from "../../../../4_Shared/assets/BusStopIconLast";
import CustomMarker from "../../../../4_Shared/ui/CustomMarker";

import useGetBusDataHandler from "./model/useGetBusDataHandler";
import useManageBusData from "./model/useManageBusData";

const BusMarkerList = (props) => {
  const { nodeListData } = props;

  const [busData] = useGetBusDataHandler(); // 10초에 한번씩 호출
  const { disPlayBusPoint, closestBusLocation } = useManageBusData(
    busData,
    nodeListData
  );

  return (
    <>
      {closestBusLocation ? (
        <CustomMarker
          lat={closestBusLocation.lat}
          lng={closestBusLocation.lng}
          icon={BusIconLast}
        />
      ) : (
        disPlayBusPoint
          .filter((bus) => bus?.lat && bus?.lng) // 유효한 좌표만 필터링
          .map((busLocation) => (
            <CustomMarker
              key={busLocation.id || `${busLocation.lat}-${busLocation.lng}`} // 고유한 키 적용
              lat={busLocation.lat}
              lng={busLocation.lng}
              icon={BusStopIcon}
            />
          ))
      )}
    </>
  );
};

export default BusMarkerList;
