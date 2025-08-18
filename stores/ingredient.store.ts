import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
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
  getAllIngredient: (token: string) => Promise<void>;
  groupIngredientsByCategory: (token: string) => Promise<void>;
  groupIngredientsByPhase: (
    token: string,
    phaseId: string
  ) => Promise<IngredientType[]>;
}

export const useIngredientStore = create<IngredientStoreInterface>(
  (set, get) => ({
    ingredientAll: [],
    ingredientsByCategory: [],
    ingredientsByPhase: [],

    getAllIngredient: async (token: string) => {
      try {
        const response = await axios.get(`${api.base_url}/ingredient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        set({ ingredientAll: response.data });
      } catch (error) {
        CustomErrorToast("Ingrédient erreur système");
      }
    },

    groupIngredientsByCategory: async (token: string) => {
      try {
        const response: AxiosResponse<IngredientByCategorieType[]> =
          await axios.get(
            `${api.base_url}/ingredientcategorie/grouped-by-category`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        // console.log(response.data);
        const sortedData = response.data.sort((a, b) =>
          a.category.nom.localeCompare(b.category.nom, "fr", {
            sensitivity: "base",
          })
        );
        set({ ingredientsByCategory: sortedData });
      } catch (error) {
        CustomErrorToast("Ingrédient par groupe erreur système");
      }
    },

    groupIngredientsByPhase: async (token: string, phaseId: string) => {
      try {
        const response: AxiosResponse<IngredientType[]> = await axios.get(
          `${api.base_url}/phase/${phaseId}/allowed-ingredients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        const sortedData = response.data.sort((a, b) =>
          a.categorie.nom.localeCompare(b.categorie.nom, "fr", {
            sensitivity: "base",
          })
        );
        return sortedData;
      } catch (error) {
        CustomErrorToast("Catégorie par phase erreur système");
        return [];
      }
    },
  })
);
