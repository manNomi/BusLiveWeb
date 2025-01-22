import { useState } from "react";

const useAsideHandler = () => {
  const [isAsideOpen, setIsAsideChange] = useState(false);
  const setAsideChangeEvent = () => {
    setIsAsideChange((pre) => !pre);
  };
  return [isAsideOpen, setAsideChangeEvent];
};
export default useAsideHandler;
