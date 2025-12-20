import { authApi } from '../client';

// 프로필 정보 수정 요청 타입
// PUT /api/mypage/profile
export interface UpdateProfileRequest {
  nickname?: string; // 변경할 닉네임
  portfolioUrl?: string; // 변경할 포트폴리오 URL
  introduction?: string; // 변경할 자기소개
  mainRoles?: string[]; // 주 역할 목록 예: ["Plan"]
  profileType?: string; // 프로필 이미지 타입 예: "Type_1"
  portfolioPdfUrl?: string; // 변경할 pdf URL
}

// 프로필 정보 수정 응답 타입
export interface UpdateProfileResponse {
  nickname: string; // 닉네임
  profileType: string; // 프로필 타입
  portfolioUrl?: string; // 포트폴리오 URL
  introduction?: string; // 한 줄 자기소개
  mainRoles: string[]; // 주 역할 목록
  portfolioPdfUrl?: string; // 포트폴리오 pdf URL
  reviewSentCnt: number; // 보낸 후기 수
  reviewReceivedCnt: number; // 받은 후기 수
}

// 프로필 정보 타입 정의 (프론트엔드에서 사용)
export interface ProfileInfo {
  nickname: string;
  introduction?: string;
  selectedParts: string[]; // ['planning', 'design', 'frontend', 'backend', 'pm']
  portfolioUrl?: string;
  portfolioPdfUrl?: string;
  portfolioFileName?: string;
  profileType?: string;
}

