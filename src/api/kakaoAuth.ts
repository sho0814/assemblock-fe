import { api } from "@api";
import type { KakaoUserJwt } from "@types";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const REDIRECT_URI = `${window.location.origin}/callback`;

export function getKakaoLoginUrl() {
  const url = new URL("https://kauth.kakao.com/oauth/authorize");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", KAKAO_REST_API_KEY);
  url.searchParams.append("redirect_uri", REDIRECT_URI);
  return url.toString();
}

export const sendKakaoCodeToBackend = async (code: string): Promise<KakaoUserJwt> => {
  const requestBody = { "authorizationCode": code };
  console.log('Request JSON body:', requestBody);
  const response = await api.post('/auth/kakao', requestBody);
  if (response.status !== 200) {
    throw new Error('Send Kakao code to backend failed');
  }
  return response.data;
};
