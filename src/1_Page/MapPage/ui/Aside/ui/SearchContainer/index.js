import React from "react";
import STYLE from "./style.js";
import BlackSearchIcon from "../../asset/search_black.js";

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
