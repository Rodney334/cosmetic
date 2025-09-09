import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import apiClient from "@/lib/axios";
import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface IngredientStoreInterface {
  ingredientAll: IngredientType[];
  ingredientsByCategory: IngredientByCategorieType[];
  ingredientsByPhase: IngredientByCategorieType[];
  ingredientQSP: IngredientType[];
  getAllIngredient: () => Promise<void>;
  groupIngredientsByCategory: () => Promise<void>;
  getIngredientQSP: () => Promise<void>;
  groupIngredientsByPhase: (phaseId: string) => Promise<IngredientType[]>;
}

export const useIngredientStore = create<IngredientStoreInterface>(
  (set, get) => ({
    ingredientAll: [],
    ingredientsByCategory: [],
    ingredientsByPhase: [],
    ingredientQSP: [],

    getAllIngredient: async () => {
      try {
        const response = await apiClient.get(`/ingredient`);
        // console.log(response.data);
        set({ ingredientAll: response.data });
      } catch (error) {
        console.log("Ingrédient erreur système");
      }
    },

    groupIngredientsByCategory: async () => {
      try {
        const response: AxiosResponse<IngredientByCategorieType[]> =
          await apiClient.get(`/ingredientcategorie/grouped-by-category`);
        // console.log(response.data);
        const sortedData = response.data.sort((a, b) =>
          a.category.nom.localeCompare(b.category.nom, "fr", {
            sensitivity: "base",
          })
        );
        set({ ingredientsByCategory: sortedData });
      } catch (error) {
        console.log("Ingrédient par groupe erreur système");
      }
    },

    groupIngredientsByPhase: async (phaseId: string) => {
      try {
        const response: AxiosResponse<IngredientType[]> = await apiClient.get(
          `/phase/${phaseId}/allowed-ingredients`
        );
        // console.log(response.data);
        const sortedData = response.data.sort((a, b) =>
          a.categorie.nom.localeCompare(b.categorie.nom, "fr", {
            sensitivity: "base",
          })
        );
        return sortedData;
      } catch (error) {
        console.log("Catégorie par phase erreur système");
        return [];
      }
    },

    getIngredientQSP: async () => {
      try {
        const response: AxiosResponse<IngredientType[]> = await apiClient.get(
          "/ingredient/qsp"
        );
        set({ ingredientQSP: response.data });
      } catch (error) {
        console.log("Erreur lors de la récupération des ingrédients QSP");
      }
    },
  })
);
