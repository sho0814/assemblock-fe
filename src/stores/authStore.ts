// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  profileComplete: boolean;
  setTokens: (access: string | null, refresh: string | null) => void;
  setProfileComplete: (complete: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      profileComplete: false,
      setTokens: (access, refresh) => set({ accessToken: access, refreshToken: refresh }),
      setProfileComplete: (complete) => set({ profileComplete: complete }),
      logout: () => set({ accessToken: null, refreshToken: null, profileComplete: false }),
    }),
    {
      name: "auth-storage", // 로컬스토리지 키 이름
    }
  )
);
