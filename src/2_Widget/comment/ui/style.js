import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 78px;
`;

export const UserBox = styled.div`
  display: flex;
  flex: 1;
`;

export const UserImgBox = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const UserText = styled.div`
  display: flex;
`;

export const TextBold = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`;

export const Content = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  margin: 3px;
`;

export const IconBox = styled.div`
  display: flex;
`;
export const Icon = styled.svg``;

export const IconWrap = styled.div`
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
`;

export const IconText = styled.p`
  margin-left: 5px;
`;

export const SettingBox = styled.div`
  display: flex;
  width: 40px;
  justify-content: center;
  margin-top: 10px;
`;

export const SettingIcon = styled.div`
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
`;
