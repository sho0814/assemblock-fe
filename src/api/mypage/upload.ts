import { authApi } from '../client';

export interface UploadFileResponse {
  fileUrl: string;
}

export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await authApi.post<UploadFileResponse>('/mypage/upload', formData);
  return response.data;
};

  // FormData를 사용할 때는 Content-Type을 명시하지 않아야 합니다.
  // axios가 자동으로 boundary를 포함한 multipart/form-data Content-Type을 설정합니다.
  // 명시적으로 설정하면 boundary가 없어서 서버가 요청을 파싱하지 못합니다.