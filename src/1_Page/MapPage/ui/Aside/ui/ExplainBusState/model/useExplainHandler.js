import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useExplainHandler = () => {
  const { id } = useParams();
  const [paramState, setParam] = useState();
  useEffect(() => {
    setParam(id);
  }, [id]);
  return { paramState };
};

export default useExplainHandler;
