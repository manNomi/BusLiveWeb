import { useState } from "react";

export const useMapOptions = () => {
  const [options, setOptions] = useState({
    center: { lat: 37.450284, lng: 126.653478 },
    zoom: 13,
  });

  const setOptionEvent = (option) => {
    setOptions({ ...options, ...option });
  };

  return [options, setOptionEvent];
};
