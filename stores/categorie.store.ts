import { api } from "@/constantes/api.constante";
import { CategorieIngredientType } from "@/types/ingredient.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface CategoryStoreInterface {
  categories: CategorieIngredientType[];
  getAllCategory: (token: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreInterface>((set, get) => ({
  categories: [],

  getAllCategory: async (token: string) => {
    try {
      const response = await axios.get(`${api.base_url}/ingredientcategorie/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("category : ", response.data);
      set({ categories: response.data });
    } catch (error) {}
  },
}));
