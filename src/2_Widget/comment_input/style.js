import styled from "styled-components";

const STYLE = {
  Write: styled.div`
    display: flex;
    width: 100%;
  `,

  WriteInput: styled.input`
    background-color: white;
    color: black;
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    margin-left: 5px;
    outline: none;
    transition: border-bottom-color 1s ease;

    &:focus {
      border-bottom: 2px solid green;
    }
  `,

  Container: styled.footer`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid black;
  `,

  UserImg: styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
  `,

  WriteBtn: styled.button`
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 12px;
    background-color: #28a745;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:active {
      animation: clickEffect 0.3s ease forwards;
    }

    @keyframes clickEffect {
      0% {
        transform: scale(1);
        background-color: #28a745;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }
      50% {
        transform: scale(0.9);
        background-color: #218838;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
      }
      100% {
        transform: scale(1);
        background-color: #28a745;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }
    }
  `,
};

export default STYLE;
