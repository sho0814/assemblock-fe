import styled from 'styled-components';

export const BlockListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0;
  margin-top: 15px;
`;

export const BlockItem = styled.li`
  display: flex;
  align-items: center;
`;

export const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;

export const BlockTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #352F36;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BlockSummary = styled.div`
    font-weight: 500;
  font-size: 13px;
  color: #726D72;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EmptyResultWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 16%;
  color: #333;
`;

export const EmptyMessage = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 16px;
  color: #000000
`;

export const EmptySubMessage = styled.div`
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
  color: #00000080;
`;