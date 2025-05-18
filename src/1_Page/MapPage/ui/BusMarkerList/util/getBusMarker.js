import ReactDOMServer from "react-dom/server";

import BusIcon from "../../../../../4_Shared/assets/BusIcon";
import BusLastIcon from "../../../../../4_Shared/assets/BusStopIconLast";

export const getBusMarker = (congestion, lastbusyn) => {
  if (lastbusyn === 1) {
    // 마지막 버스 아이콘
    return ReactDOMServer.renderToString(
      <BusLastIcon color={congestion} width={40} height={40} />
    );
  }
  // 일반 버스 아이콘 색상
  const fill = congestion === 2 ? "#E6C767" : "#31511E";
  return ReactDOMServer.renderToString(
    <BusIcon color={fill} width={40} height={40} />
  );
};
