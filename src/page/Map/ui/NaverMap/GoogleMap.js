import React, { useEffect, useRef } from "react";

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Google Maps Script 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    // 콜백 함수로 Google Maps 초기화
    window.initMap = () => {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
        zoom: 12,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default GoogleMap;
