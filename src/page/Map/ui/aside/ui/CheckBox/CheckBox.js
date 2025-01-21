import Style from "./style";
const CheckBox = (props) => {
  return (
    <Style.Container>
      <Style.CheckItem>
        <Style.CheckBox
          enable={props.check}
          onChange={props.change}></Style.CheckBox>
        <Style.Text>{props.text}</Style.Text>
      </Style.CheckItem>
    </Style.Container>
  );
};

export default CheckBox;
