import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    top: 0;
    right: 0;
    width: 100px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
  `,
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.p`
    font-size: 15px;
    text-align: center;
  `,
};

export default STYLE;
