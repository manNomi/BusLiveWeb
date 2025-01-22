// BusStop.js
import { useEffect } from "react";
import Style from "./style";

const BusStop = ({
  stopName,
  location,
  remainingTime,
  busStopNumber,
  closeEvent,
  changePage,
  stopData,
}) => {
  changePage(`/home/${stopData.lastNode}`);
  useEffect(() => {}, [remainingTime]);
  return (
    <Style.Container>
      <Style.Header>
        <span>{stopName}</span>
        <span>{location}</span>
        <Style.Marker onClick={closeEvent}>✖</Style.Marker>
      </Style.Header>
      <Style.Info>
        <div>
          <Style.Label>남은시간</Style.Label>
          <Style.Value>{remainingTime}</Style.Value>
        </div>
        <div>
          <Style.Label>정류장 id</Style.Label>
          <Style.Value>{busStopNumber}</Style.Value>
        </div>
      </Style.Info>
      <Style.ChatBox>
        <Style.Chat
          onClick={() => {
            changePage("/chat/" + stopName);
          }}>
          <Style.ChatOut>
            <Style.ChatIcon></Style.ChatIcon>
            <Style.ChatText>채팅</Style.ChatText>
          </Style.ChatOut>
        </Style.Chat>
      </Style.ChatBox>
    </Style.Container>
  );
};

export default BusStop;
