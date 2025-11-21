import { useState } from 'react';
import { useOverlay } from '@components/common/OverlayContext'
import useBoardList from './useBoardList';
import cancelButton from '@assets/common/cancel-btn.svg'
import * as S from './SelectBoard.styled'

interface SelectBoardProps {
    block_id: number;
}

export default function SelectBoard({ block_id }: SelectBoardProps) {
    const { closeOverlay } = useOverlay();
    const boards = useBoardList();
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);  // 선택된 보드ID
    const [newBoardName, setNewBoardName] = useState('');                         // 새 보드 입력상태

    if (!boards.length) return <p>No Boards yet...</p>

    return (
    <S.Wrapper>
      <S.TopRow>
        <S.CloseBtn />
        <S.Title>보드 선택</S.Title>
        <S.CloseBtn src={cancelButton} onClick={closeOverlay} aria-label="닫기" />
      </S.TopRow>

      <S.BoardList>
        {boards.map((board: any) => (
          <S.BoardItem
            key={board.board_id}
            selected={selectedBoardId === board.board_id}
            onClick={() => setSelectedBoardId(board.board_id)}
          >
            <S.BoardName>{board.board_name}</S.BoardName>
            {selectedBoardId === board.board_id && <span>✓</span>}
          </S.BoardItem>
        ))}
      </S.BoardList>

      <S.AddBoardBox>
        <S.AddBoardInput
          placeholder="새 보드 추가"
          name={"board_name"}
          value={newBoardName}
          onChange={e => setNewBoardName(e.target.value)}
        />
        <S.AddBoardBtn onClick={() => setNewBoardName('')}>＋</S.AddBoardBtn>
      </S.AddBoardBox>

      <S.BottomBtn>보드에 담기</S.BottomBtn>
    </S.Wrapper>
  );
}