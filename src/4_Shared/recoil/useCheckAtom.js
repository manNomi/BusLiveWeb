import { atom, useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { useCallback } from "react";

const checkAtom = atom({
  key: "CHECK",
  default: { node: false, bus: true, test: true, high: true, low: false },
});

const useCheckAtom = () => {
  const check = useRecoilValue(checkAtom);
  const setCheck = useSetRecoilState(checkAtom);
  const setCheckTypeEvent = useCallback(
    (key) => {
      setCheck((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    },
    [setCheck]
  );

  return [check, setCheckTypeEvent];
};
export default useCheckAtom;
