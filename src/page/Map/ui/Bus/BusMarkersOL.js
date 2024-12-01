import React, { useEffect, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style as OLStyle } from "ol/style";
import { transform } from "ol/proj";
import BusMoveIcon from "../../assets/BusMoveIcon";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import useBusData from "../../../../entities/Bus/useBusData";
import useBus from "../../model/useBus";

const BusMarkersOL = ({ mapInstance, vectorSource }) => {
  const [bus, setBus, resetBusData, moveBusEvent] = useBus();
  const [busData, loading, error] = useBusData();
  const { id: busStopId } = useParams();

  // Reusable function to handle angle adjustments and icon styles
  const createBusFeature = (lat, lng, angle, scale = 0.1, color = 3) => {
    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    const isFlipped = normalizedAngle > Math.PI / 2;
    const adjustedAngle = isFlipped ? angle - Math.PI : angle;

    const svgString = ReactDOMServer.renderToString(
      <BusMoveIcon width="300" height="300" color={color} />
    );
    const busIcon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgString
    )}`;

    const feature = new Feature({
      geometry: new Point(transform([lng, lat], "EPSG:4326", "EPSG:3857")),
    });

    // 스타일 생성
    const style = new OLStyle({
      image: new Icon({
        src: busIcon,
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        rotation: adjustedAngle || 0,
        scale: isFlipped ? [-scale, scale] : [scale, scale],
      }),
    });

    // 스타일을 feature에 설정
    feature.setStyle(style);

    return feature;
  };

  // Map initialization
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
        1,
        1
      );
      vectorSource.addFeature(feature);
    } else {
      updateMarkers();
    }
  }, [closestBus, vectorSource, updateMarkers]);

  useEffect(() => {
    console.log(busData);
    if (busData?.data?.length > 0) {
      setBus(busData.data);
    }
  }, [busData, setBus, resetBusData]);

  useEffect(() => {
    const stopMoving = moveBusEvent();
    return () => stopMoving();
  }, [moveBusEvent]);

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
