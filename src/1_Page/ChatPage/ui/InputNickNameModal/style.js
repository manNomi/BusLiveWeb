import styled from "styled-components";

const STYLE = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,

  ModalContainer: styled.div`
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ModalTitle: styled.h2`
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.black || "#333"};
  `,

  NicknameInput: styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.gray || "#ddd"};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.black || "#333"};
    }
  `,

  JoinButton: styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.primary || "#007bff"};
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.secondary || "#0056b3"};
    }
  `,
  ErrorMessage: styled.p`
    width: 100%;
    height: 20px;
    color: red;
    fontsize: "12px";
  `,
};

export default STYLE;
