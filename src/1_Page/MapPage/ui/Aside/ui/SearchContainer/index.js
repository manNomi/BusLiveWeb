import React from "react";
import STYLE from "./style";
import BlackSearchIcon from "../../asset/BlackSearchIcon";

const SearchContainer = () => {
  return (
    <STYLE.ContainerBox>
      <STYLE.Container>
        <STYLE.Outline>
          <STYLE.Box>
            <STYLE.Input className="input" placeholder="검색" />
          </STYLE.Box>
          <STYLE.Hidden>
            <BlackSearchIcon />
          </STYLE.Hidden>
        </STYLE.Outline>
        <STYLE.Btn>
          <STYLE.BtnImg>
            <BlackSearchIcon />
          </STYLE.BtnImg>
        </STYLE.Btn>
      </STYLE.Container>
    </STYLE.ContainerBox>
  );
};

export default SearchContainer;
