import React from "react";
import { useNavigate } from "react-router-dom";

const usePageChange = () => {
  const navigate = useNavigate();

  const handleRouteChange = (path) => {
    navigate(path); // 원하는 경로로 변경
  };

  return handleRouteChange;
};

export default usePageChange;
