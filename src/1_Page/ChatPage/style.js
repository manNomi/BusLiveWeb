import styled from "styled-components";
import back_icon from "./assets/back_icon.svg";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    min-height: 100vh;
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 2px solid ${({ theme }) => theme.black || "black"};
  `,

  BackBtn: styled.button`
    width: 40px;
    height: 40px;
    background-image: url(${back_icon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    border: none;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      opacity: 0.8;
    }
  `,

  Logo: styled.p`
    font-size: 15px;
    font-weight: 900;
    color: ${({ theme }) => theme.black || "black"};
  `,

  Title: styled.p`
    font-size: 15px;
    font-weight: 900;
    color: ${({ theme }) => theme.black || "black"};
  `,

  Content: styled.main`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    max-height: calc(100vh - 120px);
    min-height: calc(100vh - 120px);
    padding: 20px;
  `,
};

export default STYLE;
