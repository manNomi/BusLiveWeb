import styled from "styled-components";

const STYLE = {
  Container: styled.nav`
    display: flex;
    width: 120px;
    height: 40px;
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
    background-color: white;
    margin-top: 10px;
  `,
  CheckItem: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  CheckBox: styled.input.attrs((props) => ({
    type: "checkbox",
    checked: props.enable,
  }))`
    width: 20px;
    height: 20px;
    margin-right: 10px;
  `,
  Text: styled.p`
    font-weight: bold;
    width: 100px;
    text-align: center;
  `,
};

export default STYLE;
