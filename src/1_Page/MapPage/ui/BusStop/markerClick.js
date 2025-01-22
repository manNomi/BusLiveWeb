import BusStop from "./";
import ReactDOM from "react-dom/client";

const handleMarkerClick = (
  stopData,
  map,
  changePage,
  setBus,
  setTestBus,
  busStopData,
  setBusID
) => {
  if (!busStopData) return;
  const coord = new window.naver.maps.LatLng(
    stopData.busPoint.lat,
    stopData.busPoint.lng
  );

  // 기존 InfoWindow 삭제 (기존 오버레이가 있다면)
  if (map.infoWindow) {
    map.infoWindow.setMap(null);
  }
  // React 컴포넌트를 HTML로 렌더링
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container); // createRoot 사용
  root.render(
    <BusStop
      stopName={stopData.busStop}
      location={stopData.location}
      remainingTime={busStopData ? busStopData : "X"}
      busStopNumber={stopData.busStopNumber}
      busPoint={stopData.busPoint}
      setBus={setBus}
      setTestBus={setTestBus}
      changePage={changePage}
      stopData={stopData}
      closeEvent={() => {
        if (map.infoWindow) {
          map.infoWindow.setMap(null);
          changePage("/home");
          setBusID("");
        }
      }}
    />
  );

  const infoWindow = new window.naver.maps.InfoWindow({
    position: coord,
    content: container, // 렌더링된 HTML을 content로 전달
  });
  // InfoWindow를 지도에 추가
  infoWindow.open(map);
  map.infoWindow = infoWindow; // 지도 객체에 저장해 관리
};

export default handleMarkerClick;
