// HomePage.styled.ts
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const HeaderWrapper = styled.div`
  padding: 0 20px;
`

export const EmblaWrapper = styled.div`
  position: relative;
  top: 12%;
`

export const RegisterButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: auto 20px 20px auto;
`

export const RegisterButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  border: none;
  background-color: #352F36;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #FAFAFA;

  .img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`
