import { useEffect, useRef } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Map as OLMap, View as OLView } from "ol";
import { transform } from "ol/proj";

const useOpenLayersMap = (vectorSource, center, zoom) => {
  const olMapRef = useRef(null);

  useEffect(() => {
    if (!vectorSource) return;

    // OpenLayers 지도 초기화
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const olMap = new OLMap({
      layers: [vectorLayer],
      view: new OLView({
        center: transform(center, "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
      }),
    });

    olMapRef.current = olMap;

    return () => {
      olMap.setTarget(null);
      olMapRef.current = null;
    };
  }, [vectorSource, center, zoom]);

  return olMapRef;
};

export default useOpenLayersMap;
