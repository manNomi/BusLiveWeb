import React, { useEffect, useRef } from "react";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";

const OpenLayersMap = ({ vectorSource }) => {
  const olMapRef = useRef(null);

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    olMapRef.current = new OLMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new OLView({
        center: [14128785.4, 4518937.0], // EPSG:3857 좌표 (서울 기준)
        zoom: 13,
      }),
      target: "ol-overlay",
    });

    return () => {
      olMapRef.current.setTarget(null);
    };
  }, [vectorSource]);

  return (
    <div
      id="ol-overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // 지도 위의 다른 UI와 상호작용 가능
      }}
    />
  );
};

export default OpenLayersMap;
