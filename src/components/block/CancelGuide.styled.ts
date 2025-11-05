import styled from "styled-components";

export const Container = styled.div`
  background: #FAFAFA;
  border-radius: 20px;
  height: 227px;
  width: 335px;
  text-align: center;
  position: relative;
`;

export const Header = styled.div`
    height: 68px;
    width: 335px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 18px;
  height: 18px;

  font-weight: 600;
  font-size: 16px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`

export const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  word-break: keep-all;
`;

export const PrevButton = styled.button`
    align-items: center;
    justify-content: center;
    width: 192px;
    height: 45px;
    border-radius: 16px;
    background-color: #352F36;
    cursor: pointer;
    
    font-weight: 500;
    font-size: 14px;
    color: #FAFAFA;
`;
