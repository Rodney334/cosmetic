import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseCategorieIngredientsType, PhaseType } from "@/types/phase.type";
import { PhaseData } from "@/types/recipe.type";
import { BookOpen, Check, CircleCheck, Search } from "lucide-react";
import { useState } from "react";

type PhaseTabType = {
  phaseData: PhaseCategorieIngredientsType[];
  activeTab: string;
  currentPhase: PhaseCategorieIngredientsType;
  ingredient: IngredientType[];
  selectedCategory: string;
  searchTerm: string;

  setActiveTab: (value: string) => void;
  setCurrentPhase: (value: PhaseCategorieIngredientsType) => void;
  setIngretient: (value: IngredientType[]) => void;
  setSelectedCategory: (value: string) => void;
  handleSearch: (value: string) => void;
};

export const IngredientTab = ({
  phaseData,
  activeTab,
  currentPhase,
  ingredient,
  selectedCategory,
  searchTerm,

  setActiveTab,
  setCurrentPhase,
  setIngretient,
  setSelectedCategory,
  handleSearch,
}: PhaseTabType) => {
  return (
    <>
      {/* Main Content Area with Categories and Ingredients Table */}
      {/* Phase list */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {phaseData.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(item._id);
              setCurrentPhase(item);
              setIngretient(item.ingredientsPossible);
            }}
            className={`px-4 py-2 rounded font-medium cursor-pointer whitespace-nowrap ${
              activeTab === item._id
                ? "bg-[#4B352A] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {item.nom}
          </button>
        ))}
      </div>
      <div className="bg-gray-300 p-4 rounded-lg">
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white p-2 mb-3 rounded-lg">
          <label className="font-medium text-gray-700">
            Rechercher un Ingrédient :
          </label>
          <div className="relative flex justify-start items-center gap-2 w-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-gray-700 w-full py-1 px-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Desktop View (hidden on mobile) */}
        <div className="hidden md:flex gap-4 h-96">
          {/* Left Panel - Categories */}
          <div className="w-64 bg-white rounded flex flex-col overflow-hidden">
            {/* Categories Header */}
            <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
              Famille / Catégories
            </div>

            {/* Categories List with scroll */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {currentPhase.categories.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCategory(item._id);
                        setIngretient(item.ingredients);
                      }}
                      className={`w-full p-3 text-left text-sm hover:bg-blue-50 cursor-pointer ${
                        selectedCategory === item._id
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-700"
                      }`}
                    >
                      {item.nom}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Ingredients Table */}
          <div className="flex-1 overflow-auto">
            <table className="min-w-full">
              <thead className="bg-[#4B352A] text-white">
                <tr>
                  <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[180px]">
                    Ingrédients
                  </th>
                  <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                    Dosage recommandé
                  </th>
                  <th className="p-3 text-center font-medium min-w-[80px]">
                    Guide
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Phase Header */}
                <tr className="bg-blue-200">
                  <td className="p-3 font-medium text-blue-800 border-r border-b border-gray-300 w-1/4">
                    {currentPhase.nom}
                    {searchTerm && (
                      <span className="text-sm font-normal ml-2">
                        ({ingredient.length} résultat(s))
                      </span>
                    )}
                  </td>
                  <td className="border-r border-gray-300 border-b w-2/4"></td>
                  <td className="border-b border-gray-300 w-1/4"></td>
                </tr>

                {/* Ingredients List */}
                {ingredient.length > 0 ? (
                  ingredient.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white hover:bg-gray-50 text-gray-600 border-b border-gray-200"
                    >
                      <td className="p-2 border-r border-gray-300 text-sm min-w-[180px]">
                        <div className="font-medium">{item.nom}</div>
                        <div className="text-xs text-gray-500">{item.inci}</div>
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center text-sm min-w-[80px]">
                        {item.dosageRecommande}
                      </td>
                      <td className="p-2 min-w-[80px]">
                        <BookOpen className="h-6 w-6 p-0.5 m-auto bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 text-center text-gray-500 bg-white"
                    >
                      {searchTerm
                        ? "Aucun ingrédient trouvé pour votre recherche"
                        : "Sélectionnez une catégorie ou recherchez un ingrédient"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View (cards) */}
        <div className="md:hidden">
          {/* Categories dropdown for mobile */}
          <div className="mb-4 bg-white rounded-lg overflow-hidden">
            <select
              value={selectedCategory}
              onChange={(e) => {
                const categoryId = e.target.value;
                setSelectedCategory(categoryId);
                const category = currentPhase.categories.find(
                  (c) => c._id === categoryId
                );
                if (category) {
                  setIngretient(category.ingredients);
                }
              }}
              className="w-full p-3 bg-[#4B352A] text-white font-medium"
            >
              <option value="">Sélectionnez une catégorie</option>
              {currentPhase.categories.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Phase header for mobile */}
          <div className="bg-blue-200 p-3 rounded-t-lg">
            <h3 className="font-medium text-blue-800">
              {currentPhase.nom}
              {searchTerm && (
                <span className="text-sm font-normal ml-2">
                  ({ingredient.length} résultat(s))
                </span>
              )}
            </h3>
          </div>

          {/* Ingredients cards */}
          {ingredient.length > 0 ? (
            <div className="space-y-3 mt-3">
              {ingredient.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 text-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">{item.nom}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.inci}</p>
                      <div className="mt-2">
                        <span className="font-medium">Dosage recommandé: </span>
                        <span>{item.dosageRecommande}</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <BookOpen className="h-6 w-6 p-0.5 bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-b-lg text-center text-gray-500">
              {searchTerm
                ? "Aucun ingrédient trouvé pour votre recherche"
                : "Sélectionnez une catégorie ou recherchez un ingrédient"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
