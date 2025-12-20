import styled from "styled-components";

export const BlockListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 335px;
  margin: 0;
  min-height: min-content;
`;

export const BlockCardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const BlockCard = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 16px;
  background: #FAFAFA;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 0;
  box-sizing: border-box;
`;

export const BlockIcon = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const BlockContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BlockTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #352F36;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


export const PartLabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PartLabel = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  height: 23px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$color || '#35CDFF'};
  color: #FAFAFA;
  white-space: nowrap;
`;

export const BoardAddButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 8px 16px;
  background: #352F36;
  color: #FAFAFA;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: #4A444B;
  }
  
  &:active {
    background: #2A252B;
  }
`;

