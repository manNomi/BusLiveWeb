import React, { useEffect, useRef, useState } from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import Style from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";
import Aside from "../aside";
import Advertise from "../Advertise";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import BusMarkersOL from "../Bus/BusMarkersOL";
import BusMarkerTestOL from "../Bus/BusMarkersOLTest";
import { OSM } from "ol/source";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";

const OLMapComponent = ({ center, zoom }) => {
  const [olMapRef, setOlMapRef] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [check, setCheck] = useCheckAtom();

  useEffect(() => {
    const newVectorSource = new VectorSource({
      features: [],
    });

    const newMapInstance = new OLMap({
      target: "ol-map",
      layers: [
        new VectorLayer({
          source: newVectorSource,
        }),
        new TileLayer({
          source: new OSM(),
          opacity: 0.3, // 배경 지도 투명
        }),
      ],
      view: new OLView({
        center: transform([center.lng, center.lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom, // 줌 보정
        projection: "EPSG:3857",
      }),
    });

    setVectorSource(newVectorSource);
    setOlMapRef(newMapInstance);

    return () => {
      if (newMapInstance) {
        newMapInstance.setTarget(null);
      }
    };
  }, []);

  useEffect(() => {
    if (olMapRef) {
      const view = olMapRef.getView();
      const transformedCenter = transform(
        [center.lng, center.lat],
        "EPSG:4326",
        "EPSG:3857"
      );

      view.setCenter(transformedCenter);
      view.setZoom(zoom); // 줌 보정
    }
  }, [center, zoom, olMapRef]);

  return (
    <>
      {olMapRef && vectorSource && (
        <>
          {check.test ? (
            <BusMarkerTestOL
              mapInstance={olMapRef}
              vectorSource={vectorSource}
            />
          ) : (
            <BusMarkersOL mapInstance={olMapRef} vectorSource={vectorSource} />
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
    setZoom(currentZoom); // Naver 줌 값을 사용
    setMove(true);
  };

  return (
    <>
      <Aside />
      <Style.Container>
        <MapDiv style={{ width: "100%", height: "90vh", position: "relative" }}>
          <NaverMap
            ref={naverMapRef}
            center={option.center}
            zoom={option.zoom}
            onBoundsChanged={handleNaverMapChange}>
            <Markers />
          </NaverMap>
          <div
            id="ol-map"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "90vh",
              pointerEvents: "none",
              zIndex: 1,
            }}>
            <OLMapComponent center={center} zoom={zoom} />
          </div>
        </MapDiv>
      </Style.Container>
      <Advertise />
    </>
  );
};

export default MyNaverMap;
