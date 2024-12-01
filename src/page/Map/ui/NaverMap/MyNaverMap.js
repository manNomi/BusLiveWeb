import React, { useEffect, useRef, useState } from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import Style from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";
import Aside from "../aside";
import Advertise from "../Advertise";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { transform, toLonLat, fromLonLat } from "ol/proj";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import BusMarkersOL from "../Bus/BusMarkersOL";
import BusMarkerTestOL from "../Bus/BusMarkersOLTest";
import { OSM } from "ol/source";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
import DirectionsModal from "../Direction/Direction";
import DirectionLine from "../DirectionLine/DirectionLine";
import useRouteData from "../../../../shared/recoil/useBusRoute";

const OLMapComponent = ({ center, zoom, onMapChange }) => {
  const [olMapRef, setOlMapRef] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [sourceLine, setLineSource] = useState(null);
  const [markerSource, setMarkerSource] = useState(null);
  const [check, setCheck] = useCheckAtom();
  const [busRoute] = useRouteData();

  useEffect(() => {
    // OpenLayers 초기화
    const newVectorSource = new VectorSource({ features: [] });
    const newLineSource = new VectorSource({ features: [] });
    const newMarkerSource = new VectorSource({ features: [] });

    const newMapInstance = new OLMap({
      target: "ol-map",
      layers: [
        new VectorLayer({ source: newMarkerSource }), // 마커 소스
        new VectorLayer({ source: newLineSource }), // 라인 소스
        new TileLayer({
          source: new OSM(),
          opacity: 1, // 배경 지도 투명
        }),
      ],
      view: new OLView({
        center: transform([center.lng, center.lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
        projection: "EPSG:3857",
      }),
    });

    setVectorSource(newVectorSource);
    setLineSource(newLineSource);
    setMarkerSource(newMarkerSource);
    setOlMapRef(newMapInstance);

    return () => {
      if (newMapInstance) newMapInstance.setTarget(null); // 맵 제거
    };
  }, []);

  useEffect(() => {
    if (!olMapRef) return;

    const view = olMapRef.getView();

    // 실시간 이동 이벤트
    const handleCenterChange = () => {
      const newCenter = toLonLat(view.getCenter());
      const newZoom = view.getZoom();

      if (
        newCenter[1] !== center.lat ||
        newCenter[0] !== center.lng ||
        newZoom !== zoom
      ) {
        onMapChange({ lat: newCenter[1], lng: newCenter[0] }, newZoom);
      }
    };

    // 중심 이동 및 줌 변경 이벤트 등록
    view.on("change:center", handleCenterChange);
    view.on("change:resolution", handleCenterChange);

    return () => {
      view.un("change:center", handleCenterChange);
      view.un("change:resolution", handleCenterChange);
    };
  }, [olMapRef, center, zoom, onMapChange]);

  useEffect(() => {
    if (!olMapRef) return;

    const view = olMapRef.getView();
    const transformedCenter = transform(
      [center.lng, center.lat],
      "EPSG:4326",
      "EPSG:3857"
    );

    view.setCenter(transformedCenter);
    view.setZoom(zoom);
  }, [center, zoom, olMapRef]);

  return (
    <>
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

const MyNaverMap = () => {
  const [option, setOptionEvent] = useMapOptions();
  const [center, setCenter] = useState({ lat: 37.450284, lng: 126.653478 });
  const [zoom, setZoom] = useState(13);
  const [naverMapMove, setMove] = useState(false);
  const naverMapRef = useRef(null);
  const [check, setCheck] = useCheckAtom();

  useEffect(() => {
    if (naverMapMove) {
      setOptionEvent((prev) => ({
        ...prev,
        center: { lat: center.lat, lng: center.lng },
        zoom,
      }));
      setMove(false);
    }
  }, [center, zoom, setOptionEvent]);

  const handleNaverMapChange = () => {
    const naverCenter = naverMapRef.current.getCenter();
    const currentZoom = naverMapRef.current.getZoom();

    setCenter({
      lat: naverCenter.lat(),
      lng: naverCenter.lng(),
    });
    setZoom(currentZoom);
    setMove(true);
  };

  const handleOLMapChange = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);

    if (naverMapRef.current) {
      naverMapRef.current.setCenter(newCenter);
      naverMapRef.current.setZoom(newZoom);
    }
  };

  return (
    <>
      <Aside />
      <Style.Container>
        <MapDiv style={{ width: "100%", height: "90vh", position: "relative" }}>
          <NaverMap
            ref={naverMapRef}
            center={center}
            zoom={zoom}
            style={{ width: "100%", height: "100%" }}
            onIdle={handleNaverMapChange} // NaverMap 이동 후 동기화
          />
          <div
            id="ol-map"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: naverMapMove ? "none" : "auto",
            }}>
            <OLMapComponent
              center={center}
              zoom={zoom}
              onMapChange={handleOLMapChange}
            />
          </div>
        </MapDiv>
        <DirectionsModal
          isOpen={check.direction && check.route}
          onClose={() => setCheck("both_click")}
        />
      </Style.Container>
      <Advertise />
    </>
  );
};

export default MyNaverMap;
