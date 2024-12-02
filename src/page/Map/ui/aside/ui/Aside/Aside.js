import MinusIcon from "../../asset/minus_icon";
import PlusIcon from "../../asset/plus_icon";
import CheckBox from "../CheckBox/CheckBox";
import HoverIcon from "../hover_icon/HoverIcon";
import useCheckAtom from "../../../../../../shared/recoil/useCheckAtom";
import useAside from "../../model/useAside";
import { useNavigate } from "react-router-dom";
import TextBox from "../TextBox/CheckBox";
import Explain from "../explain/explain";
import { Asides, Button } from "./style";
import ButtonGroup from "../ArrowBtn/ArrowButtons";

const Aside = () => {
  const [asideOpen, setAsideOpen] = useAside();
  const [check, setCheck] = useCheckAtom();
  const pageChange = useNavigate();

  return (
    <>
      <Asides>
        <Button>
          <HoverIcon
            onClick={setAsideOpen}
            resource={asideOpen ? MinusIcon : PlusIcon}
          />
        </Button>
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
            <CheckBox
              text="경로"
              check={check.direction || check.route}
              change={() => {
                setCheck("both_click");
              }}
            />
            <ButtonGroup />
          </div>
        )}
      </Asides>
      <Explain />
      {/* <SearchContainer /> */}
    </>
  );
};
export default Aside;
