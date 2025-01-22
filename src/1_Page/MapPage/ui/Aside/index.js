import Style from "./style";
import useCheckAtom from "../../../../4_Shared/recoil/useCheckAtom";
import useAsideHandler from "./model/useAsideHandler";
import { useNavigate } from "react-router-dom";

import ExplainBusState from "./ui/ExplainBusState";
import CheckBox from "./ui/CheckBox";
import HoverIcon from "./ui/HoverIcon";
import TextBox from "./ui/TextBox";
import SearchContainer from "./ui/SearchContainer";

const Aside = () => {
  const [isAsideOpen, setAsideChangeEvent] = useAsideHandler();
  const [check, setCheck] = useCheckAtom();
  const pageChange = useNavigate();

  return (
    <>
      <Style.Aside>
        <Style.Button>
          <HoverIcon onClick={setAsideChangeEvent} isAsideOpen={isAsideOpen} />
        </Style.Button>
        {isAsideOpen && (
          <div>
            <CheckBox
              text="노드"
              check={check.node}
              change={() => {
                setCheck("node");
              }}
            />
            <TextBox
              text="채팅방"
              onClick={() => {
                pageChange("/chatList");
              }}
            />
            <CheckBox
              text="상행"
              check={check.high}
              change={() => {
                setCheck("high");
              }}
            />
            <CheckBox
              text="하행"
              check={check.low}
              change={() => {
                setCheck("low");
              }}
            />
            <CheckBox
              text="TEST"
              check={check.test}
              change={() => {
                setCheck("test");
              }}
            />
          </div>
        )}
      </Style.Aside>
      <ExplainBusState />
    </>
  );
};
export default Aside;
