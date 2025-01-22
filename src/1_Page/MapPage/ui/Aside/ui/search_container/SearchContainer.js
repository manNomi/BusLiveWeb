import React from "react";
import {
  Container,
  Box,
  Hidden,
  Outline,
  Input,
  Btn,
  BtnImg,
  ContainerBox,
  Icon,
} from "./style.js";
import BlackSearchIcon from "../../asset/search_black.js";
const SearchContainer = () => {
  return (
    <ContainerBox>
      <Container>
        {/* 검색 박스 */}
        <Outline>
          <Box>
            <Input className="input" placeholder="검색" />
          </Box>
          <Hidden>
            <BlackSearchIcon />
          </Hidden>
        </Outline>
        {/* 검색 버튼 */}
        <Btn>
          <BtnImg>
            <BlackSearchIcon />
          </BtnImg>
        </Btn>
      </Container>
    </ContainerBox>
  );
};

export default SearchContainer;
