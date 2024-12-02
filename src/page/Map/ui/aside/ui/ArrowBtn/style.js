import styled, { keyframes, css } from "styled-components";

// 슬라이드 애니메이션
const slide = (direction) => keyframes`
  from {
    transform: translateX(${direction === "left" ? "-100%" : "100%"});
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const ArrowButtonWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 80px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  position: relative;
  margin-top: 20px;
`;

export const ArrowButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  border: 1px solid;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: #4285f4;
    color: white;
    border-color: #4285f4;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const ButtonContainer = styled.div`
  width: 200px;
  height: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  background: ${(props) => (props.isActive ? "#4285f4" : "#e0e0e0")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${(props) =>
    props.direction &&
    css`
      ${slide(props.direction)} 0.5s ease-out
    `};
`;
