import { useCallback, useEffect, useState } from "react";
import getBusChatList from "../../../3_Entities/Chat/getBusChatList";
import { useNavigate } from "react-router-dom";

const useGetBusChatList = () => {
  const navigate = useNavigate();
  const [busChatList, setBusChatList] = useState(null);

  const fetchBusList = useCallback(async () => {
    try {
      const busChatListData = await getBusChatList();
      setBusChatList(busChatListData); // 올바른 데이터 설정
    } catch (error) {
      navigate("/"); // 에러 발생 시 홈으로 리디렉션
    }
  }, [navigate]);

  useEffect(() => {
    fetchBusList();
  }, [fetchBusList]);

  return { busChatList };
};

export default useGetBusChatList;
