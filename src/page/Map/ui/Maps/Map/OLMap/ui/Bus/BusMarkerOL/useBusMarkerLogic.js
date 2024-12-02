import { useEffect, useCallback, useState } from "react";
import { initializeVectorLayer } from "../Util/vectorLayoutUtil";
import { updateMarkers, addClosestBusMarker } from "../Util/markerUtil";
import useBusData from "../../../../../../../../../entities/Bus/useBusData";
import useBus from "../../../../../../../model/useBus";
import { useParams } from "react-router-dom";
import createBusFeature from "../Util/CreateBusFeature";

const useBusMarkersLogic = (mapInstance, vectorSource) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useBus();
  const [busData, loading, error] = useBusData();
  const [isBusDataUpdated, setIsBusDataUpdated] = useState(false);

  useEffect(() => {
    initializeVectorLayer(mapInstance, vectorSource);
  }, [mapInstance, vectorSource]);

  const getClosestBus = useCallback(() => {
    if (!bus?.length || !busData?.busStopId) return null;

    const busStopId = parseInt(busData.busStopId, 10);
    if (isNaN(busStopId)) return null; // busStopId 유효성 검사

    const candidates = bus.filter((item) => {
      const lastNode = parseInt(item.lastNode, 10);
      return !isNaN(lastNode) && lastNode < busStopId;
    });

    if (candidates.length === 0) return null;

    // 내림차순 정렬 후 가장 큰 lastNode를 가진 항목 반환
    return candidates.sort((a, b) => b.lastNode - a.lastNode)[0];
  }, [bus, busData]);

  const closestBus = getClosestBus();

  useEffect(() => {
    if (closestBus) {
      vectorSource.clear();
      const feature = createBusFeature(
        closestBus.lat,
        closestBus.lng,
        closestBus.angle,
        0.2,
        3 // 색상 코드로 예시
      );
      vectorSource.addFeature(feature); // 가장 가까운 버스 마커 추가
    } else {
      updateMarkers(bus, vectorSource); // 모든 버스 마커 추가
    }
  }, [closestBus, bus, vectorSource]);

  useEffect(() => {
    if (busData?.data) {
      setBus((prevBus) => {
        const updatedBus =
          prevBus.length === 0
            ? busData.data
            : prevBus.map((busLocation, index) => {
                const newBusData = busData.data[index];
                return newBusData &&
                  busLocation.lastNode !== newBusData.lastNode
                  ? { ...busLocation, ...newBusData }
                  : busLocation;
              });
        setIsBusDataUpdated(true);
        return updatedBus;
      });
    }
  }, [busData, setBus]);

  useEffect(() => {
    if (isBusDataUpdated) {
      moveBusEvent(); // 버스 이동 이벤트
      setIsBusDataUpdated(false);
    }
  }, [isBusDataUpdated, moveBusEvent]);

  return { loading, error };
};

export default useBusMarkersLogic;
