import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  ModalContent,
  Button,
  ErrorMessage,
  DataContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableContainer,
  FooterButtonContainer,
} from "./style"; // 스타일 추가
import useDirectionsData from "../../../../../../../../entities/Bus/useDirection";
import { busStop } from "../../../../../../../../entities/Bus/BusLocationData";
import useCheckAtom from "../../../../../../../../shared/recoil/useCheckAtom";
import useRouteData from "../../../../../../../../shared/recoil/useBusRoute";

const DirectionsModal = ({ isOpen, onClose }) => {
  const [directionsData, setCoordinates, error, loading] = useDirectionsData();
  const [selectedBusStops, setSelectedBusStops] = useState([]); // 선택된 정류장 상태 (최대 2개)
  const [check, setCheck] = useCheckAtom();
  const [busRoute, setBusRoute] = useRouteData();

  // 특정 정류장을 클릭했을 때 호출
  const handleBusStopClick = (busStopId, busPoint) => {
    // 이미 선택된 정류장인지 확인
    const isAlreadySelected = selectedBusStops.some(
      (stop) => stop.id === busStopId
    );

    if (isAlreadySelected) {
      // 선택 해제 (제거)
      setSelectedBusStops((prev) =>
        prev.filter((stop) => stop.id !== busStopId)
      );
    } else if (selectedBusStops.length < 2) {
      // 새로운 정류장 추가
      setSelectedBusStops((prev) => [
        ...prev,
        { id: busStopId, point: busPoint },
      ]);
    } else {
      alert("최대 두 개의 정류장만 선택 가능합니다.");
    }
  };

  // Fetch 버튼 클릭 시 실행
  const handleFetch = () => {
    if (selectedBusStops.length === 2) {
      const coordinates = selectedBusStops.map((stop) => [
        stop.point.lng,
        stop.point.lat,
      ]);
      setCoordinates(coordinates); // 출발지와 도착지를 설정
    } else {
      alert("출발지와 도착지를 모두 선택하세요.");
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>버스 정류장 목록</h2>

        {/* 스크롤 가능한 테이블 컨테이너 */}
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>정류장 이름</TableHeader>
                <TableHeader>정류장 번호</TableHeader>
                <TableHeader>작업</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {busStop.map((stop) => (
                <TableRow key={stop.busStopId}>
                  <TableCell>{stop.busStop}</TableCell>
                  <TableCell>{stop.busStopNumber}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleBusStopClick(stop.busStopId, stop.busPoint)
                      }
                      style={{
                        backgroundColor: selectedBusStops.some(
                          (s) => s.id === stop.busStopId
                        )
                          ? "#28a745" // 선택된 상태
                          : "#007bff", // 기본 상태
                      }}>
                      {selectedBusStops.some((s) => s.id === stop.busStopId)
                        ? "선택됨"
                        : "선택"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <FooterButtonContainer>
          <Button onClick={handleFetch} style={{ backgroundColor: "#28a745" }}>
            찾기
          </Button>
          <Button onClick={onClose} style={{ backgroundColor: "#dc3545" }}>
            닫기
          </Button>
        </FooterButtonContainer>

        {error && (
          <ErrorMessage>데이터를 가져오는 중 오류가 발생했습니다.</ErrorMessage>
        )}
        <DataContainer>
          {loading && <h3>로딩중</h3>}
          {!loading && directionsData && (
            <>
              <h3>경로 정보</h3>
              <p>거리: {directionsData.distance} m</p>
              <p>소요 시간: {directionsData.duration} s</p>
              <Button
                onClick={() => {
                  setCheck("direction");
                  setBusRoute(directionsData?.geometry);
                }}>
                경로 보기
              </Button>
            </>
          )}
        </DataContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default DirectionsModal;
