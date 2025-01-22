import { useState } from "react";
import { useBusStopData } from "../../../entities/Bus/useBusStopClick";

const useBusStop = () => {
  const [busStopData, setBusStop] = useState([]);

  const setBusAdd = (busStop) => {
    setBusStop([...busStop]);
  };
  const setBusDelete = () => {
    setBusStop([]);
  };
  return [busStopData, setBusAdd, setBusDelete];
};

export default useBusStop;
