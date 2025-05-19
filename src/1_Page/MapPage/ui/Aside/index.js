import Style from "./style";
import useCheckAtom from "../../../../4_Shared/recoil/useCheckAtom";
import { useNavigate } from "react-router-dom";

import ExplainBusState from "./ui/ExplainBusState";
import CheckBox from "./ui/CheckBox";
import MinusIcon from "../../../../4_Shared/assets/MinusIcon";
import PlusIcon from "../../../../4_Shared/assets/PlusIcon";
import TextBox from "./ui/TextBox";
import useToggleState from "../../../../4_Shared/model/useToggleState";

const Aside = () => {
  const [isAsideOpen, toggleAsideOpen] = useToggleState();

  const [check, setCheck] = useCheckAtom();
  const navigate = useNavigate();

  return (
    <>
      <Style.Aside>
        <Style.Button>
          <Style.Container onClick={toggleAsideOpen}>
            <Style.Box>
              <Style.IconWrap>
                {isAsideOpen ? (
                  <MinusIcon width="24" height="24" />
                ) : (
                  <PlusIcon width="24" height="24" />
                )}
              </Style.IconWrap>
            </Style.Box>
          </Style.Container>
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
                navigate("/chatList");
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
