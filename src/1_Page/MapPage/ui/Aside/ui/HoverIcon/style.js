import styled from "styled-components";

const STYLE = {
  Icon: styled.img`
    width: 24px;
    height: 24px;
  `,
  IconWrap: styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
  `,
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
    &:hover {
      background-color: gray;
      transition: background-color 0.5s ease;
    }
  `,
};

export default STYLE;
