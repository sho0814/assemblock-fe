// Splash.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@api';
import { getKakaoLoginUrl } from '@api';
import { useAuthStore } from '@stores';
import Lottie from 'lottie-react';
import splashAnimation from '@assets/animations/splash.json';

export const Splash = () => {
    const navigate = useNavigate();
    const { accessToken, refreshToken, profileComplete } = useAuthStore();
    const [isSplash, setIsSplash] = useState(true);

    const checkAuthAndRedirect = async () => {
        // 최소 스플래시 표시 시간 보장
        await new Promise(resolve => setTimeout(resolve, 4000));

        // 1. 토큰 전혀 없음 → 온보딩
        if (!accessToken && !refreshToken) {
            navigate('/onboarding', { replace: true });
            return;
        }
        try {
            // 2. authApi 호출 → 인터셉터가 자동으로 토큰 검증/refresh 처리
            await authApi.get('/users/me');

            // 성공 → 프로필 상태에 따라 리다이렉트
            navigate(profileComplete ? '/Home' : '/onboarding/profileName', { replace: true });

        } catch (error: any) {
            // 3. 인터셉터가 처리 후에도 실패 (여기로 오면 뭔가 잘못된거) → 카카오 로그인
            const url = getKakaoLoginUrl();
            window.location.href = url;
        }
    };

    useEffect(() => {
        checkAuthAndRedirect();
    }, []);

    const handleAnimationComplete = () => {
        setIsSplash(false);
    };
    if (isSplash) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            }}>
                <Lottie
                    animationData={splashAnimation}
                    loop={false}
                    autoplay
                    onComplete={handleAnimationComplete}
                />
            </div>
        );
    }
    return null;
};

export default Splash;
