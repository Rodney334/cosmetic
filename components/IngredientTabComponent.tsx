import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseType } from "@/types/phase.type";
import { PhaseData } from "@/types/recipe.type";
import { BookOpen, Check, CircleCheck } from "lucide-react";

type PhaseTabType = {
  phaseData: PhaseData[];
  ingredientsByCategory: IngredientByCategorieType[];
  phaseIngredient: IngredientType[];
  currentPhase: PhaseType;
  selectedCategory: string;
  setPhaseIngretient: (value: React.SetStateAction<IngredientType[]>) => void;
  setSelectedCategory: (value: string) => void;
};

export const IngredientTab = ({
  phaseData,
  ingredientsByCategory,
  phaseIngredient,
  currentPhase,
  selectedCategory,
  setPhaseIngretient,
  setSelectedCategory,
}: PhaseTabType) => {
  return (
    <>
      {/* Main Content Area with Categories and Ingredients Table */}
      <div className="bg-gray-300 p-4 rounded-lg">
        <div className="flex gap-4 h-96">
          {/* Left Panel - Categories */}
          <div className="w-64 bg-white rounded flex flex-col overflow-hidden">
            {/* Categories Header */}
            <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
              Famille / Catégories
            </div>

            {/* Categories List with scroll */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {ingredientsByCategory &&
                  ingredientsByCategory.map((item, index) => {
                    if (
                      currentPhase.allowedCategories.find(
                        (el) => el._id === item.category._id
                      )
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedCategory(item.category._id);
                            setPhaseIngretient(item.ingredients);
                          }}
                          className={`w-full p-3 text-left text-sm hover:bg-blue-50 cursor-pointer ${
                            selectedCategory === item.category._id
                              ? "bg-blue-100 text-blue-800"
                              : "text-gray-700"
                          }`}
                        >
                          {item.category.nom}
                        </button>
                      );
                    }
                  })}
              </div>
            </div>
          </div>

          {/* Right Panel - Ingredients Table */}
          <div className="flex-1 bg-white rounded overflow-hidden flex flex-col">
            {/* Container with fixed dimensions and scroll */}
            <div className="min-w-[600px] flex-1 flex flex-col overflow-hidden">
              {/* Table Header - Sticky */}
              <div className="bg-[#4B352A] text-white">
                <div className="grid grid-cols-5 gap-0">
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[180px]">
                    Ingrédients
                  </div>
                  <div className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                    Dosage Recommandé
                  </div>
                  <div className="p-3 text-center font-medium min-w-[80px]">
                    Guide
                  </div>
                </div>
              </div>

              {/* Phase Header */}
              <div className="bg-blue-200">
                <div className="grid grid-cols-5 gap-0">
                  <div className="p-3 font-medium text-blue-800 border-r border-b border-gray-300 min-w-[180px]">
                    {currentPhase.nom}
                  </div>
                  <div className="border-r border-gray-300 border-b min-w-[80px]"></div>
                  <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                  <div className="border-r border-gray-300 border-b min-w-[80px]"></div>
                  <div className="border-b border-gray-300 min-w-[80px]"></div>
                </div>
              </div>

              {/* Ingredients List with scroll */}
              <div className="flex-1 overflow-y-auto">
                {phaseIngredient.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white hover:bg-gray-50 text-gray-600"
                  >
                    <div className="grid grid-cols-5 gap-0 border-b border-gray-200">
                      <div className="p-2 border-r border-gray-300 text-sm min-w-[180px]">
                        {item.nom}
                      </div>
                      <div className="p-2 border-r border-gray-300 text-center text-sm min-w-[80px]">
                        {item.dosageRecommande}
                      </div>
                      <div className="p-2 flex justify-center min-w-[80px]">
                        <BookOpen className="h-6 w-6 p-0.5 bg-white border border-black rounded-md flex items-center justify-center hover:bg-gray-200 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
