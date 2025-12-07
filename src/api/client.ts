import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@stores";

// 엑세스토큰 필요없는 api
// import api from '@api';
// const fetchbBlocks = () => api.get('/blocks');
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 엑세스토큰 필요한 api
// import authApi from '@api';
// const fetchUserBlocks = () => apiAuth.get('/user/blocks');
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ----- 요청 인터셉터: accessToken 붙이기 -----
authApi.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// ----- refresh 토큰 관련 상태 -----
let isRefreshing = false;
let failedQueue: {
    resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
    reject: (error: any) => void;
}[] = [];

// queue 처리 유틸
const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(authApi(prom as any));
        }
    });
    failedQueue = [];
};

// ----- refresh 요청 함수 -----
const refreshAccessToken = async () => {
    const { refreshToken, setTokens, logout } = useAuthStore.getState();
    if (!refreshToken) {
        logout();
        throw new Error("No refresh token");
    }

    // refresh 토큰으로 재발급 요청 (엔드포인트는 백엔드에 맞게 변경)
    const res = await api.post("/auth/refresh", { refreshToken });

    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken ?? refreshToken;

    setTokens(newAccessToken, newRefreshToken);
    return newAccessToken;
};

// ----- 응답 인터셉터: 401 시 refresh & 재시도 -----
authApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const { logout } = useAuthStore.getState();
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // 401 아니면 그대로 에러 반환
        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        // 이미 한 번 재시도한 요청이면 더 이상 시도하지 않고 로그아웃
        if (originalRequest._retry) {
            logout();
            return Promise.reject(error);
        }
        originalRequest._retry = true;

        // refresh 진행 중이면 queue에 넣고 기다렸다가 재시도
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (res) => resolve(res),
                    reject: (err) => reject(err),
                });
            });
        }

        // refresh 진행 시작
        isRefreshing = true;

        try {
            const newAccessToken = await refreshAccessToken();

            // Authorization 헤더 갱신 후, 실패한 원 요청 재시도
            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            } else {
                originalRequest.headers = { Authorization: `Bearer ${newAccessToken}` };
            }

            processQueue(null, newAccessToken);

            return authApi(originalRequest);
        } catch (refreshError) {
            // refresh 실패 → 전체 로그아웃 및 queue 실패 처리
            logout();
            processQueue(refreshError as AxiosError, null);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);
