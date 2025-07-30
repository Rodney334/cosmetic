export type CategorieIngredient = {
  _id: string;
  nom: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IngredientType = {
  _id: string;
  nom: string;
  inci: string;
  categorie: CategorieIngredient;
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
  __v: number;
  createdAt: string;
  updatedAt: string;
};
