import { useEffect, useState } from "react";

import useNodeInit from "../../Markers/model/useManageNodeList";

import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";
import usePageChange from "../../../../4_Shared/model/usePageChange";

import useBusMove from "../../BusMarker.js/model/useBusMove";
import useTestBusMove from "../../BusMarker.js/model/useTestBusMove";

import useGetBusData from "../../BusMarker.js/model/useGetBusData";

import handleMarkerClick from "../BusStop/markerClick";
import { useMap } from "react-naver-maps";

const useMarkers = () => {
  const [busStopData, setBusStopData] = useState(null);

  useEffect(() => {
    if (!busStopData) return;
    setBusID(busStopData.busStopId);
  }, [busStopData]);

  // useEffect(() => {
  //   if (retroBusStopData !== "" && retroBusStopData) {
  //     handleMarkerClick(
  //       busStopData,
  //       map,
  //       changePage,
  //       setBus,
  //       setTestBus,
  //       retroBusStopData.restTimeText,
  //       setBusID
  //     );
  //   }
  // }, [retroBusStopData]);

  return {
    nodeData,
    setBusStopData,
  };
};

export default useMarkers;
