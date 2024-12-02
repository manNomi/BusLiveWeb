import { useRecoilState } from "recoil";
import { atom } from "recoil";

const mapState = atom({
  key: "mapState", // 고유한 키 (Recoil의 상태를 구별)
  default: "Naver", // 초기값
});

const useMapAPI = () => {
  const [busmapAPI, setBusmapAPI] = useRecoilState(mapState);

  // 데이터를 추가하는 함수
  const setMap = (map) => {
    setBusmapAPI(map);
  };

  return [busmapAPI, setMap];
};

export default useMapAPI;
