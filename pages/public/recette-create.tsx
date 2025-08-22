import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Calculator,
  Save,
  Copy,
  FileText,
  FileSpreadsheet,
  BookOpen,
  CircleCheck,
  Trash2,
  Camera,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { useIngredientStore } from "@/stores/ingredient.store";
import { useSession } from "next-auth/react";
import { usePhaseStore } from "@/stores/phase.store";
import { RecetteTab } from "@/components/RecetteTabComponent";
import { PhaseData, RecipeResult, RecipeType } from "@/types/recipe.type";
import { PhaseType } from "@/types/phase.type";
import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseTab } from "@/components/PhaseTabComponent";
import { CustomErrorToast, CustomSuccessToast } from "@/components/CustomToast";
import axios from "axios";
import { api } from "@/constantes/api.constante";
import { Toaster } from "react-hot-toast";

const NewRecipe = () => {
  const { data: session } = useSession();
  const {
    ingredientsByCategory,
    getAllIngredient,
    groupIngredientsByCategory,
  } = useIngredientStore();

  const { phaseAll, getAllPhase } = usePhaseStore();

  // Structure des phases avec lignes vides par défaut
  const [phaseData, setPhaseData] = useState<PhaseData[]>([]);
  const [QSPphase, setQSPphase] = useState<PhaseType>();
  const [currentPhase, setCurrentPhase] = useState<PhaseType | null>();
  const [activeTab, setActiveTab] = useState<string>("tous");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [phaseIngredient, setPhaseIngretient] = useState<IngredientType[]>([]);
  const [recipeResult, setRecipeResult] = useState<RecipeResult>();

  const [recipeName, setRecipeName] = useState<string>("Recette");
  const [description, setDescription] = useState<string>(
    "Une description pour le test de la recette"
  );
  const [totalQuantity, setTotalQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<string>("g");
  const [qsp100, setQsp100] = useState<string>("Eau déminéralisée");
  const [hotRecipe, setHotRecipe] = useState<boolean>(false);
  const [coldRecipe, setColdRecipe] = useState<boolean>(false);
  const [searchIngredient, setSearchIngredient] = useState<string>("");

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [haveLocalStorage, setHaveLocalStorage] = useState<boolean>(false);
  const [switcher, setSwitcher] = useState<boolean>(false);

  useEffect(() => {
    const localRecette = localStorage.getItem("currentRecette");
    if (localRecette) {
      setHaveLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    const localRecette = localStorage.getItem("currentRecette");
    const localResult = localStorage.getItem("currentResult");
    if (haveLocalStorage && localRecette && localResult) {
      const data: RecipeType = JSON.parse(localRecette);
      const resultData: RecipeResult = JSON.parse(localResult);
      setRecipeName(data.nom);
      setDescription(data.description);
      setTotalQuantity(data.poidsTotal);
      setRecipeResult(resultData);
    } else {
      setRecipeName("");
      setDescription("");
      setTotalQuantity(0);
      setRecipeResult(undefined);
      localStorage.removeItem("currentRecette");
      localStorage.removeItem("currentResult");
    }
  }, [haveLocalStorage]);

  useEffect(() => {
    if (session && session.accessToken) {
      getAllIngredient(session.accessToken);
      groupIngredientsByCategory(session.accessToken);
      getAllPhase(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (phaseAll?.length > 0 && phaseData.length === 0) {
      const initialPhaseData = [
        // Phase QSP toujours en première position
        {
          id: "0",
          title: "QSP",
          ingredients: [],
          allowedCategories: [],
        },
        // Puis les phases de l'API
        ...phaseAll.map((el) => ({
          id: el._id,
          title: el.nom,
          ingredients: [],
          allowedCategories: el.allowedCategories,
        })),
      ];
      setPhaseData(initialPhaseData);
    }
  }, [phaseAll]);

  // const updateIngredient = (
  //   phaseIndex: number,
  //   ingredientId: number,
  //   field: keyof Ingredient,
  //   value: string
  // ): void => {
  //   setPhaseData((prev) =>
  //     prev.map((phase, pIndex) =>
  //       pIndex === phaseIndex
  //         ? {
  //             ...phase,
  //             ingredients: phase.ingredients.map((ing) =>
  //               ing.id === ingredientId ? { ...ing, [field]: value } : ing
  //             ),
  //           }
  //         : phase
  //     )
  //   );
  // };

  // Pour ajouter un ingrédient à une phase spécifique
  const addIngredientToPhase = (
    phaseId: string,
    ingredient: IngredientType
  ) => {
    setPhaseData((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;

        // Pour la phase QSP, on force la quantité à 100
        const newIngredient =
          phaseId === "0" ? { ...ingredient, quantite: 100 } : ingredient;

        return {
          ...phase,
          ingredients: [...phase.ingredients, newIngredient],
        };
      })
    );
  };

  // Pour ajouter un ingrédient à une phase spécifique
  const resertReceipePhase = () => {
    setPhaseData((prev) =>
      prev.map((phase) => {
        return { ...phase, ingredients: [] };
      })
    );
  };

  // Pour retirer un ingrédient à une phase spécifique
  const removeIngredientFromPhase = (
    phaseId: string,
    ingredient: IngredientType
  ) => {
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
  };

  const updateIngredientQuantity = (
    phaseId: string,
    ingredientId: string,
    newQuantity: number
  ) => {
    setPhaseData((prevPhases) => {
      // Fonction helper pour limiter à 2 décimales
      const toTwoDecimals = (num: number) => parseFloat(num.toFixed(2));

      // 1. Validation initiale
      if (phaseId === "0") return prevPhases;

      const qspPhase = prevPhases.find((phase) => phase.id === "0");
      if (!qspPhase?.ingredients.length) return prevPhases;
      const [qspIngredient] = qspPhase.ingredients;

      // 2. Trouver l'ingrédient cible
      const targetPhase = prevPhases.find((phase) => phase.id === phaseId);
      const targetIngredient = targetPhase?.ingredients.find(
        (ing) => ing._id === ingredientId
      );
      if (!targetIngredient) return prevPhases;

      // Formatage de l'ancienne quantité
      const oldQuantity = toTwoDecimals(targetIngredient.quantite || 0);

      // 3. Cas spécial : remise à zéro (backspace)
      const isResetToZero = newQuantity === 0 && oldQuantity > 0;

      // 4. Calcul des nouvelles valeurs (avec formatage)
      let newQspQuantity = toTwoDecimals(qspIngredient.quantite);
      let finalQuantity = toTwoDecimals(
        Math.max(0, Math.min(newQuantity, 100))
      );

      if (isResetToZero) {
        // Cas spécial : on remet toute la quantité dans QSP
        newQspQuantity = toTwoDecimals(
          Math.min(100, qspIngredient.quantite + oldQuantity)
        );
        finalQuantity = 0;
      } else {
        // Cas normal
        const quantityDiff = toTwoDecimals(finalQuantity - oldQuantity);
        newQspQuantity = toTwoDecimals(qspIngredient.quantite - quantityDiff);
      }

      // 5. Validation des limites
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

  const addRecipeToPhase = async (
    phaseAll: PhaseType[],
    createdRecipe: RecipeType
  ) => {
    try {
      phaseAll.map(async (item, index) => {
        const response = await axios.post(
          `${api.base_url}/phase/${item._id}/add-recipe`,
          { recipeId: createdRecipe._id },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        return response ? true : false;
      });
    } catch (error: any) {
      console.log("something gone wrong", error.response.data);
    }
  };

  const createRecipe = async () => {
    try {
      setIsCreating(true);
      const data = {
        nom: recipeName,
        description: description,
        poidsTotal: totalQuantity,
      };
      console.log(data);
      const response = await axios.post(`${api.base_url}/recipe`, data, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      console.log(response.data);
      localStorage.setItem("currentRecette", JSON.stringify(response.data));
      addRecipeToPhase(phaseAll, response.data);
      CustomSuccessToast("Enregistré");
    } catch (error) {
      CustomErrorToast("La création de la récette a échoué.");
    } finally {
      setIsCreating(false);
    }
  };

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
          await axios.post(`${api.base_url}/recipeingredient/`, data, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });
        });
      });
    } catch (error: any) {
      console.log("save ingredient error :", error.response.data);
    }
  };

  const finalResult = async (recipeId: string) => {
    try {
      const response = await axios.get(
        `${api.base_url}/recipe/${recipeId}/finalresult`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log({ response: response.data });
      setRecipeResult(response.data);
      localStorage.setItem("currentResult", response.data);
      CustomSuccessToast("Calcul effectué.");
    } catch (error: any) {
      console.log("finale result error :", error.response.data);
    }
  };

  const handleCalculate = async () => {
    try {
      setIsCalculating(true);
      const localRecette = localStorage.getItem("currentRecette");
      if (localRecette) {
        const recipe = JSON.parse(localRecette);
        await saveIngredientForRecipe(recipe._id);
        await finalResult(recipe._id);
        setSwitcher(true);
      } else {
        CustomErrorToast("Valider d'abord votre recette");
      }
      console.log("try to calculate");
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resertReceipe = () => {
    console.log("resert");
    localStorage.removeItem("currentRecette");
    localStorage.removeItem("currentResult");
    setRecipeName("");
    setDescription("");
    setTotalQuantity(0);
    setRecipeResult(undefined);
    CustomSuccessToast("Recette réinitialisée");
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

  const calculatedTotal: number = totalQuantity * (unit === "g" ? 1 : 1);

  return (
    <div className="min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <Toaster />
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Nom de la Recette"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-700 font-medium"
          />
        </div>

        {/* Description */}
        <div className="mb-6 flex gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={(e) => {
                // Handle image upload here
                const file = e.target.files?.[0];
                if (file) {
                  // Process the uploaded image
                  console.log("Image uploaded:", file);
                }
              }}
            />
            <label
              htmlFor="image-upload"
              className="text-gray-700 cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <Camera className="w-6 h-6 text-gray-500 mb-1" />
              <span className="text-xs text-gray-500">Image</span>
            </label>
          </div>

          <div className="flex-1 h-24">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              defaultValue={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-gray-700 w-full p-3 border border-gray-300 rounded-lg resize-none h-full"
              placeholder="Description de la recette..."
              style={{ height: "calc(100% - 1.75rem)" }}
            />
          </div>
        </div>

        {/* Quantity and Settings */}
        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <label className="font-medium">Quantité Totale :</label>
            <input
              type="number"
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(parseInt(e.target.value) || 0)}
              className="w-20 p-2 border border-gray-300 rounded"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="g" className="text-gray-700">
                g
              </option>
              <option value="ml" className="text-gray-700">
                ml
              </option>
            </select>
            <span className="text-gray-700">(= {calculatedTotal} ml)</span>
          </div>
          <button
            className={`${
              isCreating ? "animate-pulse" : ""
            } bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#3e2b22] cursor-pointer`}
            onClick={() => createRecipe()}
            disabled={isCreating}
          >
            {isCreating ? "Patientez..." : "Valider"}
          </button>
        </div>

        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <label className="font-medium">QSP 100% :</label>
            <select
              // value={qsp100}
              onChange={(e) => {
                // setQsp100(e.target.value);
                resertReceipePhase();
                const data = JSON.parse(e.target.value);
                const phase = phaseAll.find((el) => {
                  return el.allowedCategories.find(
                    (el) => el._id === data.item.category._id
                  );
                });
                if (!phase) return;
                setQSPphase(phase);
                addIngredientToPhase("0", data.ingredient);
              }}
              className="text-gray-700 p-2 border border-gray-300 rounded"
            >
              {ingredientsByCategory.map((item, index) => (
                <optgroup
                  key={index}
                  label={
                    phaseAll.find((el) => {
                      return el.allowedCategories.find(
                        (el) => el._id === item.category._id
                      );
                    })?.nom || "Phase"
                  }
                >
                  {item.ingredients.map((ingredient, idx) => (
                    <option
                      key={ingredient._id + index + idx}
                      value={JSON.stringify({ ingredient, item })}
                      className="text-gray-700"
                    >
                      {ingredient.nom}
                    </option>
                  ))}
                </optgroup>
              ))}
              {/* <option value="Eau déminéralisée">Eau déminéralisée</option>
              <option value="Eau florale">Eau florale</option>
              <option value="Hydrolat">Hydrolat</option> */}
            </select>
          </div>

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

        {/* Search and Calculate */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Recherche ingrédients"
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
              className="text-gray-700 w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            className={`${
              isCalculating ? "animate-pulse" : ""
            } bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#36261e] flex items-center gap-2 cursor-pointer`}
            onClick={() => handleCalculate()}
            disabled={isCalculating}
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
        </div>

        {recipeResult && (
          <button
            className="bg-[#4B352A] text-white px-4 py-2 mb-2 rounded hover:bg-[#36261e] flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setSwitcher(!switcher);
            }}
          >
            <RefreshCw className="w-4 h-4" />
            {!switcher ? "Retourner à la préparation" : "Voir le résultat"}
          </button>
        )}

        {/* Phase Tabs */}
        {(!recipeResult || switcher) && (
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
            {phaseAll.map((item, index) => (
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

        {!currentPhase && (!recipeResult || switcher) && (
          <RecetteTab
            QSPphase={QSPphase}
            phaseData={phaseData}
            removeIngredientFromPhase={removeIngredientFromPhase}
            updateIngredientQuantity={updateIngredientQuantity}
          />
        )}

        {/* Main Content Area with Categories and Ingredients Table */}
        {currentPhase && (
          <PhaseTab
            phaseData={phaseData}
            ingredientsByCategory={ingredientsByCategory}
            phaseIngredient={phaseIngredient}
            currentPhase={currentPhase}
            selectedCategory={selectedCategory}
            setPhaseIngretient={setPhaseIngretient}
            setSelectedCategory={setSelectedCategory}
            addIngredientToPhase={addIngredientToPhase}
          />
        )}

        {/* Warning */}
        {/* <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded flex items-center gap-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-orange-500"></div>
          <span className="text-orange-700 text-sm">
            La somme des ingrédients est égale à 0%. Créer votre recette !
          </span>
        </div> */}

        {/* Résultat finale de la préparation */}
        <div className="text-gray-700 mt-4 p-4 bg-white border border-gray-200 rounded-lg">
          {recipeResult && !switcher && (
            <div className="space-y-6">
              {/* En-tête de la recette */}
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">
                  📋 Informations de la recette
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Nom:</span>{" "}
                    {recipeResult.data.recette.nom}
                  </div>
                  <div>
                    <span className="font-medium">Poids cible:</span>{" "}
                    {recipeResult.data.recette.poidsCible}g
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
                          <td className="px-4 py-2 border-b">{item.phase}</td>
                          <td className="px-4 py-2 border-b">{item.type}</td>
                          <td className="px-4 py-2 border-b font-medium">
                            {item.ingredient}
                          </td>
                          <td className="px-4 py-2 border-b">
                            {item.pourcentage}%
                          </td>
                          <td className="px-4 py-2 border-b">{item.g}g</td>
                          <td className="px-4 py-2 border-b">
                            {item.gouttes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totaux */}
              <div className="bg-green-50 p-3 rounded border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">📊 Totaux</h3>
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
                    {recipeResult.data.totaux.masseTotale}g
                  </div>
                  <div>
                    <span className="font-medium">Volume total:</span>{" "}
                    {recipeResult.data.totaux.volumeTotal}
                  </div>
                  <div>
                    <span className="font-medium">Écart poids:</span>{" "}
                    {recipeResult.data.totaux.ecartPoids}g
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
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-gray-700 mt-6 flex gap-3">
          <button className="bg-[#4B352A] text-white px-6 py-2 rounded hover:bg-[#3e2b22] flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
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
