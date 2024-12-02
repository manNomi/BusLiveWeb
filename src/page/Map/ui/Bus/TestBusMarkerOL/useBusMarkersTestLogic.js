import { useEffect, useCallback } from "react";
import { initializeVectorLayer } from "../Util/vectorLayoutUtil";
import { updateMarkers, addClosestBusMarker } from "..Util/markerUtils";
import createBusFeature from "./createBusFeature";

const useBusMarkersTestLogic = (
  mapInstance,
  vectorSource,
  bus,
  setBus,
  resetBusData,
  moveBusEvent,
  busData,
  busStopId
) => {
  useEffect(
    () => initializeVectorLayer(mapInstance, vectorSource),
    [mapInstance, vectorSource]
  );

  const getClosestBus = useCallback(() => {
    if (!bus || !busStopId) return null;

    const candidates = bus.filter(
      (item) => item.lastNode < parseInt(busStopId, 10)
    );
    candidates.sort((a, b) => b.lastNode - a.lastNode);
    return candidates[0] || null;
  }, [bus, busStopId]);

  const closestBus = getClosestBus();

  useEffect(() => {
    if (closestBus) {
      addClosestBusMarker(closestBus, vectorSource, createBusFeature);
    } else {
      updateMarkers(bus, vectorSource, createBusFeature);
    }
  }, [closestBus, bus, vectorSource]);

  useEffect(() => {
    if (busData?.length > 0) {
      setBus(busData);
    } else {
      resetBusData();
    }
  }, [busData]);

  useEffect(() => {
    const stopMoving = moveBusEvent();
    return () => stopMoving();
  }, [moveBusEvent]);

  return {};
};

export default useBusMarkersTestLogic;
