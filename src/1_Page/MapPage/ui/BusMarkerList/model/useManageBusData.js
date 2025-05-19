import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useManageBusData = (busData, nodeListData) => {
  const [disPlayBusPoint, setDisPlayBusPoint] = useState([]);
  const [isBusDataUpdated, setIsBusDataUpdated] = useState(false);
  const { id: busStopId } = useParams();
  const [check] = useCheckAtom();

  const intervalRef = useRef(null);

  const moveBusEvent = useCallback(() => {
    const speed = 10;
    // 이미 interval이 실행 중이라면 새로 설정하지 않음
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setDisPlayBusPoint((prevBus) =>
        prevBus.map((busLocation) => {
          const nextNode = nodeListData.find(
            (node) => node.lastNode === parseInt(busLocation.lastNode) + 1
          );
          if (!nextNode) {
            return {
              ...busLocation,
              lastNode: nodeListData[0].lastNode,
              lat: nodeListData[0].lat,
              lng: nodeListData[0].lng,
            };
          }

          const distance = getDistanceInMeters(
            nextNode.lat,
            nextNode.lng,
            busLocation.lat,
            busLocation.lng
          );

          if (distance < 5) {
            return {
              ...busLocation,
              lat: nextNode.lat,
              lng: nextNode.lng,
              lastNode: busLocation.lastNode,
            };
          }

          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;
          const timeToNextNode = distance / speed;
          const frameRate = 100;
          const step = frameRate / (timeToNextNode * 1000);

          return {
            ...busLocation,
            lat: busLocation.lat + x * step,
            lng: busLocation.lng + y * step,
          };
        })
      );
    }, 100);

    // interval 정리 함수 반환
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [setDisPlayBusPoint, nodeListData]);

  useEffect(() => {
    if (busData) {
      setDisPlayBusPoint((prevBus) => {
        if (prevBus.length === 0) {
          setIsBusDataUpdated(true);
          return busData;
        }

        let isUpdated = false;
        const updatedBus = prevBus.map((busLocation, index) => {
          const newBusData = busData[index];
          if (!newBusData) return busLocation;

          if (Number(busLocation.lastNode) !== Number(newBusData.lastNode)) {
            isUpdated = true;
            return { ...busLocation, ...newBusData };
          }

          return busLocation;
        });

        if (isUpdated) setIsBusDataUpdated(true);

        return updatedBus;
      });
    }
  }, [busData]);

  useEffect(() => {
    if (isBusDataUpdated && disPlayBusPoint.length > 0) {
      moveBusEvent();
      setIsBusDataUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBusDataUpdated, check.test, disPlayBusPoint]);

  const setClickBusOnly = (busList) => {
    if (!busStopId || !Array.isArray(busList) || busList.length === 0) {
      return null;
    }
    const candidates = busList.filter(
      (item) => item.lastNode < parseInt(busStopId)
    );

    if (candidates.length === 0) {
      return null; // 필터 결과가 없는 경우
    }

    candidates.sort((a, b) => b.lastNode - a.lastNode);
    return candidates[0];
  };

  const closestBusLocation =
    busStopId && disPlayBusPoint.length > 0
      ? setClickBusOnly(disPlayBusPoint)
      : null;

  return { disPlayBusPoint, closestBusLocation };
};

const getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
export default useManageBusData;
