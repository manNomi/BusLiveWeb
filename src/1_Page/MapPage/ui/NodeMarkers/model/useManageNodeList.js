import { useEffect, useState } from "react";
import useCheckAtom from "../../../../../4_Shared/recoil/useCheckAtom";

const useManageNodeList = (nodeListData) => {
  const [displayNodeDataList, setNodeData] = useState([]);

  const [check] = useCheckAtom();

  useEffect(() => {
    if (check.node) {
      setNodeData((pre) => [...pre, ...nodeListData]);
    } else {
      setNodeData([]);
    }
  }, [check.node, nodeListData]);

  return { displayNodeDataList };
};

export default useManageNodeList;
