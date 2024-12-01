import React, { useEffect } from "react";
import { LineString } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer, VectorSource } from "ol/layer";
import { Style, Stroke } from "ol/style";
import { fromLonLat } from "ol/proj";
import polyline from "@mapbox/polyline";

const DirectionLine = ({ map, coordinates, vectorSource }) => {
  useEffect(() => {
    if (!map || !coordinates || coordinates.length === 0) {
      console.log("맵 객체 또는 좌표가 유효하지 않습니다.");
      return;
    }

    try {
      const decodedCoordinates = polyline.decode(coordinates[0]);
      const olCoordinates = decodedCoordinates.map(([lat, lon]) =>
        fromLonLat([lon, lat])
      );

      const routeLine = new LineString(olCoordinates);
      const routeFeature = new Feature({ geometry: routeLine });

      routeFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "blue",
            width: 6,
          }),
        })
      );

      // 기존 소스에 피처 추가
      vectorSource.clear(); // 이전 피처 제거
      vectorSource.addFeature(routeFeature);
      const vectorLayer = new VectorLayer({ source: vectorSource });
      map.addLayer(vectorLayer);
    } catch (error) {
      console.error("Error while rendering line:", error);
    }
    return () => {
      if (vectorSource) {
        vectorSource.clear(); // 벡터 소스의 모든 피처 제거
      }
    };
  }, [map, coordinates]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default DirectionLine;
