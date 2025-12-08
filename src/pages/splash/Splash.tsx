// Splash.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores';
import Lottie from 'lottie-react';
import splashAnimation from '@assets/animations/splash.json';

export const Splash = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            // 최소 스플래시 표시 시간 (2초) 보장
            await new Promise(resolve => setTimeout(resolve, 3200));

            // 토큰 존재 여부로 리다이렉트
            if (accessToken) {
                navigate('/Home', { replace: true });
            } else {
                navigate('/onboarding', { replace: true });
            }
        };

        checkAuthAndRedirect();
    }, [accessToken, navigate]);

    const [isSplash, setIsSplash] = useState(true);

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
                    onComplete={handleAnimationComplete} // 애니메이션 완료 시 콜백
                />
            </div>
        );
    }
    return null; // 애니메이션이 끝난 후에는 아무것도 렌더링하지 않음
};

export default Splash;
