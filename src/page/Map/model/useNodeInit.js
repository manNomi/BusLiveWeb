import { useState } from "react";

const useNode = () => {
  const [nodeData, setNodeData] = useState([]);
  const setNodeAdd = (node) => {
    setNodeData([...nodeData, ...node]);
  };
  const setNodeDelete = () => {
    setNodeData([]);
  };
  return [nodeData, setNodeAdd, setNodeDelete];
};

export default useNode;
