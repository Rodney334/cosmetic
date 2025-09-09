import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useIngredientStore } from "@/stores/ingredient.store";
import { usePhaseStore } from "@/stores/phase.store";
import { PhaseCategorieIngredientsType, PhaseType } from "@/types/phase.type";
import { IngredientType } from "@/types/ingredient.type";
import { PhaseData } from "@/types/recipe.type";
import { IngredientTab } from "@/components/IngredientTabComponent";
import { authStore } from "@/stores/auth.store";
import apiClient from "@/lib/axios";

const IngredientsInterface = () => {
  const { token, refreshToken } = authStore();
  const { phases, getPhases } = usePhaseStore();

  const [activeTab, setActiveTab] = useState<string>("Tous");
  const [ingredient, setIngretient] = useState<IngredientType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPhase, setCurrentPhase] =
    useState<PhaseCategorieIngredientsType>();

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
    }
  }, [token, tokenIsValid]);

  useEffect(() => {
    if (phases && phases.length > 0) {
      setCurrentPhase(phases[0]);
      setActiveTab(phases[0]._id);
      setIngretient(phases[0].ingredientsPossible);
    }
  }, [phases]);

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

  return (
    <div className="text-gray-700 min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-blue-500 mb-6">
            INGRÉDIENTS
          </h1>
        </div>

        {/* Main Content Area with Categories and Ingredients Table */}
        {phases && currentPhase && (
          <IngredientTab
            phaseData={phases}
            activeTab={activeTab}
            ingredient={ingredient}
            currentPhase={currentPhase}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            setActiveTab={setActiveTab}
            setIngretient={setIngretient}
            setCurrentPhase={setCurrentPhase}
            setSelectedCategory={setSelectedCategory}
            handleSearch={handleSearch}
          />
        )}

        {/* Action Buttons */}
        {/* <div className="mb-6 flex gap-3">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer">
            Ajouter un Ingrédient
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer">
            Ma Liste d'Ingrédients
          </button>
        </div> */}

        {/* Add Ingredient Form */}
        {/* <div className="bg-gray-100 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'ingrédient
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase
                </label>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                >
                  <option value="">Phase</option>
                  <option value="A">Phase A</option>
                  <option value="H">Phase H</option>
                  <option value="E">Phase E</option>
                  <option value="D">Phase D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Famille
                </label>
                <select
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                >
                  <option value="">Famille</option>
                  <option value="Ingrédients de base">
                    Ingrédients de base
                  </option>
                  <option value="Gommes et Gélifiant">
                    Gommes et Gélifiant
                  </option>
                  <option value="HA d'acide millefeille">
                    HA d'acide millefeille
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage maximal (recommandé en %)
                </label>
                <input
                  type="text"
                  placeholder="Dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Densité (si ingrédient liquide)
                </label>
                <input
                  type="text"
                  placeholder="Densité"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de gouttes par ml (si en codigouttes)
                </label>
                <input
                  type="text"
                  placeholder="Gouttes"
                  value={dropCount}
                  onChange={(e) => setDropCount(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix en € pour 100g
                </label>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 bg-gray-200 border-0 rounded-lg"
                >
                  <option value="">Prix</option>
                  <option value="5">5€</option>
                  <option value="10">10€</option>
                  <option value="15">15€</option>
                  <option value="20">20€</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-[#4B352A] text-white px-8 py-3 rounded hover:bg-gray-700 cursor-pointer">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IngredientsInterface;
