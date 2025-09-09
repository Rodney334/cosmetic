import { UserType } from "@/types/user.type";
import { create } from "zustand";

interface AuthStoreInterface {
  token: string;
  refreshToken: string;
  user: UserType;
  setToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  setUser: (value: UserType) => void;
  logout: () => void;
}

export const authStore = create<AuthStoreInterface>((set) => ({
  token: "",
  refreshToken: "",
  user: {} as UserType,
  setToken: (value: string) => set({ token: value }),
  setRefreshToken: (value: string) => set({ refreshToken: value }),
  setUser: (value: UserType) => set({ user: value }),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ token: "", refreshToken: "", user: {} as UserType });
    window.location.href = "/public/login";
  },
}));
