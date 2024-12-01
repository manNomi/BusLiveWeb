import { atom, useSetRecoilState } from "recoil";
import { useRecoilValue, useRecoilState } from "recoil";

const checkAtom = atom({
  key: "CHECK",
  default: {
    node: false,
    bus: true,
    test: false,
    high: true,
    low: false,
    direction: false,
    route: false,
  },
});

const useCheckAtom = () => {
  const check = useRecoilValue(checkAtom);
  const setCheck = useSetRecoilState(checkAtom);
  const setCheckTypeEvent = (key) => {
    if (key === "both_click") {
      if (check.route !== check.direction) {
        setCheck((prevState) => ({
          ...prevState,
          route: false,
        }));
      } else {
        setCheck((prevState) => ({
          ...prevState,
          route: !check.route,
          direction: !check.direction,
        }));
      }
    } else {
      setCheck((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    }
  };

  return [check, setCheckTypeEvent];
};
export default useCheckAtom;
