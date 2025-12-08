import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendKakaoCodeToBackend } from "@api";
import { useAuthStore } from "@stores";

export function KakaoCallbackPage() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;

    sendKakaoCodeToBackend(code)
      .then((data) => {
        setTokens(data.accessToken, data.refreshToken);
        navigate(`/auth/success/${encodeURIComponent(data.profileComplete)}`);
      })
      .catch(() => {
        navigate("/auth/error");
      });
  }, [navigate, setTokens]);

  return <div>카카오 로그인 처리 중...</div>;
}