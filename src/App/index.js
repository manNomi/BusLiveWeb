import { PC, Mobile } from "./model/useMediaQuery.js";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/GloabalStyle.js";
import Page from "../page/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <PC>
        <Page />
      </PC>
      <Mobile>
        <Page />
      </Mobile>
    </BrowserRouter>
  );
};

export default App;
