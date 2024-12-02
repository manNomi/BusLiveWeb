import { useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { transform, toLonLat } from "ol/proj";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import { OSM } from "ol/source";

import DirectionLine from "../OLMap/ui/DirectionLine";
import useRouteData from "../../../../../../shared/recoil/useBusRoute";
import BusMarkersOL from "../../Bus/BusMarkerOL/BusMarkerOL";
import BusMarkerTestOL from "../../Bus/TestBusMarkerOL/BusMarkersTestOL";
import Markers from "../../Markers";
import useCheckAtom from "../../../../../../shared/recoil/useCheckAtom";

const OLMapComponent = ({ center, zoom, onMapChange, opacity = 0 }) => {
  const [olMapRef, setOlMapRef] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [sourceLine, setLineSource] = useState(null);
  const [markerSource, setMarkerSource] = useState(null);
  const [check] = useCheckAtom();
  const [busRoute] = useRouteData();

  useEffect(() => {
    // OpenLayers 초기화
    const newVectorSource = new VectorSource({ features: [] });
    const newLineSource = new VectorSource({ features: [] });
    const newMarkerSource = new VectorSource({ features: [] });

    const newMapInstance = new OLMap({
      target: "ol-map", // ID 변경
      layers: [
        new VectorLayer({ source: newMarkerSource }),
        new VectorLayer({ source: newLineSource }),
        new TileLayer({
          source: new OSM(),
          opacity: opacity,
        }),
      ],
      view: new OLView({
        center: transform([center.lng, center.lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
        projection: "EPSG:3857",
        minZoom: 3,
        maxZoom: 20,
      }),
    });

    setVectorSource(newVectorSource);
    setLineSource(newLineSource);
    setMarkerSource(newMarkerSource);
    setOlMapRef(newMapInstance);

    return () => {
      if (newMapInstance) newMapInstance.setTarget(null);
    };
  }, [center, zoom, opacity]);

  useEffect(() => {
    if (!olMapRef) return;

    const view = olMapRef.getView();
    let zoomTimeout = null; // 디바운스 타이머
    let accumulatedDelta = 0; // 스크롤 누적 양

    // 기본 스크롤 비활성화
    olMapRef.getInteractions().forEach((interaction) => {
      if (interaction instanceof MouseWheelZoom) {
        olMapRef.removeInteraction(interaction);
      }
    });

    // 커스텀 스크롤 줌 제어
    const handleScrollZoom = (event) => {
      event.preventDefault();
      accumulatedDelta += event.deltaY;

      if (zoomTimeout) clearTimeout(zoomTimeout);

      zoomTimeout = setTimeout(() => {
        const currentZoom = view.getZoom();
        const newZoom =
          accumulatedDelta > 0
            ? Math.max(currentZoom - 1, view.getMinZoom())
            : Math.min(currentZoom + 1, view.getMaxZoom());

        view.animate({
          zoom: newZoom,
          duration: 200,
        });
        accumulatedDelta = 0;
      }, 100); // 디바운스 시간 100ms
    };

    // 중심 변경 감지
    const handleCenterChange = () => {
      const newCenter = toLonLat(view.getCenter());
      const currentZoom = Math.round(view.getZoom());
      onMapChange({ lat: newCenter[1], lng: newCenter[0] }, currentZoom);
    };

    // DOM에 이벤트 등록
    const mapElement = document.getElementById("ol-map");
    if (mapElement) {
      mapElement.addEventListener("wheel", handleScrollZoom, {
        passive: false,
      });
    }

    // OpenLayers 이벤트 등록
    view.on("change:center", handleCenterChange);
    view.on("change:resolution", handleCenterChange);

    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleScrollZoom);
      }
      if (zoomTimeout) clearTimeout(zoomTimeout);
      view.un("change:center", handleCenterChange);
      view.un("change:resolution", handleCenterChange);
    };
  }, [olMapRef, onMapChange]);

  return (
    <>
      <div
        id="ol-map"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      {olMapRef && vectorSource && (
        <>
          <Markers map={olMapRef} vectorSource={markerSource} />
          {check.test ? (
            <BusMarkerTestOL
              mapInstance={olMapRef}
              vectorSource={vectorSource}
            />
          ) : (
            <BusMarkersOL mapInstance={olMapRef} vectorSource={vectorSource} />
          )}
          {busRoute.length !== 0 && check.route && (
            <DirectionLine
              map={olMapRef}
              coordinates={busRoute}
              vectorSource={sourceLine}
            />
          )}
        </>
      )}
    </>
  );
};

export default OLMapComponent;
