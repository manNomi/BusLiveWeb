import { useCallback, useState, useRef } from "react";
import { nodeLocation } from "../../../entities/Bus/BusLocationData";

// 고정 값 정의
const SPEED = 5; // 고정 속도 (m/s)
const FRAME_RATE = 100; // 프레임 속도 (ms)

const useBus = () => {
  const [bus, setBus] = useState([]);
  const intervalRef = useRef(null);

  // 버스 데이터 리셋
  const resetBusData = useCallback(() => {
    console.log("Resetting bus data...");
    setBus([]);
    clearIntervalIfActive();
  }, []);

  // Interval 정리 함수
  const clearIntervalIfActive = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Interval cleared");
    }
  }, []);

  // 버스 이동 이벤트
  const moveBusEvent = useCallback(() => {
    if (intervalRef.current) {
      console.warn("Move event already running");
      return;
    }

    intervalRef.current = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          if (!busLocation) return busLocation;

          const nextNode = getNextNode(busLocation);
          if (!nextNode) return busLocation;

          const distance = getDistanceInMeters(
            busLocation.lat,
            busLocation.lng,
            nextNode.lat,
            nextNode.lng
          );

          // 가까운 노드에 도달한 경우
          if (distance < SPEED) {
            const nextAngle = getNextNode(nextNode)
              ? calculateAngle(
                  { lat: nextNode.lat, lng: nextNode.lng },
                  getNextNode(nextNode)
                )
              : 0;

            return {
              ...busLocation,
              lat: nextNode.lat,
              lng: nextNode.lng,
              lastNode: busLocation.lastNode,
              angle: nextAngle, // 각도 업데이트
            };
          }

          // 이동 계산
          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;
          const step = (SPEED / distance) * (FRAME_RATE / 1000); // 이동 비율 계산

          const angle = calculateAngle(
            { lat: busLocation.lat, lng: busLocation.lng },
            { lat: nextNode.lat, lng: nextNode.lng }
          );

          return {
            ...busLocation,
            lat: busLocation.lat + x * step,
            lng: busLocation.lng + y * step,
            angle, // 실시간 각도 업데이트
          };
        })
      );
    }, FRAME_RATE);

    console.log("Move event started");

    return () => clearIntervalIfActive();
  }, [clearIntervalIfActive]);

  return [bus, setBus, resetBusData, moveBusEvent];
};

// 다음 노드 반환
const getNextNode = (busLocation) => {
  const currentNodeIndex = nodeLocation.findIndex(
    (node) => node.lastNode === parseInt(busLocation.lastNode, 10)
  );
  if (currentNodeIndex === -1) {
    console.warn("Node not found for:", busLocation.lastNode);
    return null;
  }
  return nodeLocation[(currentNodeIndex + 1) % nodeLocation.length];
};

// 두 지점 간의 각도 계산
const calculateAngle = (start, end) => {
  if (!start || !end) return 0;

  const deltaX = end.lng - start.lng;
  const deltaY = end.lat - start.lat;

  return Math.atan2(deltaY, deltaX); // 라디안 반환
};

// 두 지점 간의 거리 계산
const getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
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

  return R * c;
};

export default useBus;
