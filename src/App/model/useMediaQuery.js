import { useMediaQuery } from "react-responsive";
import React from "react";

const Mobile = ({ children }) => {
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return <React.Fragment>{Mobile && children}</React.Fragment>;
};

const PC = ({ children }) => {
  const Pc = useMediaQuery({
    query: "(min-width:768px) ",
  });
  return <React.Fragment>{Pc && children}</React.Fragment>;
};

export { Mobile, PC };
