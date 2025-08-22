import { CategorieIngredientType, IngredientType } from "./ingredient.type";
import { UserType } from "./user.type";

export type RecipeType = {
  _id: string;
  nom: string;
  description: string;
  auteurId: UserType;
  poidsTotal: number;
  devise: string;
  dateCreation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PhaseData = {
  id: string;
  title: string;
  ingredients: IngredientType[];
  allowedCategories: CategorieIngredientType[];
};

export type RecipeResult = {
  message: string;
  data: {
    recette: {
      nom: string;
      poidsCible: number;
      dateCreation: string; // ou Date si vous convertissez en objet Date
    };
    tableau: Array<{
      phase: string;
      type: string;
      ingredient: string;
      pourcentage: number;
      g: number;
      gouttes?: number; // optionnel car certains ingrédients n'ont pas de gouttes
      prix: number;
      devise: string;
    }>;
    totaux: {
      prixTotal: number;
      masseTotale: number;
      volumeTotal: number;
      ecartPoids: number;
    };
    warnings: string[];
  };
};
