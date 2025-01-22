// KakaoLoginStyle.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
  font-weight: 900;
  background-color: #2c3e50;
`;

export const Logo = styled.h1`
  font-size: 2em;
  color: white;
  margin-bottom: 20px;
  font-weight: 900;
`;

export const MoveBtn = styled.p`
  font-weight: 100;
  text-align: center;
  justify-content: center;
  margin-bottom: 20px;
  color: wheat;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  background-color: #efe10c;
  color: black;
  padding: 15px 30px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
