import { useEffect, useRef } from "react";

const useScrollDown = (messages) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef]);

  return { scrollRef };
};
export default useScrollDown;
