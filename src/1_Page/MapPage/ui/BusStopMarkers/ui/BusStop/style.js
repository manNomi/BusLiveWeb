import styled from "styled-components";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 180px;
    padding: 12px 16px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: relative; /* InfoWindow가 지도 위에 표시되도록 조정 */
    z-index: 1000; /* 다른 요소들 위에 나타나도록 설정 */
    pointer-events: auto; /* 클릭 이벤트 전달 */
    border: 1px solid rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -110%);
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    position: relative;
    width: 100%;
  `,

  Info: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  `,

  Label: styled.div`
    font-size: 12px;
    color: #333;
    margin-bottom: 2px;
  `,

  Value: styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  `,

  Marker: styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  `,
};
