import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 78px;
  `,

  UserBox: styled.div`
    display: flex;
    flex: 1;
  `,

  UserImgBox: styled.div`
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  UserImg: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  `,

  UserText: styled.div`
    display: flex;
  `,

  TextBold: styled.p`
    font-weight: bold;
    margin-right: 5px;
  `,

  Text: styled.p`
    color: ${({ theme }) => theme.colors.gray};
  `,

  Content: styled.p`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    margin: 3px;
  `,

  IconBox: styled.div`
    display: flex;
  `,

  Icon: styled.svg``,

  IconWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${({ theme }) => theme.colors.x};
    cursor: pointer;
    border-radius: 50%;
    width: ${({ theme }) => theme.sizes.commentIconWidth};
    height: ${({ theme }) => theme.sizes.commentIconHeight};
    margin-right: 5px;
    flex-shrink: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  `,

  IconText: styled.p`
    margin-left: 5px;
  `,

  SettingBox: styled.div`
    display: flex;
    width: 40px;
    justify-content: center;
    margin-top: 10px;
  `,

  SettingIcon: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${({ theme }) => theme.colors.x};
    cursor: pointer;
    border-radius: 50%;
    width: ${({ theme }) => theme.sizes.commentIconWidth};
    height: ${({ theme }) => theme.sizes.commentIconHeight};
  `,
};

export default STYLE;
