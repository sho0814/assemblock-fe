// src/components/home/HomeHeader.tsx
import * as S from './HomeHeader.styled'
import type { BlockType } from '@types'
import notificationIcon from '@assets/home/notification.svg'
import searchIcon from '@assets/home/search.svg'
import menuIcon from '@assets/home/menu.svg'

interface HomeHeaderProps {
  isTechType: boolean;
  setIsTechType: React.Dispatch<React.SetStateAction<boolean>>;
  setBlockType: React.Dispatch<React.SetStateAction<BlockType>>;
}

export default function HomeHeader({ isTechType, setIsTechType, setBlockType }: HomeHeaderProps): React.JSX.Element {

  return (
    <S.Header>

      <S.TitleWrapper>
        <S.Title $active={isTechType} onClick={() => { setIsTechType(true); setBlockType('TECHNOLOGY'); }}>기술</S.Title>
        <S.Title $active={!isTechType} onClick={() => { setIsTechType(false); setBlockType('IDEA') }}>아이디어</S.Title>
      </ S.TitleWrapper>

      <S.IconWrapper>
        <S.Item to='/home/notification' aria-label='notification'>
          <S.Icon src={notificationIcon} />
        </S.Item>

        <S.Item to='/search' aria-label='search'>
          <S.Icon src={searchIcon} />
        </S.Item>

        <S.Item to='/category' aria-label='category'>
          <S.Icon src={menuIcon} />
        </S.Item>
      </S.IconWrapper>

    </S.Header>
  )
}