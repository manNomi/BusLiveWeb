import React, { useEffect, useState } from "react";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import useBusStop from "../../../../../../model/useBusStop";
import useNode from "../../../../../../model/useNodeInit";
import {
  busStop,
  nodeLocation,
} from "../../../../../../../../entities/Bus/BusLocationData";
import useCheckAtom from "../../../../../../../../shared/recoil/useCheckAtom";
import handleMarkerClick from "../BusStop/markerClick";
import usePageChange from "../../../../../../model/usePageChange";
import useBus from "../../../../../../model/useBus";
import useTestBus from "../../../../../../model/useTestBus";
import { useMapOptions } from "../../../../../../model/useMapOption";
import busStopIcon from "../../../../../../assets/black_bus_stop.svg";
import useBusStopData from "../../../../../../../../entities/Bus/useBusStopClick";
import { Vector as VectorLayer, VectorSource } from "ol/layer";

const MarkersOL = ({ map, vectorSource }) => {
  const [busStops, setBusAdd, setBusDelete] = useBusStop();
  const [nodeData, setNodeAdd, setNodeDelete] = useNode();
  const [check] = useCheckAtom();
  const changePage = usePageChange("./chat");
  const [, setBus, ,] = useBus();
  const [, setTestBus, ,] = useTestBus();
  const [, setOptionEvent] = useMapOptions();

  const [retroBusStopData, setBusID, error] = useBusStopData(null);
  const [busStopData, setBusStopData] = useState(null);

  const vectorLayer = new VectorLayer({ source: vectorSource });
  map.addLayer(vectorLayer);

  // 마커 스타일 생성
  const createMarkerFeature = (lat, lng) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: busStopIcon, // 마커 아이콘 경로 설정
          scale: 0.04,
        }),
      })
    );

    return feature;
  };

  // 버스 정류장 클릭 이벤트 처리
  useEffect(() => {
    console.log(busStopData);
    if (!busStopData) return;
    setBusID(busStopData.busStopId);
  }, [busStopData]);

  useEffect(() => {
    console.log(retroBusStopData);
    if (retroBusStopData !== "" && retroBusStopData) {
      handleMarkerClick(
        busStopData,
        map,
        changePage,
        setBus,
        setTestBus,
        setOptionEvent,
        retroBusStopData.restTimeText,
        setBusID
      );
    }
  }, [retroBusStopData]);

  // 노드 데이터 관리
  useEffect(() => {
    if (check.node) setNodeAdd(nodeLocation);
    else setNodeDelete();
  }, [check.node]);

  // 하행 정류장 필터링
  useEffect(() => {
    if (check.low) {
      setBusAdd(busStop.filter((busStation) => busStation.lastNode < 36));
    } else {
      setBusDelete("하행");
    }
  }, [check.low, busStop]);

  // 상행 정류장 필터링
  useEffect(() => {
    if (check.high) {
      setBusAdd(busStop.filter((busStation) => busStation.lastNode >= 36));
    } else {
      setBusDelete("상행");
    }
  }, [check.high, busStop]);

  // 벡터 소스에 마커 추가
  useEffect(() => {
    if (!vectorSource) return;

    vectorSource.clear(); // 기존 마커 초기화

    // 버스 정류장 마커 추가
    busStops.forEach((stopData) => {
      const feature = createMarkerFeature(
        stopData.busPoint.lat,
        stopData.busPoint.lng
      );
      feature.setId(stopData.busStopId); // ID 설정
      vectorSource.addFeature(feature);
    });

    // 노드 데이터 마커 추가
    nodeData.forEach((node) => {
      const feature = createMarkerFeature(node.lat, node.lng);
      vectorSource.addFeature(feature);
    });
  }, [vectorSource, busStops, nodeData]);

  useEffect(() => {
    if (!map || !vectorSource) return;
    console.log("클릭");

    const handleMapClick = (event) => {
      // 클릭된 픽셀에서 Feature 탐색
      const clickedFeature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );
      if (clickedFeature) {
        const featureId = clickedFeature.id_; // Feature의 ID 가져오기
        const stopData = busStops.find(
          (busStation) => busStation.busStopId === featureId
        );

        if (stopData) {
          console.log("클릭한 버스 정류장:", stopData);
          setBusStopData(stopData); // 상태 업데이트
        }
      } else {
        console.log("클릭한 위치에 Feature가 없습니다.");
      }
    };

    map.on("singleclick", handleMapClick);

    // 클린업 함수로 이벤트 제거
    return () => {
      map.un("singleclick", handleMapClick);
    };
  }, [map, vectorSource, busStops]);
  return null; // OpenLayers 마커는 UI 요소가 없으므로 렌더링하지 않음
};

export default MarkersOL;
