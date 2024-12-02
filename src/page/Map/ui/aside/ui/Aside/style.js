import styled, { keyframes } from "styled-components";

// 회전 애니메이션
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Aside 스타일
export const Asides = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 20%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  justify-content: flex-start;
`;

// 일반 버튼 스타일
export const Button = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

// 공통 회전 버튼 스타일
export const RotatingButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 4s linear infinite;
`;

// 버튼 색상 설정
const buttonColors = {
  google: {
    background: "#4285f4",
    hover: "#357ae8",
    shadow: "rgba(66, 133, 244, 0.3)",
  },
  kakao: {
    background: "#fee500",
    hover: "#f2d400",
    shadow: "rgba(254, 229, 0, 0.3)",
    color: "#000",
  },
  naver: {
    background: "#03c75a",
    hover: "#02b451",
    shadow: "rgba(3, 199, 90, 0.3)",
  },
  default: {
    background: "#888",
    hover: "#666",
    shadow: "rgba(136, 136, 136, 0.3)",
  },
};

// 버튼 래퍼 (가로 스크롤뷰 스타일)
export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;

  /* 스크롤바 스타일 (선택 사항) */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #e0e0e0;
  }
`;

// 개별 버튼 스타일
export const GoogleButton = styled.button`
  min-width: 100px;
  height: 40px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: #357ae8;
  }
`;

export const KakaoButton = styled(GoogleButton)`
  background-color: #fee500;
  color: black;
  &:hover {
    background-color: #f2d400;
  }
`;

export const NaverButton = styled(GoogleButton)`
  background-color: #03c75a;
  &:hover {
    background-color: #02b451;
  }
`;

export const DefaultButton = styled(GoogleButton)`
  background-color: #888;
  &:hover {
    background-color: #666;
  }
`;
