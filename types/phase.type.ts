import { CategorieIngredientType, IngredientType } from "./ingredient.type";
import { RecipeType } from "./recipe.type";

export type PhaseType = {
  _id: string;
  nom: string;
  recipeId: RecipeType;
  createdAt: string;
  updatedAt: string;
  allowedCategories: CategorieIngredientType[];
};

export type PhaseCategorieIngredientsType = {
  _id: string;
  nom: string;
  categories: CategorieIngredientType[];
  ingredients: IngredientType[];
  ingredientsPossible: IngredientType[];
};
