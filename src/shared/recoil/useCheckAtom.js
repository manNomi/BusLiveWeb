import { atom, useSetRecoilState } from "recoil";
import { useRecoilValue, useRecoilState } from "recoil";

const checkAtom = atom({
  key: "CHECK",
  default: { node: false, bus: true, test: false, high: true, low: false },
});

const useCheckAtom = () => {
  const check = useRecoilValue(checkAtom);
  const setCheck = useSetRecoilState(checkAtom);
  const setCheckTypeEvent = (key) => {
    setCheck((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return [check, setCheckTypeEvent];
};
export default useCheckAtom;
