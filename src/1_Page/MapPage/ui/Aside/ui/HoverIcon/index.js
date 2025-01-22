import STYLE from "./style";
import PlusIcon from "./assets/PlusIcon";
import MinusIcon from "./assets/MinusIcon";

const HoverIcon = (props) => {
  const { isAsideOpen, onClick } = props;
  return (
    <STYLE.Container onClick={onClick}>
      <STYLE.Box>
        <STYLE.IconWrap>
          {isAsideOpen ? (
            <MinusIcon width="24" height="24" />
          ) : (
            <PlusIcon width="24" height="24" />
          )}
        </STYLE.IconWrap>
      </STYLE.Box>
    </STYLE.Container>
  );
};
export default HoverIcon;
