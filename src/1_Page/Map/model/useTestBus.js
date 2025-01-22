import { useState } from "react";
import { nodeLocation } from "../../../entities/Bus/BusLocationData";

const useTestBus = () => {
  const [bus, setBus] = useState([]);

  const setBusAdd = (data) => {
    setBus(data);
  };

  const resetBusData = () => {
    setBus([]);
  };

  const moveBusEvent = () => {
    const speed = 10; // 고정된 속도 (m/s)
    const intervalId = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          // 버스마다의 nextNode 찾기
          const nextNode = nodeLocation.find(
            (node) => node.lastNode === parseInt(busLocation.lastNode) + 1
          );

          // 마지막 노드가 없으면 처음 위치로 돌아감
          if (!nextNode) {
            return {
              ...busLocation,
              lastNode: nodeLocation[0].lastNode,
              lat: nodeLocation[0].lat,
              lng: nodeLocation[0].lng,
            };
          }

          // 현재 위치와 다음 노드 사이 거리 계산
          const distance = getDistanceInMeters(
            nextNode.lat,
            nextNode.lng,
            busLocation.lat,
            busLocation.lng
          );

          // 도달 시 다음 노드로 업데이트
          if (distance < 5) {
            return {
              ...busLocation,
              lat: nextNode.lat,
              lng: nextNode.lng,
              lastNode: nextNode.lastNode,
            };
          }

          // 이동해야 할 경우의 변화량 계산
          const frameRate = 100; // 100ms마다 업데이트
          const timeToNextNode = distance / speed;
          const step = frameRate / (timeToNextNode * 1000);

          // 각 방향으로 개별 이동량 계산
          const xLocation =
            busLocation.lat + (nextNode.lat - busLocation.lat) * step;
          const yLocation =
            busLocation.lng + (nextNode.lng - busLocation.lng) * step;

          // 버스의 개별 위치 업데이트
          return {
            ...busLocation,
            lat: xLocation,
            lng: yLocation,
            lastNode: busLocation.lastNode, // 노드는 도달 시에만 변경
          };
        })
      );
    }, 100);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 제거
  };

  return [bus, setBusAdd, resetBusData, moveBusEvent];
};

// Haversine 공식으로 두 지점 간의 거리 계산 (미터 단위)
function getDistanceInMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000; // 지구 반지름 (미터)
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

  return R * c; // 두 지점 간의 거리 (미터)
}

export default useTestBus;
