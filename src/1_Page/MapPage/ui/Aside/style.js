import styled from "styled-components";

const STYLE = {
  Aside: styled.aside`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 20%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    justify-content: start;
  `,
  Button: styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-left: 10px;
  `,
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
