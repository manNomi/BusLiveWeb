import styled from "styled-components";
import back_icon from "../../assets/back_icon.svg";

export default {
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
    border-bottom: 2px solid black;
  `,
  BackBtn: styled.button`
    width: 40px;
    height: 40px;
    background-image: url(${back_icon});
    background-repeat: no-repeat;
    background-size: cover;
  `,
  Logo: styled.p`
    font-size: 15px;
    font-weight: 900;
  `,
  Title: styled.p`
    font-size: 15px;
    font-weight: 900;
  `,
  Content: styled.main`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto; /* 스크롤을 활성화 */
    max-height: calc(100vh - 120px); /* Header 높이를 뺀 나머지 공간 사용 */
    min-height: calc(100vh - 120px); /* Header 높이를 뺀 나머지 공간 사용 */
  `,
};
