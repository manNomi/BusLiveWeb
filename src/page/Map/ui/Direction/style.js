import styled from "styled-components";

import { darken } from "polished";
export const TableContainer = styled.div`
  max-height: 300px; /* 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤 활성화 */
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  text-align: left;
  padding: 8px;
  position: sticky; /* 헤더를 고정 */
  top: 0;
  z-index: 1;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 500px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export const DataContainer = styled.div`
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
`;

export const FooterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px; /* 버튼 간격 */
`;

export const Button = styled.button`
  padding: 12px 20px;
  background-color: ${({ bgColor }) => bgColor || "#007bff"};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  &:hover {
    background-color: ${({ bgColor }) =>
      bgColor ? darken(0.1, bgColor) : darken(0.1, "#007bff")};
  }
`;
