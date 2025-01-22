import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useChatListParam = (pageChange) => {
  const param = useParams("id").id;
  useEffect(() => {
    if (param !== "주안역환승정류장" && param !== "인하대후문") {
      alert(
        "개발중인 채팅방입니다 현재 가능 채팅방 [주안역환승정류장,인하대후문]"
      );
      pageChange("/home");
    }
  }, [param]);
  return { param };
};
export default useChatListParam;
