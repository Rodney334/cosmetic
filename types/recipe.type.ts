import { CategorieIngredientType, IngredientType } from "./ingredient.type";

export type RecipeType = {
  _id: string;
  nom: string;
  description: string;
  auteurId: string;
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
