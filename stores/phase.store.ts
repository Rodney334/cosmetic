import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import apiClient from "@/lib/axios";
import { PhaseCategorieIngredientsType, PhaseType } from "@/types/phase.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface PhaseStoreInterface {
  phaseAll: PhaseType[];
  phases: PhaseCategorieIngredientsType[];
  getAllPhase: () => Promise<void>;
  getPhases: () => Promise<void>;
}

export const usePhaseStore = create<PhaseStoreInterface>((set, get) => ({
  phaseAll: [],
  phases: [],

  getAllPhase: async () => {
    try {
      const response: AxiosResponse<PhaseType[]> = await apiClient.get(
        `/phase`
      );
      // console.log(response.data);
      set({ phaseAll: response.data });
    } catch (error) {
      console.log("Phase erreur système");
    }
  },

  getPhases: async () => {
    try {
      const response: AxiosResponse<PhaseCategorieIngredientsType[]> =
        await apiClient.get("/phase/composition/all");
      // console.log(response.data);
      set({ phases: response.data });
    } catch (error) {
      console.log("Phase erreur système");
    }
  },
}));
