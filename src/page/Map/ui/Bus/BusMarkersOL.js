import React, { useEffect, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style as OLStyle } from "ol/style";
import { transform } from "ol/proj";
import BusIcon from "../../assets/BusIcon";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../entities/Bus/useTestBusData";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const BusMarkersOL = ({ mapInstance, vectorSource }) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();
  const { id: busStopId } = useParams();

  // 1. 맵 인스턴스에 레이어 추가
  useEffect(() => {
    if (!mapInstance || !vectorSource) return;

    const vectorLayer = new VectorLayer({ source: vectorSource });
    mapInstance.addLayer(vectorLayer);

    return () => {
      mapInstance.removeLayer(vectorLayer);
    };
  }, [mapInstance, vectorSource]);

  // 2. 마커 업데이트
  const updateMarkers = useCallback(() => {
    if (!bus?.length || !vectorSource) return;

    vectorSource.clear(); // 이전 마커 제거

    bus.forEach(({ lat, lng, angle, ...busInfo }) => {
      if (!lat || !lng || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn("Invalid bus location:", busInfo);
        return;
      }

      const feature = new Feature({
        geometry: new Point(transform([lng, lat], "EPSG:4326", "EPSG:3857")),
      });

      const svgString = ReactDOMServer.renderToString(
        <BusIcon width="300" height="300" color={3} />
      );
      const busIcon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgString
      )}`;
      feature.setStyle(
        new OLStyle({
          image: new Icon({
            src: busIcon, // SVG 데이터 URI 또는 파일 경로
            scale: 0.1, // 아이콘 크기 조정 (필요에 따라 조정)
            anchor: [0.5, 0.5], // 아이콘의 중심을 기준점으로 설정
            anchorXUnits: "fraction", // X 기준 단위를 비율로 설정
            anchorYUnits: "fraction", // Y 기준 단위를 비율로 설정
            rotation: angle || 0,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });
  }, [bus, vectorSource]);

  // 3. 버스 데이터 설정
  useEffect(() => {
    if (busData?.length > 0) {
      setBus(busData);
    } else {
      resetBusData();
    }
  }, [busData, setBus, resetBusData]);

  // 4. 이동 이벤트 등록
  useEffect(() => {
    const stopMoving = moveBusEvent(); // 이동 이벤트 시작
    return () => stopMoving(); // 컴포넌트 언마운트 시 이동 정지
  }, [moveBusEvent]);

  // 5. 특정 정류장의 가장 가까운 버스 선택
  const getClosestBus = useCallback(() => {
    if (!bus || !busStopId) return null;

    const candidates = bus.filter(
      (item) => item.lastNode < parseInt(busStopId)
    );
    candidates.sort((a, b) => b.lastNode - a.lastNode); // 내림차순 정렬
    return candidates[0] || null; // 가장 가까운 항목 반환 (없으면 null)
  }, [bus, busStopId]);

  const closestBus = getClosestBus();

  // 6. 에러 처리
  useEffect(() => {
    if (error) {
      console.error("Error fetching bus data:", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (closestBus) {
      console.log("Closest bus to stop:", closestBus);
      // 특정 버스 정류장과 관련된 마커만 업데이트
      vectorSource.clear(); // 이전 마커 제거
      const feature = new Feature({
        geometry: new Point(
          transform([closestBus.lng, closestBus.lat], "EPSG:4326", "EPSG:3857")
        ),
      });

      const svgString = ReactDOMServer.renderToString(
        <BusIcon width="500" height="500" color={1} />
      );
      const busIcon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgString
      )}`;
      feature.setStyle(
        new OLStyle({
          image: new Icon({
            src: busIcon,
            scale: 1,
            rotation: closestBus.angle || 0,
          }),
        })
      );
      vectorSource.addFeature(feature);
    } else {
      // 전체 마커 최신화
      updateMarkers();
    }
  }, [closestBus, vectorSource, updateMarkers]);

  if (loading) {
    console.log("Loading bus data...");
    return <div>로딩 중...</div>;
  }

  return null;
};

export default BusMarkersOL;
