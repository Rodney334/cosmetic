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
} from "lucide-react";
import { useIngredientStore } from "@/stores/ingredient.store";
import { useSession } from "next-auth/react";
import { usePhaseStore } from "@/stores/phase.store";
import { RecetteTab } from "@/components/RecetteTabComponent";
import { PhaseData } from "@/types/recipe.type";
import { PhaseType } from "@/types/phase.type";
import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseTab } from "@/components/PhaseTabComponent";

// Types définis pour corriger les erreurs TypeScript
interface Ingredient {
  id: number;
  name: string;
  family: string;
  percentage: string;
  cost: string;
}

const RecipeInterface = () => {
  const { data: session } = useSession();
  const {
    ingredientAll,
    ingredientsByCategory,
    getAllIngredient,
    groupIngredientsByCategory,
    groupIngredientsByPhase,
  } = useIngredientStore();

  const { phaseAll, getAllPhase } = usePhaseStore();

  // Structure des phases avec lignes vides par défaut
  const [phaseData, setPhaseData] = useState<PhaseData[]>([]);
  const [currentPhase, setCurrentPhase] = useState<PhaseType | null>();
  const [activeTab, setActiveTab] = useState<string>("tous");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [phaseIngredient, setPhaseIngretient] = useState<IngredientType[]>([]);

  useEffect(() => {
    if (session && session.accessToken) {
      getAllIngredient(session.accessToken);
      groupIngredientsByCategory(session.accessToken);
      getAllPhase(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (phaseAll?.length > 0 && phaseData.length === 0) {
      const initialPhaseData = phaseAll.map((el) => ({
        id: el._id,
        title: el.nom,
        ingredients: [],
        allowedCategories: el.allowedCategories,
      }));
      setPhaseData(initialPhaseData);
    }
  }, [phaseAll]);

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
  );
  const [totalQuantity, setTotalQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<string>("g");
  const [qsp100, setQsp100] = useState<string>("Eau déminéralisée");
  const [hotRecipe, setHotRecipe] = useState<boolean>(false);
  const [coldRecipe, setColdRecipe] = useState<boolean>(false);
  const [searchIngredient, setSearchIngredient] = useState<string>("");

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
      prev.map((phase) =>
        phase.id === phaseId
          ? { ...phase, ingredients: [...phase.ingredients, ingredient] }
          : phase
      )
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
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Nom de la Recette"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium"
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
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-full"
              placeholder="Description de la recette..."
              style={{ height: "calc(100% - 1.75rem)" }}
            />
          </div>
        </div>

        {/* Quantity and Settings */}
        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
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
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
            <span className="text-gray-600">(= {calculatedTotal} ml)</span>
          </div>
          <button className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#3e2b22] cursor-pointer">
            Valider
          </button>
        </div>

        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
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
                addIngredientToPhase(phase?._id, data.ingredient);
              }}
              className="p-2 border border-gray-300 rounded"
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

          <div className="flex items-center gap-4">
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
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#36261e] flex items-center gap-2 cursor-pointer">
            <Calculator className="w-4 h-4" />
            Calculer
          </button>
        </div>

        {/* Phase Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => {
              setActiveTab("tous");
              setCurrentPhase(null);
            }}
            className={`px-4 py-2 rounded font-medium cursor-pointer ${
              activeTab === "tous" && "bg-[#4B352A] text-white"
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

        {!currentPhase && (
          <RecetteTab
            phaseData={phaseData}
            removeIngredientFromPhase={removeIngredientFromPhase}
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
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded flex items-center gap-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-orange-500"></div>
          <span className="text-orange-700 text-sm">
            La somme des ingrédients est égale à 0%. Créer votre recette !
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
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
        <div className="mt-8">
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

export default RecipeInterface;
