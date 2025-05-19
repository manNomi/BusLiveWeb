import Busicon from "../../../../../../4_Shared/assets/BusStopIcon";
import STYLE from "./style";
import useExplainHandler from "./model/useExplainHandler";

const ExplainBusState = () => {
  const { paramState } = useExplainHandler();
  return (
    paramState && (
      <STYLE.Container>
        <STYLE.Box>
          <Busicon color={1} width={40} height={40} />
          <STYLE.Text>혼잡</STYLE.Text>
        </STYLE.Box>
        <STYLE.Box>
          <Busicon color={2} width={40} height={40} />
          <STYLE.Text>보통</STYLE.Text>
        </STYLE.Box>
        <STYLE.Box>
          <Busicon color={3} width={40} height={40} />
          <STYLE.Text>적음</STYLE.Text>
        </STYLE.Box>
      </STYLE.Container>
    )
  );
};

export default ExplainBusState;
