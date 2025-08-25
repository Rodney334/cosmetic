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
  ingredientQSP: IngredientType[];
  getAllIngredient: (token: string) => Promise<void>;
  groupIngredientsByCategory: (token: string) => Promise<void>;
  getIngredientQSP: (token: string) => Promise<void>;
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
    ingredientQSP: [],

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
        console.log("Ingrédient erreur système");
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
        console.log("Ingrédient par groupe erreur système");
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
        console.log("Catégorie par phase erreur système");
        return [];
      }
    },

    getIngredientQSP: async (token: string) => {
      try {
        const response: AxiosResponse<IngredientType[]> = await axios.get(
          `${api.base_url}/ingredient/qsp`, // Adaptez l'URL selon votre API
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        set({ ingredientQSP: response.data });
      } catch (error) {
        console.log("Erreur lors de la récupération des ingrédients QSP");
      }
    },
  })
);
