import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendKakaoCodeToBackend } from "@api";

export function KakaoCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code) return;

        sendKakaoCodeToBackend(code)
            .then(() => {
                navigate("/");
            })
            .catch((e) => {
                alert(e.message);
            });
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
}