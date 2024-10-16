import { atom, useSetRecoilState } from "recoil";
import { useRecoilValue, useRecoilState } from "recoil";

const checkAtom = atom({
  key: "CHECK",
  default: { node: true, bus: true },
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
