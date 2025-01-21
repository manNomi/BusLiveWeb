// style.js
import styled, { keyframes } from "styled-components";
export default {};

// 로고와 슬로건을 위한 애니메이션
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 전체 페이지 컨테이너
export const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50;
  color: #ffffff;
  font-family: Arial, sans-serif;
`;

// 로고 텍스트 스타일
export const Logo = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 슬로건 텍스트 스타일
export const Tagline = styled.div`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

// 로딩 인디케이터 스타일
export const LoadingIndicator = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #3498db;
  border-top: 5px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20vh;
`;
