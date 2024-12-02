import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style as OLStyle } from "ol/style";
import { transform } from "ol/proj";
import BusMoveIcon from "../../../assets/BusMoveIcon";
import ReactDOMServer from "react-dom/server";

const createBusFeature = (lat, lng, angle, scale = 0.1, color = 3) => {
  // 각도를 0 ~ 2π 범위로 정규화
  const normalizedAngle = angle + Math.PI;

  // 좌우 반전 여부: π/2 ~ π 또는 -π/2 ~ -π 범위에서만 반전
  const isHorizontalFlip =
    (normalizedAngle > Math.PI / 2 && normalizedAngle <= Math.PI) ||
    (normalizedAngle > (3 * Math.PI) / 2 && normalizedAngle <= 2 * Math.PI);

  // 최종 회전 각도
  const adjustedAngle = normalizedAngle;

  // SVG 아이콘 생성
  const svgString = ReactDOMServer.renderToString(
    <BusMoveIcon width="300" height="300" color={color} />
  );
  const busIcon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgString
  )}`;

  // Feature 생성
  const feature = new Feature({
    geometry: new Point(transform([lng, lat], "EPSG:4326", "EPSG:3857")),
  });

  // 스타일 생성
  const style = new OLStyle({
    image: new Icon({
      src: busIcon,
      anchor: [0.5, 0.5], // 중심 기준 회전
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      rotation: adjustedAngle || 0, // 회전 각도 적용
      scale: [isHorizontalFlip ? -scale : scale, scale], // 좌우 반전 적용
    }),
  });

  // 스타일을 feature에 설정
  feature.setStyle(style);

  return feature;
};

export default createBusFeature;
