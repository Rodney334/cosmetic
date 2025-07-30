import React, { useState } from "react";
import {
  Plus,
  Calculator,
  Save,
  Copy,
  FileText,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";

// Types définis pour corriger les erreurs TypeScript
interface Ingredient {
  id: number;
  name: string;
  family: string;
  percentage: string;
  cost: string;
}

interface PhaseData {
  phase: string;
  title: string;
  ingredients: Ingredient[];
}

const RecipeInterface = () => {
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
  const [activeTab, setActiveTab] = useState<string>("Tous");

  // Structure des phases avec lignes vides par défaut
  const [phaseData, setPhaseData] = useState<PhaseData[]>([
    {
      phase: "A",
      title: "Phase A - Phase Aqueuse",
      ingredients: [{ id: 1, name: "", family: "", percentage: "", cost: "" }],
    },
    {
      phase: "H",
      title: "Phase H - Phase Huileuse",
      ingredients: [{ id: 2, name: "", family: "", percentage: "", cost: "" }],
    },
    {
      phase: "E",
      title: "Phase E - Émulsifiants",
      ingredients: [{ id: 3, name: "", family: "", percentage: "", cost: "" }],
    },
    {
      phase: "D",
      title: "Phase D - Additifs",
      ingredients: [{ id: 4, name: "", family: "", percentage: "", cost: "" }],
    },
  ]);

  const tabs: string[] = ["Tous", "Phase A", "Phase H", "Phase E", "Phase D"];

  const updateIngredient = (
    phaseIndex: number,
    ingredientId: number,
    field: keyof Ingredient,
    value: string
  ): void => {
    setPhaseData((prev) =>
      prev.map((phase, pIndex) =>
        pIndex === phaseIndex
          ? {
            ...phase,
            ingredients: phase.ingredients.map((ing) =>
              ing.id === ingredientId ? { ...ing, [field]: value } : ing
            ),
          }
          : phase
      )
    );
  };

  const addIngredientToPhase = (phaseIndex: number): void => {
    setPhaseData((prev) =>
      prev.map((phase, pIndex) =>
        pIndex === phaseIndex
          ? {
            ...phase,
            ingredients: [
              ...phase.ingredients,
              {
                id: Date.now() + Math.random(),
                name: "",
                family: "",
                percentage: "",
                cost: "",
              },
            ],
          }
          : phase
      )
    );
  };

  const removeIngredient = (phaseIndex: number, ingredientId: number): void => {
    setPhaseData((prev) =>
      prev.map((phase, pIndex) =>
        pIndex === phaseIndex
          ? {
            ...phase,
            ingredients: phase.ingredients.filter(
              (ing) => ing.id !== ingredientId
            ),
          }
          : phase
      )
    );
  };

  const getTotalPercentage = (): number => {
    return phaseData.reduce(
      (total, phase) =>
        total +
        phase.ingredients.reduce(
          (phaseTotal, ing) => phaseTotal + (parseFloat(ing.percentage) || 0),
          0
        ),
      0
    );
  };

  const getTotalCost = (): number => {
    return phaseData.reduce(
      (total, phase) =>
        total +
        phase.ingredients.reduce(
          (phaseTotal, ing) => phaseTotal + (parseFloat(ing.cost) || 0),
          0
        ),
      0
    );
  };

  const calculatedTotal: number = totalQuantity * (unit === "g" ? 1 : 1);

  return (
    <div className="min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
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
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <Plus className="w-8 h-8 text-white bg-gray-600 rounded-full p-1" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
              placeholder="Description de la recette..."
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
          <button className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
            Valider
          </button>
        </div>

        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="font-medium">QSP 100% :</label>
            <select
              value={qsp100}
              onChange={(e) => setQsp100(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="Eau déminéralisée">Eau déminéralisée</option>
              <option value="Eau florale">Eau florale</option>
              <option value="Hydrolat">Hydrolat</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-medium">Recette à chaud :</label>

            <div className="flex items-center gap-1">
              <label htmlFor="hot-yes">Oui</label>
              <input
                id="hot-yes"
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
              <label htmlFor="hot-no">Non</label>
              <input
                id="hot-no"
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
          <button className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2 cursor-pointer">
            <Calculator className="w-4 h-4" />
            Calculer
          </button>
        </div>

        {/* Phase Tabs */}
        <div className="mb-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-medium cursor-pointer ${activeTab === tab
                ? tab === "Tous"
                  ? "bg-[#4B352A] text-white"
                  : tab === "Phase A"
                    ? "bg-yellow-600 text-white"
                    : tab === "Phase H"
                      ? "bg-gray-400 text-white"
                      : tab === "Phase E"
                        ? "bg-gray-400 text-white"
                        : "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
          <span className="text-orange-600 text-sm self-center ml-2">
            (Cliquer sur une Phase pour ajouter les ingrédients)
          </span>
        </div>

        {/* Main Table - Redesigned to match the image exactly */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 max-w-full">
          {/* Container with fixed dimensions and scroll */}
          <div className="max-h-96 overflow-auto">
            <div className="min-w-[800px]">
              {/* Table Header - Sticky */}
              <div className="bg-gray-400 text-white sticky top-0 z-10">
                <div className="grid grid-cols-6 gap-0">
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[150px]">
                    Ingrédients
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[100px]">
                    Phase
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[120px]">
                    Famille
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                    %
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[100px]">
                    Coûts (€)
                  </div>
                  <div className="p-3 text-center font-medium min-w-[100px]">
                    Supprimer
                  </div>
                </div>
              </div>

              {/* Phases and Ingredients */}
              {phaseData.map((phase, phaseIndex) => (
                <div key={phase.phase}>
                  {/* Phase Header Row */}
                  <div className="bg-blue-200">
                    <div className="grid grid-cols-6 gap-0">
                      <div className="p-3 font-medium text-blue-800 border-r border-gray-300 border-b min-w-[150px]">
                        {phase.title}
                      </div>
                      <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                      <div className="border-r border-gray-300 border-b min-w-[120px]"></div>
                      <div className="border-r border-gray-300 border-b min-w-[80px]"></div>
                      <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                      <div className="border-b border-gray-300 min-w-[100px]"></div>
                    </div>
                  </div>

                  {/* Phase Ingredients */}
                  {phase.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="bg-white">
                      <div className="grid grid-cols-6 gap-0 hover:bg-gray-50">
                        <div className="p-2 border-r border-gray-300 border-b min-w-[150px]">
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) =>
                              updateIngredient(
                                phaseIndex,
                                ingredient.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                            placeholder="-"
                          />
                        </div>
                        <div className="p-2 border-r border-gray-300 border-b flex justify-center items-center min-w-[100px]">
                          <span className="inline-block bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800 min-w-6 text-center">
                            {phase.phase}
                          </span>
                        </div>
                        <div className="p-2 border-r border-b border-gray-300 min-w-[120px]">
                          <input
                            type="text"
                            value={ingredient.family}
                            onChange={(e) =>
                              updateIngredient(
                                phaseIndex,
                                ingredient.id,
                                "family",
                                e.target.value
                              )
                            }
                            className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                            placeholder="-"
                          />
                        </div>
                        <div className="p-2 border-r border-gray-300 border-b min-w-[80px]">
                          <input
                            type="number"
                            step="0.1"
                            value={ingredient.percentage}
                            onChange={(e) =>
                              updateIngredient(
                                phaseIndex,
                                ingredient.id,
                                "percentage",
                                e.target.value
                              )
                            }
                            className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                            placeholder="-"
                          />
                        </div>
                        <div className="p-2 border-r border-b border-gray-300 min-w-[100px]">
                          <input
                            type="number"
                            step="0.01"
                            value={ingredient.cost}
                            onChange={(e) =>
                              updateIngredient(
                                phaseIndex,
                                ingredient.id,
                                "cost",
                                e.target.value
                              )
                            }
                            className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                            placeholder="-"
                          />
                        </div>
                        <div className="p-2 border-b border-gray-300 flex justify-center items-center min-w-[100px]">
                          <button
                            onClick={() =>
                              removeIngredient(phaseIndex, ingredient.id)
                            }
                            className="p-1 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Total Row - Sticky Bottom */}
              <div className="bg-blue-200 sticky bottom-0">
                <div className="grid grid-cols-6 gap-0">
                  <div className="p-3 font-bold text-blue-800 border-r border-gray-300 min-w-[150px]">
                    TOTAL
                  </div>
                  <div className="border-r border-gray-300 min-w-[100px]"></div>
                  <div className="border-r border-gray-300 min-w-[120px]"></div>
                  <div className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 min-w-[80px]">
                    {getTotalPercentage().toFixed(1)}
                  </div>
                  <div className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 min-w-[100px]">
                    {getTotalCost().toFixed(2)}
                  </div>
                  <div className="min-w-[100px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded flex items-center gap-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-orange-500"></div>
          <span className="text-orange-700 text-sm">
            La somme des ingrédients est égale à{" "}
            {getTotalPercentage().toFixed(1)}%. Créer votre recette !
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="bg-[#4B352A] text-white px-6 py-2 rounded hover:bg-gray-700 flex items-center gap-2 cursor-pointer">
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
