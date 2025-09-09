import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import apiClient from "@/lib/axios";
import { RecipeType } from "@/types/recipe.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface IngredientStoreInterface {
  recettes: RecipeType[];
  getAllRecette: () => Promise<void>;
}

export const useRecetteStore = create<IngredientStoreInterface>((set, get) => ({
  recettes: [],

  getAllRecette: async () => {
    try {
      const response = await apiClient.get(`/recipe`);
      // console.log(response.data);
      set({ recettes: response.data });
    } catch (error) {
      CustomErrorToast({ text: "Ingrédient erreur système" });
    }
  },
}));
