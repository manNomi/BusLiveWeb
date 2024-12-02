import React from "react";
import useBusMarkersLogic from "./useBusMarkerLogic";

const BusMarkersOL = ({ mapInstance, vectorSource }) => {
  const { loading, error } = useBusMarkersLogic(mapInstance, vectorSource);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return null;
};

export default BusMarkersOL;
