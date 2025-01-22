import { useEffect, useState } from "react";

const useManageBusData = (busData) => {
  const [busPoint, setBusPoint] = useState([]);
  useEffect(() => {
    setBusPoint(busData);
  }, [busData]);
  return { busPoint, setBusPoint };
};
export default useManageBusData;
