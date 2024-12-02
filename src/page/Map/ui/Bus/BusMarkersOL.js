import React, { useEffect, useCallback, useState } from "react";
import VectorLayer from "ol/layer/Vector";

import { useParams } from "react-router-dom";
import useBusData from "../../../../entities/Bus/useBusData";
import useBus from "../../model/useBus";
import createBusFeature from "./CreateBusFeature";

const BusMarkersOL = ({ mapInstance, vectorSource }) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useBus();
  const [busData, loading, error] = useBusData();
  const { id: busStopId } = useParams();
  const [isBusDataUpdated, setIsBusDataUpdated] = useState(false);

  useEffect(() => {
    if (!mapInstance || !vectorSource) return;

    const vectorLayer = new VectorLayer({ source: vectorSource });
    mapInstance.addLayer(vectorLayer);

    return () => {
      mapInstance.removeLayer(vectorLayer);
    };
  }, [mapInstance, vectorSource]);

  // Update markers
  const updateMarkers = useCallback(() => {
    if (!bus?.length || !vectorSource) return;
    vectorSource.clear();
    bus.forEach(({ lat, lng, angle }) => {
      const feature = createBusFeature(lat, lng, angle);
      feature.setId(angle);
      vectorSource.addFeature(feature);
    });
  }, [bus, vectorSource]);

  // Closest bus logic
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
    console.log(busData.data);
    setIsBusDataUpdated(false); // 데이터 업데이트가 시작될 때 false로 초기화
    if (busData && busData.data) {
      setBus((prevBus) => {
        // 처음으로 데이터를 불러올 때 처리
        if (prevBus.length === 0) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
          return busData.data; // 처음 데이터는 그대로 저장
        }

        // 데이터가 업데이트되었는지 확인하는 플래그
        let isUpdated = false;

        // 이전 버스 상태를 새로운 데이터로 업데이트
        const updatedBus = prevBus.map((busLocation, index) => {
          const newBusData = busData.data[index];

          // 데이터가 없을 경우 기존 상태 반환
          if (!newBusData) {
            return busLocation;
          }

          const prevLastNode = parseInt(busLocation.lastNode);
          const newLastNode = parseInt(newBusData.lastNode);

          console.log(prevLastNode, newLastNode);
          // 노드가 변경되었을 때만 업데이트
          if (prevLastNode !== newLastNode) {
            isUpdated = true; // 업데이트 감지
            return {
              ...busLocation,
              lat: newBusData.lat,
              lng: newBusData.lng,
              lastNode: newBusData.lastNode, // 새로운 노드 정보로 업데이트
            };
          }

          // 노드 변경이 없으면 기존 상태 유지
          return busLocation;
        });

        // 업데이트가 발생했을 경우에만 플래그 설정
        if (isUpdated) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
        }

        return updatedBus;
      });
    }
  }, [busData]);

  useEffect(() => {
    if (isBusDataUpdated) {
      moveBusEvent(); // 버스 좌표 주기적으로 업데이트
      setIsBusDataUpdated(false); // 상태 초기화 (필요에 따라)
    }
  }, [isBusDataUpdated]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching bus data:", error.message);
    }
  }, [error]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return null;
};

export default BusMarkersOL;
