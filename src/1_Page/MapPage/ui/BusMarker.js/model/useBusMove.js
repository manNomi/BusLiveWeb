import { useCallback, useState, useRef } from "react";
import { nodeLocation } from "../../../../../3_Entities/Bus/busLocationData";

const useBusMove = (setBus) => {
  const intervalRef = useRef(null);

  const setBusAdd = (data) => {
    setBus(data);
  };

  const resetBusData = () => {
    setBus([]);
    // 리셋 시 interval 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const moveBusEvent = useCallback(() => {
    const speed = 5; // 고정된 속도 (m/s)

    // 이미 interval이 실행 중이라면 새로 설정하지 않음
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          const nextNode = nodeLocation.find(
            (node) => node.lastNode === parseInt(busLocation.lastNode) + 1
          );

          if (!nextNode) {
            return {
              ...busLocation,
              lastNode: nodeLocation[0].lastNode,
              lat: nodeLocation[0].lat,
              lng: nodeLocation[0].lng,
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
  }, [setBus]);

  return [setBusAdd, resetBusData, moveBusEvent];
};

// Haversine 공식으로 두 지점 간의 거리 계산 (미터 단위)
function getDistanceInMeters(lat1, lng1, lat2, lng2) {
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
}

export default useBusMove;
