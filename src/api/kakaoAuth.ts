const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const REDIRECT_URI = `${window.location.origin}/callback`;

export function getKakaoLoginUrl() {
  const url = new URL("https://kauth.kakao.com/oauth/authorize");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", KAKAO_REST_API_KEY);
  url.searchParams.append("redirect_uri", REDIRECT_URI);
  return url.toString();
}

export async function sendKakaoCodeToBackend(code: string) {
  const res = await fetch(`${API_BASE_URL}/auth/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    throw new Error("카카오 로그인 진행 중 오류가 발생했습니다.");
  }
  return res.json();
}