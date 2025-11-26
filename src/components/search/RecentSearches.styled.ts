import styled from "styled-components";

export const Section = styled.section`
    margin: 32px 0 0 0;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #352F36;
`;

export const ClearAll = styled.button`
    background: none;
    color: #868286;
    border: none;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
`;

export const EmptyText = styled.div`
    margin-top: 40px;
    text-align: center;
    color: #868286;
    font-size: 12px;
    font-weight: 600;
`;

export const TagList = styled.div`
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    gap: 8px;
    &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tag = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #352F36;
    border-radius: 24px;
    padding: 4px 12px;
    background: none;
    font-size: 12px;
    font-weight: 400;
    color: #352F36;
    gap: 2px;
`;

export const RemoveBtn = styled.img`
    background: none;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    padding: 3px;
`;

