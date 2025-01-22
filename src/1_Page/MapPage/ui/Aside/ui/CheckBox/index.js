import STYLE from "./style";
const CheckBox = (props) => {
  const { check, change, text } = props;
  return (
    <STYLE.Container>
      <STYLE.CheckItem>
        <STYLE.CheckBox enable={check} onChange={change}></STYLE.CheckBox>
        <STYLE.Text>{text}</STYLE.Text>
      </STYLE.CheckItem>
    </STYLE.Container>
  );
};

export default CheckBox;
