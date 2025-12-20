import { authApi } from '../client';

// /api/users/me 응답 타입 (백엔드 응답)
// 실제 백엔드 응답 형식에 맞춰 null 허용
export interface UserMeResponse {
  userId: number; // 사용자 고유 ID
  nickname: string; // 닉네임
  roles: string[]; // 주 역할 리스트 (중복 가능) 예: ["Plan"], 빈 배열일 수 있음
  introduction: string | null; // 한 줄 소개 (null일 수 있음)
  profileType: string | null; // 프로필 이미지 타입 (예: "Type_1"), null일 수 있음
  portfolioUrl: string | null; // 포트폴리오 URL (null일 수 있음)
  portfolioPdfUrl: string | null; // 포트폴리오 PDF URL (null일 수 있음)
  reviewSentCnt: number; // 보낸 리뷰 수
  reviewReceivedCnt: number; // 받은 리뷰 수
  isPublishing: boolean; // 공개 여부
}

// 내 프로필 정보 조회
export const getMyProfile = async (): Promise<UserMeResponse> => {
  const response = await authApi.get('/users/me');
  const data = response.data;
  
  // 백엔드 응답 검증 및 정규화
  console.log('getMyProfile - 원본 응답 데이터:', data);
  console.log('getMyProfile - 원본 roles:', data.roles);
  
  // roles가 null이거나 undefined인 경우 빈 배열로 처리
  if (!data.roles || !Array.isArray(data.roles)) {
    console.warn('⚠️ 백엔드 응답에서 roles가 배열이 아닙니다:', data.roles);
    data.roles = [];
  } else {
    console.log('getMyProfile - roles 배열 길이:', data.roles.length);
    console.log('getMyProfile - roles 내용:', data.roles);
  }
  
  // profileType이 null이거나 undefined인 경우 기본값 설정
  // 백엔드가 null을 반환할 수 있으므로 명시적으로 처리
  if (data.profileType === null || data.profileType === undefined || data.profileType === '') {
    console.warn('⚠️ 백엔드 응답에서 profileType이 null/undefined입니다. 기본값 Type_1을 사용합니다.');
    data.profileType = 'Type_1'; // 기본값
  }
  
  // 필드명 변환 (snake_case -> camelCase)
  // 백엔드가 snake_case로 올 수도 있으므로 확인
  // null 체크를 명시적으로 수행 (null은 falsy이므로 !== null 체크 필요)
  if ((data.profileType === null || data.profileType === undefined) && (data as any).profile_type !== undefined) {
    data.profileType = (data as any).profile_type === null ? 'Type_1' : (data as any).profile_type;
  }
  if ((data.portfolioUrl === null || data.portfolioUrl === undefined) && (data as any).portfolio_url !== undefined) {
    data.portfolioUrl = (data as any).portfolio_url;
  }
  if ((data.portfolioPdfUrl === null || data.portfolioPdfUrl === undefined) && (data as any).portfolio_pdf_url !== undefined) {
    data.portfolioPdfUrl = (data as any).portfolio_pdf_url;
  }
  if (data.reviewSentCnt === undefined && (data as any).review_sent_cnt !== undefined) {
    data.reviewSentCnt = (data as any).review_sent_cnt;
  }
  if (data.reviewReceivedCnt === undefined && (data as any).review_received_cnt !== undefined) {
    data.reviewReceivedCnt = (data as any).review_received_cnt;
  }
  if (data.isPublishing === undefined && (data as any).is_publishing !== undefined) {
    data.isPublishing = (data as any).is_publishing;
  }
  
  // null 값을 빈 문자열로 변환 (프론트엔드 호환성)
  // introduction, portfolioUrl, portfolioPdfUrl은 null을 빈 문자열로 변환
  if (data.introduction === null) {
    data.introduction = '';
  }
  if (data.portfolioUrl === null) {
    data.portfolioUrl = '';
  }
  if (data.portfolioPdfUrl === null) {
    data.portfolioPdfUrl = '';
  }
  
  console.log('getMyProfile 응답 데이터 (정규화 후):', {
    userId: data.userId,
    nickname: data.nickname,
    roles: data.roles,
    rolesLength: data.roles?.length || 0,
    profileType: data.profileType,
    introduction: data.introduction,
    portfolioUrl: data.portfolioUrl,
    portfolioPdfUrl: data.portfolioPdfUrl,
  });
  
  return data;
};

