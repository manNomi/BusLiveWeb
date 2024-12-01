import { useCallback, useState, useRef } from "react";
import { nodeLocation } from "../../../entities/Bus/BusLocationData";

// 고정 값 정의
const SPEED = 5; // 고정 속도 (m/s)
const FRAME_RATE = 100; // 프레임 속도 (ms)

const useBus = () => {
  const [bus, setBus] = useState([]);
  const intervalRef = useRef(null);

  // 버스 데이터 설정
  const setBusAdd = (data) => {
    if (!Array.isArray(data)) {
      console.warn("Invalid bus data:", data);
      return;
    }

    // 초기 각도 설정
    const initializedBus = data.map((busLocation) => {
      const nextNode = getNextNode(busLocation);
      const angle = nextNode
        ? calculateAngle(
            { lat: busLocation.lat, lng: busLocation.lng },
            { lat: nextNode.lat, lng: nextNode.lng }
          )
        : 0;

      return {
        ...busLocation,
        angle, // 각도 포함
      };
    });

    setBus(initializedBus);
  };

  // 버스 데이터 리셋
  const resetBusData = () => {
    setBus([]);
    clearIntervalIfActive();
  };

  // Interval 정리 함수
  const clearIntervalIfActive = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 버스 이동 이벤트
  const moveBusEvent = useCallback(() => {
    if (intervalRef.current) return; // 이미 실행 중이면 중단

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
              lastNode: nextNode.lastNode,
              angle: nextAngle,
            };
          }

          // 이동 계산
          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;
          const timeToNextNode = distance / SPEED; // 남은 시간
          const step = FRAME_RATE / (timeToNextNode * 1000); // 이동 비율

          return {
            ...busLocation,
            lat: busLocation.lat + x * step,
            lng: busLocation.lng + y * step,
            angle: busLocation.angle, // 각도 유지
          };
        })
      );
    }, FRAME_RATE);

    return () => clearIntervalIfActive();
  }, []);

  return [bus, setBusAdd, resetBusData, moveBusEvent];
};

// 다음 노드 반환
const getNextNode = (busLocation) => {
  const currentNodeIndex = nodeLocation.findIndex(
    (node) => node.lastNode === parseInt(busLocation.lastNode, 10)
  );
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
