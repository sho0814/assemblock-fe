// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // sessionStorage 영속화

interface AuthState {
  accessToken: string | null;
  user: { id: string; nickname: string } | null;
  setToken: (token: string | null) => void;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      setToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      logout: () => {
        set({ accessToken: null, user: null });
        sessionStorage.removeItem('zustand'); // persist 플러그인 이름
      },
    }),
    { name: 'auth-storage' } // sessionStorage 키
  )
);
