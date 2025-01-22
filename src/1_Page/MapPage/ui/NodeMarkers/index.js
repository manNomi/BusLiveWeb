import React from "react";
import { Marker } from "react-naver-maps";

import useGetBusStopNodeList from "./model/useGetBusStopNodeList";

import useManageNodeList from "./model/useManageNodeList";

const NodeMarkers = () => {
  const { nodeListData } = useGetBusStopNodeList();

  const { nodeDataList } = useManageNodeList(nodeListData);

  return (
    <>
      {nodeDataList.map((data, index) => (
        <Marker key={index} position={{ lat: data.lat, lng: data.lng }} />
      ))}
    </>
  );
};

export default NodeMarkers;
