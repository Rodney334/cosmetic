export type CategorieIngredientType = {
  _id: string;
  nom: string;
  ingredients: IngredientType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IngredientType = {
  isQSP?: boolean;
  _id: string;
  nom: string;
  inci: string;
  categorie: CategorieIngredientType;
  forme: string;
  description: string;
  unitesDisponibles: string[];
  origine: string;
  fonction: string[];
  exemplesUtilisation: string;
  dosageRecommande: string;
  solubilite: string;
  remarques: string;
  devise: string;
  quantite: any;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type IngredientByCategorieType = {
  category: CategorieIngredientType;
  ingredients: IngredientType[];
};
