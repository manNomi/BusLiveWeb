import STYLE from "./style";
const TextBox = (props) => {
  const { onClick, text } = props;
  return (
    <STYLE.Container>
      <STYLE.CheckItem onClick={onClick}>
        <STYLE.Text>{text}</STYLE.Text>
      </STYLE.CheckItem>
    </STYLE.Container>
  );
};

export default TextBox;
