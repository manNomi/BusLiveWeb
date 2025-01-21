import { useState } from "react";

const useAside = () => {
  const [asideOpen, setAsideChange] = useState(false);
  const setAsideChangeEvent = () => {
    setAsideChange(!asideOpen);
  };
  return [asideOpen, setAsideChangeEvent];
};
export default useAside;
