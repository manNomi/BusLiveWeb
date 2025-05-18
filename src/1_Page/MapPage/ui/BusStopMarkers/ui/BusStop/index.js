import ReactDOMServer from "react-dom/server";
import { Marker } from "react-naver-maps";
import Style from "./style";

const BusStopMarker = (props) => {
  const { stopData, onClose } = props;
  const { busStop, busStopId, busPoint } = stopData;
  // Render the styled container to HTML string
  const content = ReactDOMServer.renderToStaticMarkup(
    <Style.Container onClick={onClose}>
      <Style.Header>
        <Style.Marker>✖</Style.Marker>
      </Style.Header>
      <Style.Info>
        <div>
          <Style.Label>정류장</Style.Label>
          <Style.Value>{busStop}</Style.Value>
        </div>
        <div>
          <Style.Label>정류장ID</Style.Label>
          <Style.Value>{busStopId}</Style.Value>
        </div>
        <div>
          <Style.Label>위도</Style.Label>
          <Style.Value>{busPoint.lat}</Style.Value>
        </div>
        <div>
          <Style.Label>경도</Style.Label>
          <Style.Value>{busPoint.lng}</Style.Value>
        </div>
      </Style.Info>
    </Style.Container>
  );
  return (
    <Marker
      key={`${busPoint.lat}-${busPoint.lng}`}
      position={
        new window.naver.maps.LatLng(busPoint.lat + 0.001, busPoint.lng)
      }
      icon={{
        content,
      }}
      onClick={onClose}
    />
  );
};
export default BusStopMarker;
