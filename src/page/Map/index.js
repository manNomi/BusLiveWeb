import MyNaverMap from "./ui/NaverMap/MyNaverMap";
import { NavermapsProvider } from "react-naver-maps";
const Map = () => (
  <NavermapsProvider
    ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID} // API 키 로드
  >
    <MyNaverMap />
  </NavermapsProvider>
);
export default Map;
