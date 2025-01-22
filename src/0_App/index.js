import Page from "../1_Page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/globalStyle.js";
import ResetStyle from "./style/resetStyle.js";
import theme from "./style/theme.js";
import STYLE from "./style/style.js";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme.defaultTheme}>
        <ResetStyle />
        <GlobalStyles />
        <BrowserRouter>
          <STYLE.Main>
            <Page />
          </STYLE.Main>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
