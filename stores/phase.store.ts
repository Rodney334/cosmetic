import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import { PhaseType } from "@/types/phase.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface IngredientStoreInterface {
  phaseAll: PhaseType[];
  getAllPhase: (token: string) => Promise<void>;
}

export const usePhaseStore = create<IngredientStoreInterface>((set, get) => ({
  phaseAll: [],

  getAllPhase: async (token: string) => {
    try {
      const response: AxiosResponse<PhaseType[]> = await axios.get(
        `${api.base_url}/phase`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      set({ phaseAll: response.data });
    } catch (error) {
      CustomErrorToast("Phase erreur système");
    }
  },
}));
