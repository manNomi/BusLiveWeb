import React, { useEffect } from "react";
import { Marker } from "react-naver-maps";
import busIcon from "../../assets/bus.svg";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../3_Entities/Bus/useTestBusData";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import BusStopIcon from "../../assets/BusIcon";
import BusStopIconLast from "../../assets/BusIconLast";

const TestBusMarkers = () => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();
  const busStopId = useParams("id").id;

  // busData가 초기화될 때만 설정
  useEffect(() => {
    if (busData) {
      setBus(busData);
    }
  }, [busData]);

  // 컴포넌트가 마운트될 때 한 번만 moveBusEvent 실행
  useEffect(() => {
    const stopMoving = moveBusEvent(); // 이동 이벤트 시작
    return () => stopMoving(); // 컴포넌트 언마운트 시 이동 정지
  }, [moveBusEvent]);

  // busStopId가 있을 때 가장 가까운 버스 정류장 선택
  const setBusOnly = (bus) => {
    const candidates = bus.filter(
      (item) => item.lastNode < parseInt(busStopId)
    );
    candidates.sort((a, b) => b.lastNode - a.lastNode); // 내림차순 정렬
    return candidates[0]; // 가장 큰 lastNode를 가진 항목 반환
  };

  // 로딩 및 에러 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  // busStopId가 있는 경우 setBusOnly로 가장 가까운 버스 정류장만 표시
  const closestBusLocation = busStopId ? setBusOnly(bus) : null;

  return (
    <>
      {closestBusLocation ? (
        <Marker
          position={
            new window.naver.maps.LatLng(
              closestBusLocation.lat,
              closestBusLocation.lng
            )
          }
          icon={{
            content: ReactDOMServer.renderToString(
              closestBusLocation.lastbusyn === 1 ? (
                <BusStopIconLast
                  color={closestBusLocation.congestion}
                  width={40}
                  heigth={40}
                />
              ) : (
                <BusStopIcon
                  color={closestBusLocation.congestion}
                  width={40}
                  heigth={40}
                />
              )
            ),
          }}
        />
      ) : (
        bus.map((busLocation, index) => {
          // 유효성 검사: position이 없을 경우 예외 처리
          if (!busLocation || !busLocation.lat || !busLocation.lng) {
            return null; // 유효하지 않은 경우 렌더링하지 않음
          }
          return (
            <Marker
              key={index}
              position={
                new window.naver.maps.LatLng(busLocation.lat, busLocation.lng)
              }
              icon={{
                content: `<img src="${busIcon}" width="20" height="20" />`,
              }}
            />
          );
        })
      )}
    </>
  );
};

export default TestBusMarkers;
