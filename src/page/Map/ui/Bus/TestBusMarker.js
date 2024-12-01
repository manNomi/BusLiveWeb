import React, { useRef, useEffect } from "react";
import OpenLayersMap from "./OLMap";
import MarkerManager from "./MarkerManager";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../entities/Bus/useTestBusData";
import VectorSource from "ol/source/Vector";

const TestBusMarkers = () => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    if (vectorSourceRef.current) {
      const features = vectorSourceRef.current.getFeatures();
      console.log("Features in vectorSourceRef:", features);
      if (features.length === 0) {
        console.warn("No features found in vectorSourceRef");
      }
    } else {
      console.error("vectorSourceRef.current is null or undefined");
    }
  }, [bus, vectorSourceRef.current]);

  // 버스 데이터 설정
  useEffect(() => {
    if (busData) {
      setBus(busData);
    }
  }, [busData, setBus]);

  // 이동 이벤트 실행
  useEffect(() => {
    const stopMoving = moveBusEvent(); // 이동 이벤트 시작
    return () => stopMoving(); // 이동 이벤트 정리
  }, [moveBusEvent]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <OpenLayersMap vectorSource={vectorSourceRef.current} />
      <MarkerManager
        vectorSource={vectorSourceRef.current}
        busLocations={bus}
      />
    </div>
  );
};

export default TestBusMarkers;
