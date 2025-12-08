import { useLocation } from "react-router-dom";
import * as S from './Navigator.styled'

import homeActive from '@assets/common/Nav/home-active.svg'
import homeInactive from '@assets/common/Nav/home-Inactive.svg'
import projectActive from '@assets/common/Nav/project-active.svg'
import projectInactive from '@assets/common/Nav/project-inactive.svg'
import boardActive from '@assets/common/Nav/board-active.svg'
import boardInactive from '@assets/common/Nav/board-inactive.svg'
import profileActive from '@assets/common/Nav/profile-active.svg'
import profileInactive from '@assets/common/Nav/profile-inactive.svg'


export const Navigator = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/Home";
  const isProject = pathname === "/Project";
  const isBoard = pathname === "/Board";
  const isMy = pathname === "/My";

  return (
    <S.NavBar>
      <S.NavItem to="/Home" aria-label="Home">
        <S.Icon src={isHome ? homeActive : homeInactive} alt="home" />
        <S.Label className='l500' $active={isHome}>홈</S.Label>
      </S.NavItem>

      <S.NavItem to="/Project" aria-label="Project">
        <S.Icon src={isProject ? projectActive : projectInactive} alt="project" />
        <S.Label className='l500' $active={isProject}>내 프로젝트</S.Label>
      </S.NavItem>

      <S.NavItem to="/Board" aria-label="Board">
        <S.Icon src={isBoard ? boardActive : boardInactive} alt="board" />
        <S.Label className='l500' $active={isBoard}>내 보드</S.Label>
      </S.NavItem>

      <S.NavItem to="/My" aria-label="Profile">
        <S.Icon src={isMy ? profileActive : profileInactive} alt="profile" />
        <S.Label className='l500' $active={isMy}>마이페이지</S.Label>
      </S.NavItem>

    </S.NavBar>
  );
}