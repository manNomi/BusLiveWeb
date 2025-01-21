import { useState } from "react";

export const useMapOptions = () => {
  const [options, setOptions] = useState({});

  const setOptionEvent = (option) => {
    setOptions({ ...options, ...option });
  };

  return [options, setOptionEvent];
};
