import React, { useEffect, useRef } from "react";
import OLMapComponent from "../OLMap";

const KakaoMapDiv = ({ center, zoom, setCenter, setZoom }) => {
  const mapRef = useRef(null);

  // Zoom 변환 함수
  const zoomToLevel = (zoom) => 20 - zoom; // 일반 Zoom → Kakao Level
  const levelToZoom = (level) => 20 - level; // Kakao Level → 일반 Zoom

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: zoomToLevel(zoom), // 초기 Zoom → Level 변환
        };

        // Kakao Map 생성 및 참조 저장
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        // Kakao Map 이벤트 등록
        window.kakao.maps.event.addListener(map, "center_changed", () => {
          const newCenter = map.getCenter();
          setCenter({ lat: newCenter.getLat(), lng: newCenter.getLng() });
        });

        window.kakao.maps.event.addListener(map, "zoom_changed", () => {
          const newLevel = map.getLevel();
          setZoom(levelToZoom(newLevel));
        });
      });
    };

    document.body.appendChild(script);

    // 스크립트 및 맵 클린업
    return () => {
      document.body.removeChild(script);
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  // 초기 중심 좌표 및 줌 강제 동기화
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
      map.setLevel(zoomToLevel(zoom)); // Zoom 값을 Kakao Level로 변환
    }
  }, [center, zoom]);

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      {/* Kakao Map 컨테이너 */}
      <div
        id="kakao-map"
        style={{
          width: "100%",
          height: "100%",
        }}></div>

      <OLMapComponent
        center={center}
        zoom={zoom}
        onMapChange={(newCenter, newZoom) => {
          setCenter(newCenter);
          setZoom(newZoom);
        }}
      />
    </div>
  );
};

export default KakaoMapDiv;
