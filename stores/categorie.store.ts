import { api } from "@/constantes/api.constante";
import apiClient from "@/lib/axios";
import { CategorieIngredientType } from "@/types/ingredient.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface CategoryStoreInterface {
  categories: CategorieIngredientType[];
  getAllCategory: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreInterface>((set, get) => ({
  categories: [],

  getAllCategory: async () => {
    try {
      const response = await apiClient.get(`/ingredientcategorie/`);
      // console.log("category : ", response.data);
      set({ categories: response.data });
    } catch (error) {}
  },
}));
