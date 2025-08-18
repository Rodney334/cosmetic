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