// 내 프로필 정보 수정
// PUT /api/mypage/profile
export const updateMyProfile = async (profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  // 백엔드 형식에 맞게 dto와 file을 분리
  const { portfolioPdfUrl, ...dtoData } = profileData;
  
  // portfolioPdfUrl이 URL인지 base64인지 확인
  // URL이면 dto에만 포함, base64면 file 필드에도 포함
  const isUrl = portfolioPdfUrl && (portfolioPdfUrl.startsWith('http://') || portfolioPdfUrl.startsWith('https://'));
  
  // 필수 필드 검증
  if (!dtoData.nickname || dtoData.nickname.trim() === '') {
    throw new Error('닉네임은 필수입니다.');
  }
  if (!dtoData.mainRoles || dtoData.mainRoles.length === 0) {
    throw new Error('mainRoles는 최소 1개 이상 필요합니다.');
  }
  if (!dtoData.profileType) {
    throw new Error('profileType은 필수입니다.');
  }
  
  // signup API와 동일한 형식으로 요청 본문 생성 (JSON 형식)
  // 백엔드가 JSON을 기대하므로 FormData가 아닌 JSON으로 전송
  // signup과 동일한 필드명 사용: roles, userProfileType
  const requestBody: any = {
    nickname: dtoData.nickname.trim(),
    roles: dtoData.mainRoles || [], // signup과 동일하게 'roles' 필드명 사용 (mainRoles가 아님), 빈 배열 방지
    userProfileType: dtoData.profileType || 'Type_1', // signup과 동일하게 'userProfileType' 필드명 사용, 기본값 설정
  };
  
  // roles와 userProfileType이 제대로 설정되었는지 확인
  if (!requestBody.roles || requestBody.roles.length === 0) {
    console.error('⚠️ roles가 비어있습니다. mainRoles:', dtoData.mainRoles);
    throw new Error('roles는 최소 1개 이상 필요합니다.');
  }
  if (!requestBody.userProfileType) {
    console.error('⚠️ userProfileType이 없습니다. profileType:', dtoData.profileType);
    throw new Error('userProfileType은 필수입니다.');
  }
  
  // introduction은 signup에서 필수이지만 update에서는 선택적일 수 있음
  // 값이 있으면 추가, 없으면 제외 (null이나 빈 문자열 제외)
  if (dtoData.introduction && dtoData.introduction.trim() !== '') {
    requestBody.introduction = dtoData.introduction.trim();
  }
  
  // portfolioUrl과 portfolioPdfUrl은 선택적 필드
  if (dtoData.portfolioUrl && dtoData.portfolioUrl.trim() !== '') {
    requestBody.portfolioUrl = dtoData.portfolioUrl.trim();
  }
  if (portfolioPdfUrl && portfolioPdfUrl.trim() !== '') {
    requestBody.portfolioPdfUrl = portfolioPdfUrl;
  }
  
  // 디버깅: 요청 데이터 로그
  console.log('updateMyProfile 요청 데이터:', {
    requestBody,
    원본데이터: {
      nickname: dtoData.nickname,
      mainRoles: dtoData.mainRoles,
      profileType: dtoData.profileType,
      introduction: dtoData.introduction,
    },
    변환된데이터: {
      roles: requestBody.roles,
      userProfileType: requestBody.userProfileType,
    },
    portfolioPdfUrl,
    isUrl,
    portfolioPdfUrlType: typeof portfolioPdfUrl,
    portfolioPdfUrlLength: portfolioPdfUrl?.length,
  });
  console.log('updateMyProfile 요청 본문 (JSON):', JSON.stringify(requestBody, null, 2));
  
  try {
    // signup과 동일한 형식: JSON으로 전송
    const response = await authApi.put('/mypage/profile', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('updateMyProfile 응답 (원본):', response.data);
    
    // 응답 데이터 검증 및 정규화
    const responseData = response.data;
    
    // 백엔드 응답 형식 확인: roles로 올 수도 있고 mainRoles로 올 수도 있음
    if (!responseData.mainRoles && responseData.roles) {
      console.log('ℹ️ 백엔드 응답에 mainRoles가 없고 roles가 있습니다. roles를 mainRoles로 변환합니다.');
      responseData.mainRoles = responseData.roles;
    }
    
    // 백엔드 응답 형식 확인: userProfileType으로 올 수도 있고 profileType으로 올 수도 있음
    if (!responseData.profileType && responseData.userProfileType) {
      console.log('ℹ️ 백엔드 응답에 profileType이 없고 userProfileType이 있습니다. userProfileType을 profileType으로 변환합니다.');
      responseData.profileType = responseData.userProfileType;
    }
    
    // 백엔드가 null을 반환한 경우 요청 데이터를 fallback으로 사용
    if (!responseData.profileType || responseData.profileType === null) {
      console.warn('⚠️ 백엔드 응답에서 profileType이 null입니다. 요청 데이터를 fallback으로 사용합니다.');
      console.warn('⚠️ 요청한 userProfileType:', requestBody.userProfileType);
      responseData.profileType = requestBody.userProfileType || dtoData.profileType || 'Type_1';
    }
    
    if (!responseData.mainRoles || responseData.mainRoles.length === 0) {
      console.warn('⚠️ 백엔드 응답에서 mainRoles가 비어있습니다. 요청 데이터를 fallback으로 사용합니다.');
      console.warn('⚠️ 요청한 roles:', requestBody.roles);
      responseData.mainRoles = requestBody.roles || dtoData.mainRoles || [];
    }
    
    // 최종 검증: 여전히 null이면 에러
    if (!responseData.profileType || responseData.profileType === null) {
      throw new Error('프로필 타입을 저장할 수 없습니다. 백엔드 로그를 확인해주세요.');
    }
    if (!responseData.mainRoles || responseData.mainRoles.length === 0) {
      throw new Error('역할을 저장할 수 없습니다. 백엔드 로그를 확인해주세요.');
    }
    
    console.log('updateMyProfile 응답 (정규화 후):', {
      nickname: responseData.nickname,
      profileType: responseData.profileType,
      mainRoles: responseData.mainRoles,
      introduction: responseData.introduction,
      portfolioUrl: responseData.portfolioUrl,
      portfolioPdfUrl: responseData.portfolioPdfUrl,
    });
    
    return responseData;
  } catch (error: any) {
    console.error('updateMyProfile API 에러:', error);
    console.error('에러 응답:', error?.response);
    console.error('에러 상태 코드:', error?.response?.status);
    console.error('에러 응답 데이터:', error?.response?.data);
    console.error('요청한 requestBody:', requestBody);
    throw error; // 에러를 다시 throw하여 상위에서 처리
  }
};


