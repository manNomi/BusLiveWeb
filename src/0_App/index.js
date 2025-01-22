import Page from "../1_Page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/globalStyle.js";
import ResetStyle from "./style/resetStyle.js";
import theme from "./style/theme.js";
import STYLE from "./style/style.js";
import { RecoilRoot } from "recoil";
import { NavermapsProvider } from "react-naver-maps";

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme.defaultTheme}>
        <ResetStyle />
        <GlobalStyles />
        <BrowserRouter>
          <NavermapsProvider
            ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID} // API 키 로드
          >
            <STYLE.Main>
              <Page />
            </STYLE.Main>
          </NavermapsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
