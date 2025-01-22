import styled from "styled-components";
export const ContainerBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: end;
`;

export const Container = styled.div`
  width: 70%;
  height: 8%;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex: 0 1;
  z-index: 1000;
`;
export const Outline = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border: none;
  ${Container}:focus-within & {
    border: 1px solid green;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    background-color: white;
  }
`;
export const Box = styled.div`
  width: 85%;
  height: 100%;
  position: relative;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.1); /* 그림자 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-right: 1px gray solid;

  ${Container}:focus-within & {
    border: none;
    box-shadow: none;
  }
`;

export const Hidden = styled.div`
  width: 24px;
  height: 24px;
  display: none;
  ${Container}:focus-within & {
    display: block;
  }
`;
export const Icon = styled.svg``;

export const Input = styled.input`
  position: absolute;
  width: 80%;
  height: 80%;
  line-height: 100%;
  outline: none;
  border: none;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: black;
  background-color: white;
  font-size: large;
  &::placeholder {
    color: gray;
  }
`;

export const Btn = styled.button`
  width: 64px;
  height: 80%;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */

  border-left: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
`;

export const BtnImg = styled.div`
  width: 24px;
  height: 24px;
`;
