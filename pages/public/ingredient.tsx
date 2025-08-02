import React, { useState } from "react";
import { Search } from "lucide-react";

const IngredientsInterface = () => {
  const [searchIngredient, setSearchIngredient] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Tous");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Ingrédients de base"
  );

  // Form states
  const [ingredientName, setIngredientName] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [phase, setPhase] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [dropCount, setDropCount] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // Categories for the left panel
  const categories = [
    "Ingrédients de base",
    "Gommes et Gélifiant",
    "HA d'acide millefeille",
    "HA d'acide millefeille",
    "HA d'acide millefeille",
  ];

  // Sample ingredients data for Phase A
  const phaseAIngredients = [
    { name: "Gomme acacias", ml: "-", gouttes: "-" },
    { name: "Gomme adragante", ml: "-", gouttes: "-" },
    { name: "Gomme agar agar", ml: "-", gouttes: "-" },
    { name: "Gomme carraghenane", ml: "-", gouttes: "-" },
    { name: "Gomme xanthane", ml: "-", gouttes: "-" },
    { name: "HA d'acide millefeille", ml: "-", gouttes: "-" },
    { name: "HA d'acide millefeille", ml: "-", gouttes: "-" },
    { name: "HA d'acide millefeille", ml: "-", gouttes: "-" },
    { name: "HA d'acide millefeille", ml: "-", gouttes: "-" },
    { name: "HA d'acide millefeille", ml: "-", gouttes: "-" },
  ];

  const tabs: string[] = ["Tous", "Phase A", "Phase H", "Phase E", "Phase D"];

  return (
    <div className="min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-blue-500 mb-6">INGRÉDIENTS</h1>
      </div>

      {/* Search and Tabs Section */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Rechercher un Ingrédient :</label>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Lorem ipsum"
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Phase Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-medium cursor-pointer ${
                activeTab === tab
                  ? tab === "Tous"
                    ? "bg-[#4B352A] text-white"
                    : tab === "Phase A"
                    ? "bg-[#4B352A] text-white"
                    : "bg-gray-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
          <span className="text-orange-600 text-sm self-center ml-2">
            (Cliquer sur une Phase pour voir les ingrédients)
          </span>
        </div>
      </div>

      {/* Main Content Area with Categories and Ingredients Table */}
      <div className="bg-gray-300 p-4 rounded-lg mb-6">
        <div className="flex gap-4 h-96">
          {/* Left Panel - Categories */}
          <div className="w-64 bg-white rounded">
            {/* Categories Header */}
            <div className="bg-[#4B352A] text-white p-3 text-center font-medium rounded-t">
              Famille / Catégories
            </div>

            {/* Categories List */}
            <div className="divide-y divide-gray-200">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-3 text-left text-sm hover:bg-blue-50 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Ingredients Table */}
          <div className="flex-1 bg-white rounded overflow-hidden flex flex-col">
            {/* Container with fixed dimensions and scroll */}
            <div className="min-w-[600px] flex-1 flex flex-col overflow-hidden">
              {/* Table Header - Sticky */}
              <div className="bg-[#4B352A] text-white sticky top-0 z-10">
                <div className="grid grid-cols-5 gap-0">
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[180px]">
                    Ingrédients
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                    ml
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[100px]">
                    Gouttes
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                    Ajouter
                  </div>
                  <div className="p-3 text-center font-medium min-w-[80px]">
                    Guide
                  </div>
                </div>
              </div>

              {/* Phase Header */}
              <div className="bg-blue-200">
                <div className="grid grid-cols-5 gap-0">
                  <div className="p-3 font-medium text-blue-800 border-r border-gray-300 border-b min-w-[180px]">
                    Phase A - Phase Aqueuse
                  </div>
                  <div className="border-r border-b border-gray-300 min-w-[80px]"></div>
                  <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                  <div className="border-r border-gray-300 border-b min-w-[80px]"></div>
                  <div className="border-b border-gray-300 min-w-[80px]"></div>
                </div>
              </div>

              {/* Ingredients List with scroll */}
              <div className="flex-1 overflow-y-auto">
                {phaseAIngredients.map((ingredient, index) => (
                  <div key={index} className="bg-white hover:bg-gray-50">
                    <div className="grid grid-cols-5 gap-0 border-b border-gray-200">
                      <div className="p-2 border-r border-gray-300 text-sm min-w-[180px]">
                        {ingredient.name}
                      </div>
                      <div className="p-2 border-r border-gray-300 text-center text-sm min-w-[80px]">
                        {ingredient.ml}
                      </div>
                      <div className="p-2 border-r border-gray-300 text-center text-sm min-w-[100px]">
                        {ingredient.gouttes}
                      </div>
                      <div className="p-2 border-r border-gray-300 flex justify-center min-w-[80px]">
                        <button className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-green-100 cursor-pointer">
                          <svg
                            className="w-3 h-3 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-2 flex justify-center min-w-[80px]">
                        <button className="w-6 h-6 bg-orange-200 border border-orange-400 rounded flex items-center justify-center hover:bg-orange-300 cursor-pointer">
                          <svg
                            className="w-3 h-3 text-orange-800"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Row - Sticky Bottom */}
              <div className="bg-blue-200 border-t border-gray-300 sticky bottom-0">
                <div className="grid grid-cols-5 gap-0">
                  <div className="p-3 font-bold text-blue-800 border-r border-gray-300 min-w-[180px]">
                    TOTAL
                  </div>
                  <div className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 min-w-[80px]">
                    100ml
                  </div>
                  <div className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 min-w-[100px]">
                    100
                  </div>
                  <div className="border-r border-gray-300 min-w-[80px]"></div>
                  <div className="min-w-[80px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex gap-3">
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer">
          Ajouter un Ingrédient
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer">
          Ma Liste d'Ingrédients
        </button>
      </div>

      {/* Add Ingredient Form */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
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
                <option value="Ingrédients de base">Ingrédients de base</option>
                <option value="Gommes et Gélifiant">Gommes et Gélifiant</option>
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

          {/* Right Column */}
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

            {/* Add Button */}
            <div className="flex justify-end pt-4">
              <button className="bg-[#4B352A] text-white px-8 py-3 rounded hover:bg-gray-700 cursor-pointer">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default IngredientsInterface;
