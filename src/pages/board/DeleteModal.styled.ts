import styled from "styled-components";

export const Container = styled.div<{ showSelect: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 104px;
  /* height: ${(props) => (props.showSelect ? "108px" : "54px")}; */
  padding: ${(props) => (props.showSelect ? "8px 0" : "10px 12px")};
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  cursor: pointer;

  /* &:hover {
    background-color: #f5f5f5;
  } */

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  &:only-child {
    border-radius: 12px;
  }
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-right: 8px;
`;

export const Text = styled.span`
  color: var(--Primary-BK, #352f36);
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin: 0;
`;
