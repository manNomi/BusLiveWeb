import styled from "styled-components";

const STYLE = {
  Main: styled.main`
    width: 100%;
    height: 100%;
    padding-bottom: 32px;
    max-width: 528px;
    margin: 0 auto;
    background-color: #f5f5f5;

    /* 모바일 대응 */
    @media (max-width: 768px) {
      padding-bottom: 20px;
      max-width: 100%;
    }

    @media (max-width: 480px) {
      padding-bottom: 16px;
      max-width: 100%;
    }
  `,
};
export default STYLE;
