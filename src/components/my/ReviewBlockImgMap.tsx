// 리뷰 블록 이미지 import
import backGood from '@assets/MyPage/reviewblockImg/backGood.svg';
import backSoso from '@assets/MyPage/reviewblockImg/backSoso.svg';
import backBad from '@assets/MyPage/reviewblockImg/backBad.svg';
import designGood from '@assets/MyPage/reviewblockImg/designGood.svg';
import designSoso from '@assets/MyPage/reviewblockImg/designSoso.svg';
import designBad from '@assets/MyPage/reviewblockImg/designBad.svg';
import frontGood from '@assets/MyPage/reviewblockImg/frontGood.svg';
import frontSoso from '@assets/MyPage/reviewblockImg/frontSoso.svg';
import frontBad from '@assets/MyPage/reviewblockImg/frontBad.svg';
import planGood from '@assets/MyPage/reviewblockImg/planGood.svg';
import planSoso from '@assets/MyPage/reviewblockImg/planSoso.svg';
import planBad from '@assets/MyPage/reviewblockImg/planBad.svg';
import pmGood from '@assets/MyPage/reviewblockImg/pmGood.svg';
import pmSoso from '@assets/MyPage/reviewblockImg/pmSoso.svg';
import pmBad from '@assets/MyPage/reviewblockImg/pmBad.svg';

// 리뷰 이미지 매핑 (역할 + rating 조합)
// 백엔드 역할을 mainRoles에서 받을 때 'BackEnd'로 오므로 이를 'backend'로 변환
export const reviewImageMap: Record<string, Record<string, string>> = {
  'BackEnd': { good: backGood, notbad: backSoso, disappoint: backBad },
  'backend': { good: backGood, notbad: backSoso, disappoint: backBad },
  'Design': { good: designGood, notbad: designSoso, disappoint: designBad },
  'design': { good: designGood, notbad: designSoso, disappoint: designBad },
  'FrontEnd': { good: frontGood, notbad: frontSoso, disappoint: frontBad },
  'frontend': { good: frontGood, notbad: frontSoso, disappoint: frontBad },
  'Plan': { good: planGood, notbad: planSoso, disappoint: planBad },
  'planning': { good: planGood, notbad: planSoso, disappoint: planBad },
  'PM': { good: pmGood, notbad: pmSoso, disappoint: pmBad },
  'pm': { good: pmGood, notbad: pmSoso, disappoint: pmBad },
};

export const getReviewImage = (
  mainRole: string | null | undefined,
  rating: string | null | undefined = 'good'
): string | null => {
  if (!mainRole) return null;

  // 이미지 찾기 (대소문자 모두 지원)
  const roleKey = mainRole.toLowerCase();
  const imageMap = reviewImageMap[mainRole] || reviewImageMap[roleKey];
  
  if (!imageMap) return null;

  // rating이 없으면 기본값 'good' 사용
  const ratingKey = rating?.toLowerCase() || 'good';
  const imageSrc = imageMap[ratingKey];
  
  return imageSrc || null;
};

