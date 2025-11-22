// src/components/project/ProjectHeader.tsx

import { useNavigate } from "react-router-dom";
import * as S from "./ProjectHeader.styled";

import notificationIcon from "@assets/home/notification.svg";
import searchIcon from "@assets/home/search.svg";
import menuIcon from "@assets/home/menu.svg";

export default function ProjectHeader() {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.Title>내 프로젝트</S.Title>
      <S.IconWrapper>
        <S.Icon
          src={notificationIcon}
          onClick={() => navigate("/Home/notification")}
        />
        <S.Icon src={searchIcon} onClick={() => navigate("/Home/search")} />
        <S.Icon src={menuIcon} onClick={() => navigate("/Home/category")} />
      </S.IconWrapper>
    </S.Header>
  );
}
