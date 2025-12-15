import { useState } from 'react';
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { useOverlay } from '@components/common/OverlayContext'
import { useBoards, useBlocks } from '@hooks';
import cancelButton from '@assets/common/cancel-btn.svg'
import * as S from './BoardSelector.styled'

interface BoardSelectorProps {
  blockId: number;
  setIsRegisterBlockActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardSelector({ blockId, setIsRegisterBlockActive }: BoardSelectorProps) {
  const { closeOverlay } = useOverlay();
  const [selectedBoardId, setSelectedBoardId] = useState<number>(0);
  const [newBoardName, setNewBoardName] = useState('');

  const { boards, createNewBoard } = useBoards();
  const { loading, addToBoard } = useBlocks();

  const handleCloseButton = () => {
    closeOverlay();
    if (setIsRegisterBlockActive)
      setIsRegisterBlockActive(true);
  };

  const handleAddBoard = () => {
    if (newBoardName.trim() === '') return;

    createNewBoard(newBoardName);
    setNewBoardName('');
  }

  const handleAddBlockToBoard = async (boardId: number, blockId: number) => {
    if (loading) return;

    try {
      await addToBoard(boardId, blockId);

      closeOverlay();
      toast.success('보드에 추가 완료!')
      if (setIsRegisterBlockActive) {
        setIsRegisterBlockActive(true);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ error?: string }>;

        if (err.response?.status === 400) {
          const msg = err.response.data?.error || "요청이 올바르지 않습니다.";
          toast.error(msg);
        } else {
          console.error("Axios error:", err.message, err.response?.status);
          toast.error("요청 처리 중 오류가 발생했습니다.");
        }
      } else {
        console.error("Unknown error:", e);
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <S.Wrapper>
      <S.TopRow>
        <S.CloseBtn />
        <S.Title>보드 선택</S.Title>
        <S.CloseBtn src={cancelButton} onClick={handleCloseButton} aria-label="닫기" />
      </S.TopRow>

      <S.Divider />

      <S.BoardList>
        {boards.map((board: any) => (
          <S.BoardItem
            key={board.boardId}
            selected={selectedBoardId === board.boardId}
            onClick={() => setSelectedBoardId(board.boardId)}
          >
            <S.BoardName>{board.boardName}</S.BoardName>
            {selectedBoardId === board.boardId && <span>✓</span>}
          </S.BoardItem>
        ))}
      </S.BoardList>

      <S.AddBoardBox>
        <S.AddBoardInput
          placeholder="새 보드 추가"
          value={newBoardName}
          onChange={e => setNewBoardName(e.target.value)}
        />
        <S.AddBoardBtn onClick={handleAddBoard}>＋</S.AddBoardBtn>
      </S.AddBoardBox>

      <S.BottomBtn onClick={() => handleAddBlockToBoard(selectedBoardId, blockId)}>보드에 담기</S.BottomBtn>
    </S.Wrapper>
  );
}