import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendKakaoCodeToBackend } from "@api";
import { useAuthStore } from "@stores";

export function KakaoCallbackPage() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);
  const setTokens = useAuthStore((s) => s.setTokens);
  const setProfileComplete = useAuthStore((s) => s.setProfileComplete);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;

    sendKakaoCodeToBackend(code)
      .then((data) => {
        if (accessToken) {
          // 로컬스토리지에 토큰이 있으면 토큰 수정, 홈페이지로 이동
          setTokens(data.accessToken, data.refreshToken);
          setProfileComplete(data.profileComplete);
          navigate("/Home");
        } else {
          // 로컬스토리지에 토큰이 없으면 토큰 설정, 성공 페이지로 이동
          setTokens(data.accessToken, data.refreshToken);
          setProfileComplete(data.profileComplete);
          navigate("/auth/success");
        }
      })
      .catch(() => {
        navigate("/auth/error");
      });
  }, [navigate, setTokens]);

  return <div>카카오 로그인 처리 중...</div>;
}