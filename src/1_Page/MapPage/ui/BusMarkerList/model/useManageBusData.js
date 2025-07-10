import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const useManageBusData = (busData, nodeListData) => {
  const [disPlayBusPoint, setDisPlayBusPoint] = useState([]);
  const { id: busStopId } = useParams();

  const intervalRef = useRef(null);
  const busDataStringRef = useRef("");
  const isInitializedRef = useRef(false);
  const updateCountRef = useRef(0);

  // 애니메이션 시작 함수
  const startAnimation = useCallback(() => {
    // 이미 interval이 실행 중이라면 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const speed = 10;
    updateCountRef.current = 0; // 카운터 초기화

    intervalRef.current = setInterval(() => {
      updateCountRef.current++;

      // 5번마다만 상태 업데이트 (500ms마다)
      if (updateCountRef.current % 5 !== 0) {
        return;
      }

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
          const step = (frameRate / (timeToNextNode * 1000)) * 5; // 5배 스텝으로 조정

          return {
            ...busLocation,
            lat: busLocation.lat + x * step,
            lng: busLocation.lng + y * step,
          };
        })
      );
    }, 100);
  }, [nodeListData]); // busData 변경 감지 및 업데이트
  useEffect(() => {
    if (!busData || busData.length === 0) return;

    const currentBusDataString = JSON.stringify(
      busData.map((bus) => bus.lastNode)
    );

    // 데이터가 실제로 변경된 경우만 처리
    if (busDataStringRef.current !== currentBusDataString) {
      // 초기 로드인지 확인
      const isInitialLoad = !isInitializedRef.current;

      if (isInitialLoad) {
        // 초기 로드: 전체 데이터 설정
        setDisPlayBusPoint(busData);
        isInitializedRef.current = true;

        // 초기 애니메이션 시작 (지연)
        setTimeout(() => {
          startAnimation();
        }, 100);
      } else {
        // 업데이트: 실제 변경된 항목만 업데이트
        setDisPlayBusPoint((prevBus) => {
          return prevBus.map((busLocation, index) => {
            const newBusData = busData[index];
            if (!newBusData) return busLocation;

            // lastNode가 변경된 경우만 업데이트
            if (Number(busLocation.lastNode) !== Number(newBusData.lastNode)) {
              return { ...busLocation, ...newBusData };
            }

            return busLocation;
          });
        });

        // 데이터 변경 시 애니메이션 재시작 (지연)
        setTimeout(() => {
          startAnimation();
        }, 0);
      }

      busDataStringRef.current = currentBusDataString;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busData]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const setClickBusOnly = useCallback(
    (busList) => {
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
    },
    [busStopId]
  );

  // closestBusLocation을 메모이제이션하여 불필요한 재계산 방지
  const closestBusLocation = useMemo(() => {
    if (!busStopId || disPlayBusPoint.length === 0) {
      return null;
    }
    return setClickBusOnly(disPlayBusPoint);
  }, [busStopId, disPlayBusPoint, setClickBusOnly]);

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
