import React, { useEffect, useState } from "react";
import {
  Calculator,
  Save,
  Copy,
  FileText,
  FileSpreadsheet,
  Camera,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { useIngredientStore } from "@/stores/ingredient.store";
import { usePhaseStore } from "@/stores/phase.store";
import { RecetteTab } from "@/components/RecetteTabComponent";
import { PhaseData, RecipeResult, RecipeType } from "@/types/recipe.type";
import { PhaseCategorieIngredientsType, PhaseType } from "@/types/phase.type";
import {
  CategorieIngredientType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseTab } from "@/components/PhaseTabComponent";
import {
  CustomErrorToast,
  CustomSuccessToast,
  CustomToast,
} from "@/components/CustomToast";
import axios from "axios";
import { api } from "@/constantes/api.constante";
import QSPSelect from "@/components/QSPSelect";
import { IngredientTab } from "@/components/IngredientTabComponent";
import { authStore } from "@/stores/auth.store";
import apiClient from "@/lib/axios";

const NewRecipe = () => {
  const { token, refreshToken } = authStore();
  const { phases, getPhases } = usePhaseStore();

  const {
    ingredientsByCategory,
    ingredientQSP,
    ingredientAll,
    getIngredientQSP,
    getAllIngredient,
    groupIngredientsByCategory,
  } = useIngredientStore();

  const { phaseAll, getAllPhase } = usePhaseStore();

  // Structure des phases avec lignes vides par défaut
  const [phaseData, setPhaseData] = useState<PhaseData[]>([]);
  const [QSPphase, setQSPphase] = useState<PhaseCategorieIngredientsType>();
  const [QSP, setQSP] = useState<IngredientType>();
  const [phaseIngredient, setPhaseIngretient] = useState<IngredientType[]>([]);
  const [recipeResult, setRecipeResult] = useState<RecipeResult>();

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [totalQuantity, setTotalQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("g");
  const [hotRecipe, setHotRecipe] = useState<boolean>(false);
  const [coldRecipe, setColdRecipe] = useState<boolean>(false);
  const [searchIngredient, setSearchIngredient] = useState<string>("");

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [haveLocalStorage, setHaveLocalStorage] = useState<boolean>(false);
  const [haveQSP, setHaveQSP] = useState<boolean>(false);
  const [resetQSP, setResetQSP] = useState<boolean>(false);
  const [switcher, setSwitcher] = useState<boolean>(false);

  // new state
  const [activeTab, setActiveTab] = useState<string>("Tous");
  const [ingredient, setIngretient] = useState<IngredientType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPhase, setCurrentPhase] =
    useState<PhaseCategorieIngredientsType | null>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);

  useEffect(() => {
    const checkTokenIsValid = async () => {
      console.log({ token });
      try {
        await apiClient.get("/auth/verify-token");
        setTokenIsValid(true);
      } catch (error: any) {
        setTokenIsValid(false);
        console.log({ error });
      }
    };
    if (token) {
      checkTokenIsValid();
    }
  }, [token, refreshToken]);

  useEffect(() => {
    if (token && tokenIsValid) {
      console.log({ token, tokenIsValid });
      getPhases();
      getIngredientQSP();
    }
  }, [token, tokenIsValid]);

  // useEffect(() => {
  //   if (phases?.length > 0 && phaseData.length === 0) {
  //     console.log("initialisation de phase data");
  //     const initialPhaseData = [
  //       // Phase QSP toujours en première position
  //       {
  //         id: "0",
  //         title: "QSP",
  //         ingredients: [],
  //         allowedCategories: [],
  //       },
  //       // Puis les phases de l'API
  //       ...phases.map((el) => ({
  //         id: el._id,
  //         title: el.nom,
  //         ingredients: [],
  //         allowedCategories: el.categories,
  //       })),
  //     ];
  //     setPhaseData(initialPhaseData);
  //   }
  // }, [phases]);

  // useEffect(() => {
  //   if (phases && phases.length > 0) {
  //     setCurrentPhase(phases[0]);
  //     setActiveTab(phases[0]._id);
  //     setIngretient(phases[0].ingredientsPossible);
  //   }
  // }, [phases]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      setIngretient(currentPhase!.ingredients);
      return;
    }
    console.log({ value });
    setIngretient(
      currentPhase!.ingredientsPossible.filter((el) =>
        el.nom.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const localRecette = localStorage.getItem("currentRecette");
    const localResult = localStorage.getItem("currentResult");
    const localPhaseData = localStorage.getItem("phaseData");
    const localQSP = localStorage.getItem("currentQSP");
    if (localRecette || localResult || localPhaseData || localQSP) {
      setHaveLocalStorage(true);
    } else {
      setHaveLocalStorage(false);
    }
  }, []);

  useEffect(() => {
    const localRecette = localStorage.getItem("currentRecette");
    const localResult = localStorage.getItem("currentResult");
    const localPhaseData = localStorage.getItem("phaseData");
    const localQSP = localStorage.getItem("currentQSP");
    const QSP = localStorage.getItem("QSP");
    if (haveLocalStorage && localRecette) {
      const data: RecipeType = JSON.parse(localRecette);
      setRecipeName(data.nom);
      setDescription(data.description);
      setTotalQuantity(data.poidsTotal.toString());
    }

    if (haveLocalStorage && localQSP && QSP) {
      const QSP_data: PhaseCategorieIngredientsType = JSON.parse(localQSP);
      const qspData: IngredientType = JSON.parse(QSP);
      setQSP(qspData);
      setQSPphase(QSP_data);
      setHaveQSP(true);
    }

    if (haveLocalStorage && localPhaseData) {
      const phase_data: PhaseData[] = JSON.parse(localPhaseData);
      setPhaseData(phase_data);
    }

    if (haveLocalStorage && localResult) {
      const result_data: RecipeResult = JSON.parse(localResult);
      setRecipeResult(result_data);
    }
    // else {
    //   setRecipeName("");
    //   setDescription("");
    //   setTotalQuantity("");
    //   setPhaseData([]);
    //   setQSPphase(undefined);
    //   setHaveQSP(false);
    //   setRecipeResult(undefined);
    // localStorage.removeItem("currentRecette");
    // }
  }, [haveLocalStorage]);

  useEffect(() => {
    if (QSPphase && QSP && phases.length > 0) {
      console.log({ QSP });
      addIngredientToPhase("0", QSP);
    }
  }, [QSP, QSPphase, phases]);

  // Pour ajouter un ingrédient à une phase spécifique
  const addIngredientToPhase = async (
    phaseId: string,
    ingredient: IngredientType
  ) => {
    console.log("called");
    console.log({ phaseId, ingredient, QSP });
    setPhaseData((prev) => {
      console.log({ phasedatalength: prev.length });
      if (prev.length === 0) {
        const newIngredient = { ...ingredient, quantite: 100 };
        console.log("after new ingredient");

        // initialize phaseData
        const initialPhaseData = [
          // Phase QSP toujours en première position
          {
            id: "0",
            title: "QSP",
            ingredients: [newIngredient],
            allowedCategories: [],
          },
          // Puis les phases de l'API
          ...phases.map((el) => ({
            id: el._id,
            title: el.nom,
            ingredients: [],
            allowedCategories: el.categories,
          })),
        ];

        console.log({ initialPhaseData, phases });

        return initialPhaseData;
      }
      return prev.map((phase) => {
        if (phase.id !== phaseId) return phase;

        // Pour la phase QSP, on force la quantité à 100
        const newIngredient =
          phaseId === "0" ? { ...ingredient, quantite: 100 } : ingredient;
        console.log("after new ingredient");
        return {
          ...phase,
          ingredients:
            phaseId === "0"
              ? [newIngredient]
              : [...phase.ingredients, newIngredient],
        };
      });
    });
  };

  // Pour ajouter un ingrédient à une phase spécifique
  const resertReceipePhase = async () => {
    setPhaseData((prev) =>
      prev.map((phase) => {
        return { ...phase, ingredients: [] };
      })
    );
  };

  // Pour retirer un ingrédient à une phase spécifique
  const removeIngredientFromPhase = async (
    phaseId: string,
    ingredient: IngredientType
  ) => {
    try {
      setPhaseData((prev) =>
        prev.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                ingredients: phase.ingredients.filter(
                  (ing) => ing._id !== ingredient._id
                ),
              }
            : phase
        )
      );

      const localRecette = localStorage.getItem("currentRecette");
      if (localRecette) {
        const currentRecette = JSON.parse(localRecette);
        const response = await apiClient.delete(
          `/recipeingredient/recipes/${currentRecette._id}/ingredients/${ingredient._id}`
        );
        console.log({ delete: response.data });
      }
      CustomToast({ success: true, text: "Ingrédient supprimé" });
    } catch (error: any) {
      console.log("error :", error.response.data);
    }
  };

  const updateIngredientQuantity = (
    phaseId: string,
    ingredientId: string,
    newQuantity: string // Changé de number à string
  ) => {
    console.log({ newQuantity });
    setPhaseData((prevPhases) => {
      // Fonction helper pour limiter à 2 décimales
      const toTwoDecimals = (num: number) => parseFloat(num.toFixed(2));

      if (Number(newQuantity) > 100) return prevPhases;

      // 1. Validation initiale
      if (phaseId === "0") return prevPhases;

      const qspPhase = prevPhases.find((phase) => phase.id === "0");
      if (!qspPhase?.ingredients.length) return prevPhases;
      const [qspIngredient] = qspPhase.ingredients;

      // 2. Convertir la string en nombre
      const numericQuantity = newQuantity;
      if (!/^[0-9]*[,.]?[0-9]*$/.test(numericQuantity)) {
        return prevPhases; // Si la conversion échoue
      }

      // 3. Trouver l'ingrédient cible
      const targetPhase = prevPhases.find((phase) => phase.id === phaseId);
      const targetIngredient = targetPhase?.ingredients.find(
        (ing) => ing._id === ingredientId
      );
      if (!targetIngredient) return prevPhases;

      // Formatage de l'ancienne quantité
      const oldQuantity = targetIngredient.quantite || 0;

      // 4. Calcul des nouvelles valeurs (avec formatage)
      let newQspQuantity = qspIngredient.quantite;
      const finalQuantity = newQuantity;

      // Cas normal
      const quantityDiff = toTwoDecimals(Number(finalQuantity) - oldQuantity);
      newQspQuantity = toTwoDecimals(qspIngredient.quantite - quantityDiff);

      // 5. Validation des limites (seulement pour QSP)
      if (newQspQuantity < 0 || newQspQuantity > 100) {
        return prevPhases;
      }

      // 6. Mise à jour
      return prevPhases.map((phase) => {
        if (phase.id === phaseId) {
          const updatedIngredients = phase.ingredients.map((ingredient) => {
            return ingredient._id === ingredientId
              ? { ...ingredient, quantite: finalQuantity }
              : ingredient;
          });

          return { ...phase, ingredients: updatedIngredients };
        }

        if (phase.id === "0") {
          return {
            ...phase,
            ingredients: [{ ...qspIngredient, quantite: newQspQuantity }],
          };
        }

        return phase;
      });
    });
  };

  const createRecipe = async () => {
    try {
      setIsCreating(true);
      if (!recipeName || !description || !totalQuantity) {
        CustomToast({
          success: false,
          text: "Tous les champs sont obligatoires et la quantité totale ne peut pas être zéro.",
        });
        return;
      }
      const data = {
        nom: recipeName,
        description: description,
        poidsTotal: Number(totalQuantity.replace(",", ".")),
      };
      console.log(data);
      const response = await apiClient.post("/recipe", data);
      // console.log(response.data);
      localStorage.setItem("currentRecette", JSON.stringify(response.data));
      setHaveLocalStorage(true);
      // addRecipeToPhase(phaseAll, response.data);
      CustomToast({
        success: true,
        text: "Enregistré",
      });
    } catch (error) {
      CustomToast({
        success: false,
        text: "La création de la récette a échoué.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const checkValideIngredientForRecipeData = (
    phaseData: PhaseData[]
  ): boolean => {
    try {
      if (!phaseData || phaseData.length === 0) {
        // console.warn("Aucune phase trouvée pour la recette");
        return false;
      }

      const phaseEmpty = phaseData.filter((item) => {
        if (item.ingredients.length === 0) {
          return item;
        }
      });
      // console.log({ empty: phaseEmpty.length });

      if (phaseEmpty.length >= phaseData.length - 1) {
        return false;
      }

      const checkResponseList = phaseData.map((item) => {
        // vérifier si des ingrédients ont des quantités <= 0
        return item.ingredients.find((ingredient) => {
          // console.log({ ingredient });
          return ingredient.quantite <= 0 || !ingredient.quantite;
        });
      });
      // console.log({ checkResponseList });

      let count: number = 0;
      checkResponseList.map((el) => {
        if (el) {
          count += 1;
        }
      });
      // console.log({ count });
      if (count > 0) {
        // console.log("false");
        return false;
      }
      return true;
    } catch (error: any) {
      // console.log("check ingredient list validation error :", error);
      return false;
    }
  };
  // console.log(isCalculating || !checkValideIngredientForRecipeData(phaseData));

  const saveIngredientForRecipe = async (recipeId: string) => {
    try {
      phaseData.map((item) => {
        const phaseId = item.id === "0" ? QSPphase?._id : item.id;
        item.ingredients.map(async (ingredient) => {
          const data = {
            recipeId: recipeId,
            ingredientId: ingredient._id,
            phaseId: phaseId,
            quantite: ingredient.quantite,
            unite: "%",
          };
          try {
            await apiClient.post(`/recipeingredient/upsert`, data);
          } catch (error: any) {
            console.error({ error: error.response.data });
          }
        });
      });
      localStorage.setItem("phaseData", JSON.stringify(phaseData));
    } catch (error: any) {
      console.log("save ingredient error :", error.response.data);
    }
  };

  const finalResult = async (recipeId: string) => {
    try {
      const response = await apiClient.get(`/recipe/${recipeId}/calculer`);
      console.log({ response: response.data });
      setRecipeResult(response.data);
      setSwitcher(true);
      CustomToast({
        success: true,
        text: "Calcul effectué.",
      });
      localStorage.setItem("currentResult", JSON.stringify(response.data));
    } catch (error: any) {
      console.log("finale result error :", error.response.data);
      CustomToast({
        success: false,
        text: "Echec du calcul.",
      });
    }
  };

  const handleCalculate = async () => {
    try {
      if (checkValideIngredientForRecipeData(phaseData) == false) {
        CustomToast({
          success: false,
          text: "Les quantités des ingrédients ne peut être nulles",
        });
        return;
      }
      setIsCalculating(true);
      const localRecette = localStorage.getItem("currentRecette");
      if (localRecette) {
        const recipe = JSON.parse(localRecette);
        await saveIngredientForRecipe(recipe._id);
        await finalResult(recipe._id);
      } else {
        CustomToast({ success: false, text: "Valider d'abord votre recette" });
        return;
      }
    } catch (error: any) {
      console.log("error: ", error.response);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveResult = async () => {
    try {
      // console.log("saving");
      setIsSaving(true);
      const localRecette = localStorage.getItem("currentRecette");
      if (localRecette) {
        const recipe: RecipeType = JSON.parse(localRecette);
        const response = await apiClient.post(
          `/recipe/${recipe._id}/savefinalresult`,
          {}
        );
        console.log({ response: response.data });
        CustomToast({ success: true, text: "Résultat sauvegardé" });
      } else {
        CustomToast({ success: false, text: "Erreur de la sauvegarde." });
      }
    } catch (error: any) {
      console.log("finale result error :", error.response.data);
      CustomToast({ success: false, text: "Echec de la sauvegarde." });
    } finally {
      setIsSaving(false);
    }
  };

  const resertReceipe = async () => {
    console.log("resert");
    localStorage.removeItem("currentRecette");
    localStorage.removeItem("currentResult");
    localStorage.removeItem("phaseData");
    localStorage.removeItem("currentQSP");
    localStorage.removeItem("QSP");
    setHaveLocalStorage(false);
    setRecipeName("");
    setDescription("");
    setTotalQuantity("");
    setPhaseData([]);
    setQSPphase(undefined);
    setHaveQSP(false);
    setRecipeResult(undefined);
    await resertReceipePhase();
    CustomToast({ success: true, text: "Recette réinitialisée" });
  };

  // const getTotalPercentage = (): number => {
  //   return phaseData.reduce(
  //     (total, phase) =>
  //       total +
  //       phase.ingredients.reduce(
  //         (phaseTotal, ing) => phaseTotal + (parseFloat(ing.percentage) || 0),
  //         0
  //       ),
  //     0
  //   );
  // };

  // const getTotalCost = (): number => {
  //   return phaseData.reduce(
  //     (total, phase) =>
  //       total +
  //       phase.ingredients.reduce(
  //         (phaseTotal, ing) => phaseTotal + (parseFloat(ing.cost) || 0),
  //         0
  //       ),
  //     0
  //   );
  // };

  const calculatedTotal: string = totalQuantity;

  return (
    <div
      // className=" bg-[#4B352A] py-24 opacity-80 mx-auto w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      className="bg-[#4B352A] flex lg:p-12 md:p-6 p-3 lg:py-24 md:py-24 py-24 opacity-80"
    >
      <div className="w-full mx-auto p-4 bg-white rounded-lg">
        {/* first step */}
        {!haveLocalStorage && (
          <div className="w-full mx-auto space-y-6">
            {/* Recette name */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la Recette *
              </label>
              <input
                type="text"
                placeholder="Ex: Crème hydratante visage"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-900 font-medium focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none transition-colors"
                required
              />
            </div>

            {/* Description et Image */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Upload d'image */}
                <div className="flex-shrink-0">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Image de la recette
                  </label>
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("Image uploaded:", file);
                        }
                      }}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-2"
                    >
                      <Camera className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500 text-center">
                        Ajouter une image
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 resize-none focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none transition-colors"
                    placeholder="Décrivez votre recette, ses propriétés, son utilisation..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Quantity and Settings */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Paramètres de quantité
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité Totale *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={
                        totalQuantity
                        // /^[0-9]*[,.]?[0-9]*$/.test(totalQuantity.toString())
                        //   ? totalQuantity
                        //   : ""
                      }
                      placeholder="Saisissez"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9]*[,.]?[0-9]*$/.test(value)) {
                          const checkdecimal = [...value].filter(
                            (char) => char === "."
                          ).length;
                          if (checkdecimal <= 1) {
                            setTotalQuantity(value);
                          }
                        } else {
                          CustomToast({
                            success: false,
                            text: "Votre entrée n'est pas valide",
                          });
                          // setTotalQuantity("");
                        }
                      }}
                      className="w-20 p-2 text-gray-700 border border-gray-300 rounded text-center focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none"
                      required
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="p-2 border text-gray-700 border-gray-300 rounded focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none"
                    >
                      <option value="g" className="text-gray-700">
                        g
                      </option>
                      <option value="ml" className="text-gray-700">
                        ml
                      </option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Équivalent: <strong>{calculatedTotal} ml</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-start">
              <button
                className={`${
                  isCreating ? "animate-pulse opacity-75" : "hover:bg-[#3e2b22]"
                } bg-[#4B352A] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed`}
                onClick={() => createRecipe()}
                disabled={
                  isCreating ||
                  !recipeName.trim() ||
                  !description.trim() ||
                  !totalQuantity.trim()
                }
              >
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Création en cours...
                  </span>
                ) : (
                  "Valider et continuer"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Resume of recipe data */}
        {haveLocalStorage && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {recipeName}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Quantité totale: </span>
                <span className="font-medium text-gray-900">
                  {totalQuantity} {unit}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Équivalent: </span>
                <span className="font-medium text-gray-900">
                  {calculatedTotal} ml
                </span>
              </div>
            </div>

            <button
              onClick={() => resertReceipe()}
              className="mt-4 text-sm text-[#4B352A] hover:text-[#3e2b22] underline cursor-pointer"
            >
              Modifier les informations de base
            </button>
          </div>
        )}

        {haveLocalStorage && (
          <div
            className={`my-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200`}
          >
            {/* QSP and temperature */}
            <div className="mb-6 flex items-center gap-6">
              <QSPSelect
                qsp={QSP}
                setQSP={setQSP}
                ingredients={ingredientQSP}
                onSelect={async (data) => {
                  await resertReceipePhase();
                  const phase = phases.find((el) => {
                    return el.ingredientsPossible.find(
                      (el) => el._id === data._id
                    );
                  });
                  if (!phase) return;
                  console.log({ phase });
                  setQSPphase(phase);
                  setHaveQSP(true);
                  localStorage.setItem("currentQSP", JSON.stringify(phase));
                  localStorage.setItem("QSP", JSON.stringify(data));
                }}
                resetTrigger={resetQSP} // passez une prop qui change quand vous voulez reset
              />

              <div className="flex items-center gap-4 text-gray-700">
                <label className="font-medium">Recette à chaud :</label>

                <div className="flex items-center gap-1">
                  <label htmlFor="recette-chaud-oui" className="text-sm">
                    Oui
                  </label>
                  <input
                    id="recette-chaud-oui"
                    type="radio"
                    name="temperature"
                    checked={hotRecipe}
                    onChange={() => {
                      setHotRecipe(true);
                      setColdRecipe(false);
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <label htmlFor="recette-chaud-non" className="text-sm">
                    Non
                  </label>
                  <input
                    id="recette-chaud-non"
                    type="radio"
                    name="temperature"
                    checked={coldRecipe}
                    onChange={() => {
                      setColdRecipe(true);
                      setHotRecipe(false);
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* second step */}
        {haveLocalStorage && haveQSP && (
          <div
            className={`my-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200`}
          >
            {/* Search and Calculate */}
            <div className="mb-6 flex items-center gap-4">
              {/* <div className="flex-1">
                <input
                  type="text"
                  placeholder="Recherche ingrédients"
                  value={searchIngredient}
                  onChange={(e) => setSearchIngredient(e.target.value)}
                  className="text-gray-700 w-full p-3 border border-gray-300 rounded-lg"
                />
              </div> */}
              <div className={`w-full flex justify-start gap-2`}>
                <button
                  className={`${isCalculating ? "animate-pulse" : ""} ${
                    (isCalculating ||
                      !checkValideIngredientForRecipeData(phaseData)) === true
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#36261e] flex items-center gap-2`}
                  onClick={() => handleCalculate()}
                  disabled={
                    isCalculating ||
                    !checkValideIngredientForRecipeData(phaseData)
                  }
                >
                  <Calculator className="w-4 h-4" />
                  {isCalculating ? "Patientez..." : "Calculer"}
                </button>

                <button
                  className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#36261e] flex items-center gap-2 cursor-pointer"
                  onClick={() => resertReceipe()}
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>

                {recipeResult && (
                  <button
                    className={`${
                      isSaving && "animate-pulse"
                    } bg-[#4B352A] text-white px-6 py-2 rounded hover:bg-[#3e2b22] flex items-center gap-2 cursor-pointer`}
                    onClick={() => handleSaveResult()}
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Patientez..." : "Sauvegarder"}
                  </button>
                )}
              </div>
            </div>

            {/* Switch btn */}
            {recipeResult && (
              <button
                className="bg-[#4B352A] text-white px-4 py-2 mb-2 rounded hover:bg-[#36261e] flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSwitcher(!switcher);
                }}
              >
                <RefreshCw className="w-4 h-4" />
                {switcher ? "Retourner à la préparation" : "Voir le résultat"}
              </button>
            )}

            {/* Préparation, Phase list */}
            {(!recipeResult || !switcher) && (
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab("tous");
                    setCurrentPhase(null);
                  }}
                  className={`px-4 py-2 rounded font-medium text-gray-700 hover:bg-gray-300 cursor-pointer ${
                    activeTab === "tous" &&
                    "bg-[#4B352A] text-white hover:text-gray-700"
                  }`}
                >
                  Préparation
                </button>
                {phases.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTab(item._id);
                      setCurrentPhase(item);
                      setPhaseIngretient([]);
                    }}
                    className={`px-4 py-2 rounded font-medium cursor-pointer ${
                      activeTab === item._id
                        ? "bg-[#4B352A] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {item.nom}
                  </button>
                ))}
                <span className="text-orange-600 text-sm self-center ml-2 cursor-pointer">
                  (Cliquer sur une Phase pour ajouter les ingrédients)
                </span>
              </div>
            )}

            {/* Recette tab */}
            {!currentPhase && !switcher && (
              <RecetteTab
                QSPphase={QSPphase}
                phaseData={phaseData}
                removeIngredientFromPhase={removeIngredientFromPhase}
                updateIngredientQuantity={updateIngredientQuantity}
              />
            )}

            {/* Phase tab */}
            {phases && currentPhase && !switcher && (
              <PhaseTab
                currentRecipeData={phaseData}
                ingredient={ingredient}
                currentPhase={currentPhase}
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
                setIngretient={setIngretient}
                setSelectedCategory={setSelectedCategory}
                handleSearch={handleSearch}
                addIngredientToPhase={addIngredientToPhase}
                removeIngredientFromPhase={removeIngredientFromPhase}
              />
            )}

            {/* Résultat finale de la préparation */}
            {recipeResult && switcher && (
              <div className="text-gray-700 mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="space-y-6">
                  {/* En-tête de la recette */}
                  <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      📋 Informations de la recette
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Nom:</span>{" "}
                        {recipeResult.data.recette?.nom}
                      </div>
                      <div>
                        <span className="font-medium">Poids cible:</span>{" "}
                        {recipeResult.data.recette.poidsCible.toFixed(2)}g
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(
                          recipeResult.data.recette.dateCreation
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Tableau des ingrédients */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      🧪 Composition de la recette
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Phase
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Type
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Ingrédient
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              %
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Millilitres
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Grammes
                            </th>
                            <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">
                              Gouttes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recipeResult.data.tableau.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border-b">
                                {item.phase}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {item.type}
                              </td>
                              <td className="px-4 py-2 border-b font-medium">
                                {item.ingredient}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {item.pourcentage.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {item.ml.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {item.g.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {item.gouttes?.toFixed(2) || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Totaux */}
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-2">
                      📊 Totaux
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Prix total:</span>{" "}
                        {recipeResult.data.totaux.prixTotal}{" "}
                        {recipeResult.data.totaux.prixTotal > 0
                          ? recipeResult.data.tableau[0]?.devise
                          : "EUR"}
                      </div>
                      <div>
                        <span className="font-medium">Masse totale:</span>{" "}
                        {recipeResult.data.totaux.masseTotale.toFixed(2)}g
                      </div>
                      <div>
                        <span className="font-medium">Volume total:</span>{" "}
                        {recipeResult.data.totaux.volumeTotal.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Écart poids:</span>{" "}
                        {recipeResult.data.totaux.ecartPoids.toFixed(2)}g
                      </div>
                    </div>
                  </div>

                  {/* Warnings */}
                  {recipeResult.data.warnings &&
                    recipeResult.data.warnings.length > 0 && (
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                        <h3 className="font-semibold text-yellow-800 mb-2">
                          ⚠️ Avertissements
                        </h3>
                        <ul className="list-disc list-inside text-sm text-yellow-700">
                          {recipeResult.data.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Message de statut */}
                  <div className="bg-green-50 p-3 rounded border border-green-200 flex items-center gap-2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-green-500"></div>
                    <span className="text-sm text-green-700">
                      {recipeResult.message}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Warning */}
        {/* <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded flex items-center gap-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-orange-500"></div>
              <span className="text-orange-700 text-sm">
                La somme des ingrédients est égale à 0%. Créer votre recette !
              </span>
            </div> */}
        {/* Action Buttons */}
        <div className="text-gray-700 mt-6 flex gap-3">
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
            <Copy className="w-4 h-4" />
            Dupliquer
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
            <FileText className="w-4 h-4" />
            Exporter PDF
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" />
            Exporter Excel
          </button>
        </div>

        {/* Instructions */}
        <div className="text-gray-700 mt-8">
          <h3 className="font-medium mb-4">Instruction de fabrication :</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Phase A - Phase Aqueuse</h4>
              <div className="bg-gray-50 p-4 rounded">
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </li>
                  <li>
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Phase B - Phase Huileuse</h4>
              <div className="bg-gray-50 p-4 rounded">
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </li>
                  <li>
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Phase C - Émulsifiants</h4>
              <div className="bg-gray-50 p-4 rounded">
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </li>
                  <li>
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Phase D - Additifs</h4>
              <div className="bg-gray-50 p-4 rounded">
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </li>
                  <li>
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
