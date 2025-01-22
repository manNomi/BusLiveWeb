import { useState } from "react";

const useBusStop = () => {
  const [busStopData, setBusStop] = useState([]);
  const setBusAdd = (busStop) => {
    setBusStop([...busStopData, ...busStop]);
  };
  const setBusDelete = (type) => {
    if (type === "상행") setBusHigh();
    if (type === "하행") setBusLow();
  };
  const setBusHigh = () => {
    setBusStop((busStopList) =>
      busStopList.filter((busStop) => busStop.lastNode < 36)
    );
  };

  const setBusLow = () => {
    setBusStop((busStopList) =>
      busStopList.filter((busStop) => busStop.lastNode >= 36)
    );
  };
  return [busStopData, setBusAdd, setBusDelete];
};

export default useBusStop;
