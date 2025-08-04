import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import { UserType } from "@/types/user.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface UserStoreInterface {
  userAll: UserType[];
  someUser: UserType;
  getAllUser: (token: string) => Promise<void>;
  getUserById: (token: string, id: string) => Promise<void>;
}

export const useUserStore = create<UserStoreInterface>((set, get) => ({
  userAll: [],
  someUser: {} as UserType,
  getAllUser: async (token: string) => {
    try {
      const response: AxiosResponse<UserType[]> = await axios.get(
        `${api.base_url}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      set({ userAll: response.data });
    } catch (error) {
      CustomErrorToast("User get all erreur système");
    }
  },

  getUserById: async (token: string, id: string) => {
    try {
      const response: AxiosResponse<UserType> = await axios.get(
        `${api.base_url}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      set({ someUser: response.data });
    } catch (error) {
      CustomErrorToast("User get all erreur système");
    }
  },
}));
