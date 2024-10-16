import { useState } from "react";

const useBusStop = () => {
  const [busStopData, setBusStop] = useState([]);
  const setBusAdd = (busStop) => {
    setBusStop([...busStopData, ...busStop]);
  };
  const setBusDelete = () => {
    setBusStop([]);
  };
  return [busStopData, setBusAdd, setBusDelete];
};

export default useBusStop;
