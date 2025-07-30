import { CustomErrorToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import { IngredientType } from "@/types/ingredient.type";
import axios from "axios";
import { create } from "zustand";

interface IngredientStoreInterface {
  ingredientAll: IngredientType[];
  ingredientsByCategoryMap: Map<string, IngredientType[]>;
  getAllIngredient: (token: string) => Promise<void>;
  groupIngredientsByCategoryMap: () => void;
}

export const useIngredientStore = create<IngredientStoreInterface>(
  (set, get) => ({
    ingredientAll: [],
    ingredientsByCategoryMap: new Map(),

    getAllIngredient: async (token: string) => {
      try {
        const response = await axios.get(`${api.base_url}/ingredient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        set({ ingredientAll: response.data });
      } catch (error) {
        CustomErrorToast("Ingrédient erreur système");
      }
    },

    groupIngredientsByCategoryMap: () => {
      const { ingredientAll } = get();
      if (ingredientAll.length === 0) return new Map<"", []>();
      const ingredientMap = ingredientAll.reduce((map, ingredient) => {
        const categoryName = ingredient.categorie.nom;

        if (!map.has(categoryName)) {
          map.set(categoryName, []);
        }

        map.get(categoryName)!.push(ingredient);
        return map;
      }, new Map<string, IngredientType[]>());
      console.log("ingredientMap:", ingredientMap);
      set({ ingredientsByCategoryMap: ingredientMap });
    },
  })
);
