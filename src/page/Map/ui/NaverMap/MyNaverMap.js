import React, { useEffect, useRef, useState } from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import Style from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";
import Aside from "../aside";
import Advertise from "../Advertise";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { transform, toLonLat } from "ol/proj";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import BusMarkersOL from "../Bus/BusMarkersOL";
import BusMarkerTestOL from "../Bus/BusMarkersOLTest";
import { OSM } from "ol/source";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
import DirectionsModal from "../Direction/Direction";
import DirectionLine from "../DirectionLine/DirectionLine";
import useRouteData from "../../../../shared/recoil/useBusRoute";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";

const OLMapComponent = ({ center, zoom, onMapChange }) => {
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
      target: "ol-map",
      layers: [
        new VectorLayer({ source: newMarkerSource }), // 마커 소스
        new VectorLayer({ source: newLineSource }), // 라인 소스
        new TileLayer({
          source: new OSM(),
          opacity: 0,
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
  }, []);

  useEffect(() => {
    if (!olMapRef) return;

    const view = olMapRef.getView();
    let zoomTimeout = null; // 디바운스 타이머
    let accumulatedDelta = 0; // 스크롤 양 누적

    // 기본 스크롤 기능 비활성화
    olMapRef.getInteractions().forEach((interaction) => {
      if (interaction instanceof MouseWheelZoom) {
        olMapRef.removeInteraction(interaction);
      }
    });

    // 커스텀 스크롤 이벤트로 줌 제어
    const handleScrollZoom = (event) => {
      event.preventDefault(); // 기본 스크롤 동작 방지
      accumulatedDelta += event.deltaY;

      // 디바운스 처리
      if (zoomTimeout) clearTimeout(zoomTimeout);

      zoomTimeout = setTimeout(() => {
        const currentZoom = view.getZoom();
        const newZoom =
          accumulatedDelta > 0
            ? Math.floor(currentZoom) - 1 // 줌 아웃
            : Math.ceil(currentZoom) + 1; // 줌 인

        view.animate({
          zoom: newZoom,
          duration: 300, // 부드러운 애니메이션
        });

        accumulatedDelta = 0; // 누적 스크롤 초기화
      }, 100); // 100ms 디바운스
    };

    // 중심 이동 감지
    const handleCenterChange = () => {
      const newCenter = toLonLat(view.getCenter()); // EPSG:4326 좌표 변환
      const currentZoom = Math.round(view.getZoom()); // 줌을 정수로 처리

      onMapChange({ lat: newCenter[1], lng: newCenter[0] }, currentZoom);
    };

    // DOM에 스크롤 이벤트 등록
    const mapElement = document.getElementById("ol-map");
    if (mapElement) {
      mapElement.addEventListener("wheel", handleScrollZoom, {
        passive: false,
      }); // 스크롤 이벤트
    }

    // OpenLayers 이벤트 등록
    view.on("change:center", handleCenterChange); // 중심 변경 이벤트
    view.on("change:resolution", handleCenterChange); // 줌 변경 이벤트

    // 클린업
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleScrollZoom); // 이벤트 제거
      }
      if (zoomTimeout) clearTimeout(zoomTimeout); // 디바운스 타이머 제거
      view.un("change:center", handleCenterChange);
      view.un("change:resolution", handleCenterChange);
    };
  }, [olMapRef, onMapChange]);

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
  const naverMapRef = useRef(null);
  const [check, setCheck] = useCheckAtom();

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
