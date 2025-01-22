import MinusIcon from "../../asset/minus_icon";
import PlusIcon from "../../asset/plus_icon";
import CheckBox from "../CheckBox/CheckBox";
import HoverIcon from "../hover_icon/HoverIcon";
import Style from "./style";
import useCheckAtom from "../../../../../../4_Shared/recoil/useCheckAtom";
import useAside from "../../model/useAside";
import { useNavigate } from "react-router-dom";
import TextBox from "../TextBox/CheckBox";
import Explain from "../explain/explain";

const Aside = () => {
  const [asideOpen, setAsideOpen] = useAside();
  const [check, setCheck] = useCheckAtom();
  const pageChange = useNavigate();

  return (
    <>
      <Style.Aside>
        <Style.Button>
          <HoverIcon
            onClick={setAsideOpen}
            resource={asideOpen ? MinusIcon : PlusIcon}
          />
        </Style.Button>
        {asideOpen && (
          <div>
            {/* <CheckBox
              text="노드"
              check={check.node}
              change={() => {
                setCheck("node");
              }}
            /> */}
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
      <Explain />
      {/* <SearchContainer /> */}
    </>
  );
};
export default Aside;
