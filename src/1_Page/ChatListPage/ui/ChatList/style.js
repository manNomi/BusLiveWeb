import styled from "styled-components";

const STYLE = {
  ChatListContainer: styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #eee;
  `,

  ChatItem: styled.div`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }
  `,

  ProfileImage: styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  `,

  ChatContent: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,

  NameAndTime: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  `,

  ChatName: styled.p`
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: #333;
  `,

  Time: styled.span`
    font-size: 12px;
    color: #888;
  `,

  LastMessage: styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

export default STYLE;
