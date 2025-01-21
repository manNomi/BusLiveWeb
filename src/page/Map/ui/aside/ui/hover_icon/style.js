import styled from "styled-components";

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
`;
export const IconWrap = styled.svg`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
`;

export const Box = styled.div`
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
`;
