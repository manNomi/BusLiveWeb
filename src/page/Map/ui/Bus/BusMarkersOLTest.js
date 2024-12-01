import React, { useEffect, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style as OLStyle } from "ol/style";
import { transform } from "ol/proj";
import BusMoveIcon from "../../assets/BusMoveIcon";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../entities/Bus/useTestBusData";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import BusIcon from "../../assets/BusIcon";

const BusMarkersTestOL = ({ mapInstance, vectorSource }) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();
  const { id: busStopId } = useParams();

  // 맵 인스턴스에 레이어 추가
  useEffect(() => {
    if (!mapInstance || !vectorSource) return;

    const vectorLayer = new VectorLayer({ source: vectorSource });
    mapInstance.addLayer(vectorLayer);

    return () => {
      mapInstance.removeLayer(vectorLayer);
    };
  }, [mapInstance, vectorSource]);

  const createBusFeature = (lat, lng, angle, scale = 0.1, color = 3) => {
    // 각도 조정 (0 <= normalizedAngle < 2 * Math.PI)
    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

    // 좌우 반전 여부 (앞이 좌측으로 가는 경우)
    const isFlipped =
      normalizedAngle > Math.PI / 2 && normalizedAngle < (3 * Math.PI) / 2;

    // 반전된 경우 반대 방향으로 조정
    const adjustedAngle = isFlipped ? angle + Math.PI : angle;

    // SVG 이미지 생성
    const svgString = ReactDOMServer.renderToString(
      <BusMoveIcon width="300" height="300" color={color} />
    );
    const busIcon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgString
    )}`;

    // Feature 생성 및 스타일 설정
    const feature = new Feature({
      geometry: new Point(transform([lng, lat], "EPSG:4326", "EPSG:3857")),
    });

    const style = new OLStyle({
      image: new Icon({
        src: busIcon,
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        rotation: adjustedAngle, // 회전 각도 적용
        scale: isFlipped ? [-scale, scale] : [scale, scale], // 좌우 반전 적용
      }),
    });

    feature.setStyle(style);
    return feature;
  };
  const updateMarkers = useCallback(() => {
    if (!bus?.length || !vectorSource) return;

    vectorSource.clear();
    bus.forEach(({ lat, lng, angle }) => {
      const feature = createBusFeature(lat, lng, angle);
      console.log(feature);
      vectorSource.addFeature(feature);
    });
  }, [bus, vectorSource]);

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

  if (loading) {
    return (
      <div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  return null;
};

export default BusMarkersTestOL;
