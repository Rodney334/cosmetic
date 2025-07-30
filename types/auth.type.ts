export type RegisterDataType = {
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  password: string;
  genre: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
};

export type LoginDataType = {
  email: string;
  password: string;
};
