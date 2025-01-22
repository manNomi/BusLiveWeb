import { useEffect, useState } from "react";
import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useManageNodeList = (nodeLocation) => {
  const [displayNodeDataList, setNodeData] = useState([]);

  const [check] = useCheckAtom();

  useEffect(() => {
    if (check.node) {
      setNodeData((pre) => [...pre, ...nodeLocation]);
    } else {
      setNodeData([]);
    }
  }, [check.node]);

  return { displayNodeDataList };
};

export default useManageNodeList;
