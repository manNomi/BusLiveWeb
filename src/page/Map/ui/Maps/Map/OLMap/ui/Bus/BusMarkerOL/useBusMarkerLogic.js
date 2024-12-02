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

  useEffect(
    () => initializeVectorLayer(mapInstance, vectorSource),
    [mapInstance, vectorSource]
  );

  const getClosestBus = useCallback(() => {
    if (!bus?.length || !busData?.busStopId) return null;

    const candidates = bus.filter(
      (item) => item.lastNode < parseInt(busData.busStopId, 10)
    );
    candidates.sort((a, b) => b.lastNode - a.lastNode);
    return candidates[0] || null;
  }, [bus, busData]);

  const closestBus = getClosestBus();

  useEffect(() => {
    if (closestBus) {
      addClosestBusMarker(closestBus, vectorSource);
    } else {
      updateMarkers(bus, vectorSource);
    }
  }, [closestBus, bus, vectorSource]);

  const busStopId = useParams("id").id;
  // busStopId가 있을 때 가장 가까운 버스 정류장 선택
  const setBusOnly = (bus) => {
    const candidates = bus.filter(
      (item) => item.lastNode < parseInt(busStopId)
    );
    candidates.sort((a, b) => b.lastNode - a.lastNode); // 내림차순 정렬
    return candidates[0]; // 가장 큰 lastNode를 가진 항목 반환
  };
  const closestBusLocation = busStopId ? setBusOnly(bus) : null;

  useEffect(() => {
    if (closestBus) {
      vectorSource.clear();
      const feature = createBusFeature(
        closestBus.lat,
        closestBus.lng,
        closestBus.angle,
        0.2,
        0.2
      );
      vectorSource.addFeature(feature);
    } else {
      updateMarkers();
    }
  }, [closestBus, vectorSource, updateMarkers]);

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
  }, [busData]);

  useEffect(() => {
    if (isBusDataUpdated) {
      moveBusEvent();
      setIsBusDataUpdated(false);
    }
  }, [isBusDataUpdated]);

  return { loading, error };
};

export default useBusMarkersLogic;
