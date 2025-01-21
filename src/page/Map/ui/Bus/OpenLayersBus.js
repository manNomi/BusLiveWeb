import "ol/ol.css";
import { Map, View } from "ol";
import { Feature } from "ol";
import { LineString, Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Stroke, Icon } from "ol/style";

// 1. 경로 데이터 정의 (LineString)
const routeCoords = [
  [126.978, 37.5665], // 시작점
  [127.028, 37.57], // 중간점
  [127.058, 37.551], // 끝점
];

// 좌표 변환 (EPSG:4326 → EPSG:3857)
const route = new LineString(routeCoords).transform("EPSG:4326", "EPSG:3857");

// 2. 경로를 위한 Feature와 Layer
const routeFeature = new Feature({
  geometry: route,
});
const routeLayer = new VectorLayer({
  source: new VectorSource({
    features: [routeFeature],
  }),
  style: new Style({
    stroke: new Stroke({
      color: "blue", // 경로 색상
      width: 3,
    }),
  }),
});

// 3. 버스 아이콘 정의
const bus = new Feature({
  geometry: new Point(route.getFirstCoordinate()),
});
const busStyle = new Style({
  image: new Icon({
    src: "bus-icon.png", // 버스 아이콘 이미지 경로
    anchor: [0.5, 0.5], // 아이콘의 중심 기준
    scale: 0.1, // 아이콘 크기
    rotateWithView: true, // 지도가 회전하면 아이콘도 함께 회전
  }),
});
bus.setStyle(busStyle);

const busLayer = new VectorLayer({
  source: new VectorSource({
    features: [bus],
  }),
});

// 4. 버스 이동 및 방향 업데이트 함수
let index = 0;
const moveBus = () => {
  if (index >= routeCoords.length - 1) {
    index = 0; // 경로 끝에 도달하면 처음으로 되돌아감
  }
  const start = routeCoords[index];
  const end = routeCoords[index + 1];

  // 방향 계산 (각도, 라디안 단위)
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
  busStyle.getImage().setRotation(-angle); // 각도 설정

  // 버스 위치 업데이트
  const currentCoord = routeCoords[index++];
  bus
    .getGeometry()
    .setCoordinates(
      new Point(currentCoord)
        .transform("EPSG:4326", "EPSG:3857")
        .getCoordinates()
    );
};

// 5. 지도 생성
const map = new Map({
  target: "map", // HTML 요소 ID
  layers: [
    new TileLayer({ source: new OSM() }),
    routeLayer, // 경로 레이어
    busLayer, // 버스 레이어
  ],
  view: new View({
    center: route.getCoordinateAt(0.5), // 경로 중심 좌표
    zoom: 12,
  }),
});

// 6. 주기적으로 버스 이동 및 방향 업데이트
setInterval(moveBus, 1000); // 1초마다 업데이트
