import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import apiClient from "@/lib/axios";
import { UserType } from "@/types/user.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface UserStoreInterface {
  userAll: UserType[];
  someUser: UserType;
  getAllUser: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStoreInterface>((set, get) => ({
  userAll: [],
  someUser: {} as UserType,
  getAllUser: async () => {
    try {
      const response: AxiosResponse<UserType[]> = await apiClient.get(`/users`);
      // console.log(response.data);
      set({ userAll: response.data });
    } catch (error) {
      CustomErrorToast({ text: "User get all erreur système" });
    }
  },

  getUserById: async (id: string) => {
    try {
      const response: AxiosResponse<UserType> = await apiClient.get(
        `/users/${id}`
      );
      // console.log(response.data);
      set({ someUser: response.data });
    } catch (error) {
      CustomErrorToast({ text: "User get all erreur système" });
    }
  },
}));
