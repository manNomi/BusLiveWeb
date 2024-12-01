import { Overlay } from "ol";
import { fromLonLat } from "ol/proj";
import ReactDOM from "react-dom/client";
import BusStop from "./BusStop";

const handleMarkerClick = (
  stopData,
  map,
  changePage,
  setBus,
  setTestBus,
  setOptionEvent,
  busStopData,
  setBusID
) => {
  if (!busStopData) return;

  // 좌표 변환
  const coord = fromLonLat([stopData.busPoint.lng, stopData.busPoint.lat]);

  // 기존 Overlay 삭제
  if (map.overlay) {
    map.removeOverlay(map.overlay);
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
      setOptionEvent={() => setOptionEvent({ center: coord, zoom: 15 })}
      closeEvent={() => {
        if (map.overlay) {
          map.removeOverlay(map.overlay);
          changePage("/home");
          setBusID("");
        }
      }}
    />
  );

  // Overlay 생성
  const overlay = new Overlay({
    position: coord,
    element: container,
    stopEvent: false, // 클릭 이벤트가 맵으로 전파되지 않도록 설정
    autoPan: true, // InfoWindow가 뷰포트 내에 있도록 자동 이동
    autoPanAnimation: {
      duration: 250, // 애니메이션 지속 시간
    },
  });

  // Overlay를 지도에 추가
  map.addOverlay(overlay);
  map.overlay = overlay; // 지도 객체에 저장해 관리
};

export default handleMarkerClick;
