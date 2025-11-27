import * as S from './OptionMenu.styled';
import penIcon from '@assets/common/Pen.svg';
import trashIcon from '@assets/common/trash.svg';

interface OptionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function OptionMenu({ onEdit, onDelete }: OptionMenuProps) {
  return (
    <S.MenuContainer>
        <S.MenuItem onClick={onDelete}>
            <S.Icon src={trashIcon} alt="삭제하기" />
            <S.MenuText>삭제하기</S.MenuText>
        </S.MenuItem>
    
      <S.MenuItem onClick={onEdit}>
            <S.Icon src={penIcon} alt="수정하기" />
            <S.MenuText>수정하기</S.MenuText>
      </S.MenuItem>

    </S.MenuContainer>
  );
}

