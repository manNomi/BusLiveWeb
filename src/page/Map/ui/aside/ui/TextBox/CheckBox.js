import Style from "./style";
const TextBox = (props) => {
  return (
    <Style.Container>
      <Style.CheckItem onClick={props.onClick}>
        <Style.Text>{props.text}</Style.Text>
      </Style.CheckItem>
    </Style.Container>
  );
};

export default TextBox;
