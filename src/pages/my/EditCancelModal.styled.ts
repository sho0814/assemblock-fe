import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 335px;
  height: 227px;
  padding-bottom: 24px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #FAFAFA;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 335px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #F0EFF1;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #352F36;
  flex: 1;
  text-align: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #352F36;
  font-size: 20px;
  font-weight: 600;
  padding: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex: 1;
  padding: 0 20px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #352F36;
  text-align: center;
  line-height: 1.5;
`;

export const PrevButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 45px;
  border-radius: 16px;
  background-color: #352F36;
  cursor: pointer;
  border: none;
  font-weight: 500;
  font-size: 14px;
  color: #FAFAFA;
`;

