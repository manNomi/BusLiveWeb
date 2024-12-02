import styled from "styled-components";
import chat from "../../../../../../assets/chat_icon.svg";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: relative; /* InfoWindow가 지도 위에 표시되도록 조정 */
    z-index: 1000; /* 다른 요소들 위에 나타나도록 설정 */
    pointer-events: auto; /* 클릭 이벤트 전달 */
    transform: translate(-50%, -130%); /* InfoWindow를 마커 위로 정렬 */
  `,
  ChatBox: styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 15px;
  `,
  ChatIcon: styled.div`
    background-image: url(${chat});
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 5px;
  `,
  Chat: styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
  `,
  ChatOut: styled.div`
    display: flex;
    justify-content: centere;
    align-items: center;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  `,

  Info: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Label: styled.div`
    font-size: 12px;
    color: gray;
  `,

  Value: styled.div`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  `,
  ChatText: styled.p`
    font-weight: 900;
  `,

  Marker: styled.div`
    align-self: flex-end;
    font-size: 20px;
  `,
};
