import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useChatListParam = (pageChange) => {
  const navigate = useNavigate();
  const param = useParams("id").id;
  useEffect(() => {
    if (param !== "주안역환승정류장" && param !== "인하대후문") {
      alert(
        "개발중인 채팅방입니다 현재 가능 채팅방 [주안역환승정류장,인하대후문]"
      );
      navigate("/home");
    }
  }, [param, navigate]);
  return { param };
};
export default useChatListParam;
