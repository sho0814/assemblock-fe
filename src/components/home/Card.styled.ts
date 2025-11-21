// src/components/home/Card.styled.ts
import styled from 'styled-components';

export const Card = styled.div<{ bgImage: string }>`
  background-image: url(${props => props.bgImage});
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 375px;
  width: 255px;
  padding: 24px;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  touch-action: none;

  position: relative;
  z-index: 2;
`

export const Title = styled.div`
  color: #FAFAFA;
  font-weight: 600;
  font-size: 16px;
`

export const Summary = styled.div`
  color: #FAFAFABF;
  font-weight: 500;
  font-size: 12px;
  overflow-wrap: break-word;
  word-break: break-all;
`

export const Username = styled.div`
  color: #FAFAFABF;
  font-weight: 500;
  font-size: 12px;
`

export const TechPart = styled.div`
  margin-top: auto;
  margin-left: auto;
  background-color: #352F3640;
  border-radius: 16px;
  padding: 6px 12px;
  color: #FAFAFA;
  font-weight: 600;
  font-size: 12px;
  display: inline-block;
  max-width: 100%;
`

export const StoreToBoardBtn = styled.div`
  width: 118px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  border-radius: 58px;
  background-color: #352F36;
  font-weight: 600;
  font-size: 16px;
  color: #FAFAFA;

  position: relative;
  left: 60px;
  bottom: 10px;
  z-index: 1;
`