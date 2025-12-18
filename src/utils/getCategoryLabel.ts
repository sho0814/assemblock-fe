import { CATEGORY_ALL } from '@constants/category';

// API에서 받은 카테고리명(value)을 label 형식으로 변환
// 예: "문화/생활" -> "문화_생활"
export const getCategoryLabel = (categoryValue: string | null): string => {
  if (!categoryValue) return '기타';
  
  // CATEGORY_ALL에서 value가 일치하는 항목 찾기
  const category = CATEGORY_ALL.find(cat => cat.value === categoryValue);
  
  // 찾으면 label 반환, 없으면 원본 반환
  return category?.label || categoryValue;
};

// label을 value로 변환 (역방향)
export const getCategoryValue = (categoryLabel: string | null): string => {
  if (!categoryLabel) return '기타';
  
  const category = CATEGORY_ALL.find(cat => cat.label === categoryLabel);
  
  return category?.value || categoryLabel;
};

