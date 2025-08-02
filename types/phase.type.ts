import { RecipeType } from "./recipe.type";

export type PhaseType = {
  _id: string;
  nom: string;
  recipeId: RecipeType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
