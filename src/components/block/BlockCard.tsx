import { useNavigate } from 'react-router-dom';
import { cardBackgrounds } from '@constants/cardBackgrounds';
import * as S from './BlockCard.styled';

interface BlockCardProps {
  block_id: number;
  block_title: string;
  oneline_summary: string;
  user_name: string;
  tech_part: string;
  category_name: string;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
}

const BlockCard: React.FC<BlockCardProps> = ({
  block_id,
  block_title,
  oneline_summary,
  user_name,
  tech_part: techpart_id,
  category_name,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelect,
}) => {
  const navigate = useNavigate();
  const bgImage = cardBackgrounds[category_name];

  const getTechPartText = () => {
    if (techpart_id === 'design') return '디자인';
    if (techpart_id === 'frontend') return '프론트엔드';
    if (techpart_id === 'backend') return '백엔드';
    return null;
  };
  const techPartText = getTechPartText();

  const handleClick = () => {
    if (isSelectionMode && onToggleSelect) {
      onToggleSelect(block_id);
    } else {
      navigate('/Block/detail');
    }
  };

  return (
    <S.CardWrapper>
      <S.Card
        key={block_id}
        bgImage={bgImage}
        onClick={handleClick}
        isSelectionMode={isSelectionMode}
        isSelected={isSelected}
      >
        {isSelectionMode && (
          <S.CheckboxOverlay isSelected={isSelected}>
            <S.Checkbox isSelected={isSelected} />
          </S.CheckboxOverlay>
        )}
        <S.Title>{block_title}</S.Title>
        <S.Summary>{oneline_summary}</S.Summary>
        <S.Username>{user_name} 님</S.Username>
        {techPartText && <S.TechPart>{techPartText}</S.TechPart>}
      </S.Card>
    </S.CardWrapper>
  );
};

export default BlockCard;
