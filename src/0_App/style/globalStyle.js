import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
  *{
    color: ${({ theme }) => theme.color};
    -ms-overflow-style: none;
  }
  html{
    height: 100%;
    overscroll-behavior: none;
  }
  body {
    line-height: 1;
    height: 100%;
    overscroll-behavior: none;
  }
  #root{
    height: 100%;
  }
  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
