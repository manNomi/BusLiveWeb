import { useRecoilState } from "recoil";
import { atom } from "recoil";

const busRouteState = atom({
  key: "busRouteState", // 고유한 키 (Recoil의 상태를 구별)
  default: [], // 초기값
});

const useRouteData = () => {
  const [busRouteData, setBusRouteData] = useRecoilState(busRouteState);

  // 데이터를 추가하는 함수
  const setBusAdd = (busRoute) => {
    setBusRouteData([busRoute]);
  };

  // 데이터를 초기화하는 함수
  const setBusDelete = () => {
    setBusRouteData([]);
  };

  return [busRouteData, setBusAdd, setBusDelete];
};

export default useRouteData;
