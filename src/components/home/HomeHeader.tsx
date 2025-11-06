// src/components/home/HomeHeader.tsx
import { useNavigate } from 'react-router-dom';

import * as S from './HomeHeader.styled'
import notificationIcon from '@assets/home/notification.svg'
import searchIcon from '@assets/home/search.svg'
import menuIcon from '@assets/home/menu.svg'

interface HomeHeaderProps {
  isSkill: boolean;
  setIsSkill: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomeHeader({isSkill, setIsSkill}: HomeHeaderProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <S.Header>
      
      <S.TitleWrapper>
        <S.Title $active={isSkill} onClick={() => setIsSkill(true)}>기술</S.Title>
        <S.Title $active={!isSkill} onClick={() => setIsSkill(false)}>아이디어</S.Title>
      </ S.TitleWrapper>

      <S.IconWrapper>
        <S.Icon src={notificationIcon} onClick={() => navigate('/Home/notification')} />
        <S.Icon src={searchIcon} onClick={() => navigate('/Home/search')} />
        <S.Icon src={menuIcon} onClick={() => navigate('/Home/category')} />
      </S.IconWrapper>

    </S.Header>
  )
}