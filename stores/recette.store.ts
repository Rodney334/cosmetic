import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import { RecipeType } from "@/types/recipe.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface IngredientStoreInterface {
  recettes: RecipeType[];
  getAllRecette: (token: string) => Promise<void>;
}

export const useRecetteStore = create<IngredientStoreInterface>((set, get) => ({
  recettes: [],

  getAllRecette: async (token: string) => {
    try {
      const response = await axios.get(`${api.base_url}/recipe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      set({ recettes: response.data });
    } catch (error) {
      CustomErrorToast("Ingrédient erreur système");
    }
  },
}));
