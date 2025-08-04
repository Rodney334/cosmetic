import { IngredientType } from "@/types/ingredient.type";
import { PhaseData } from "@/types/recipe.type";
import { Trash2 } from "lucide-react";

type RecetteTabType = {
  phaseData: PhaseData[];
  removeIngredientFromPhase: (
    phaseId: string,
    ingredient: IngredientType
  ) => void;
};

export const RecetteTab = ({
  phaseData,
  removeIngredientFromPhase,
}: RecetteTabType) => {
  return (
    <>
      {/* Main Table - Redesigned to match the image exactly */}
      <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 max-w-full">
        {/* Container with fixed dimensions and scroll */}
        <div className="max-h-96 overflow-auto">
          <div className="min-w-[800px]">
            {/* Table Header - Sticky */}
            <div className="bg-[#4B352A] text-white sticky top-0 z-10">
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
            {phaseData.map((item, index) => (
              <div key={item.id + index}>
                {/* Phase Header Row */}
                <div className="bg-blue-200">
                  <div className="grid grid-cols-6 gap-0">
                    <div className="p-3 font-medium text-blue-800 border-r border-gray-300 border-b min-w-[150px]">
                      {item.title}
                    </div>
                    <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                    <div className="border-r border-gray-300 border-b min-w-[120px]"></div>
                    <div className="border-r border-gray-300 border-b min-w-[80px]"></div>
                    <div className="border-r border-gray-300 border-b min-w-[100px]"></div>
                    <div className="border-b border-gray-300 min-w-[100px]"></div>
                  </div>
                </div>

                {/* Phase Ingredients */}
                {item.ingredients.map((ingredient) => (
                  <div key={ingredient._id} className="bg-white">
                    <div className="grid grid-cols-6 gap-0 hover:bg-gray-50">
                      <div className="p-2 border-r border-gray-300 border-b min-w-[150px]">
                        <input
                          type="text"
                          value={ingredient.nom}
                          onChange={
                            (e) => {
                              console.log("bla");
                            }
                            // updateIngredient(
                            //   phaseIndex,
                            //   ingredient.id,
                            //   "name",
                            //   e.target.value
                            // )
                          }
                          className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          placeholder="-"
                        />
                      </div>
                      <div className="p-2 border-r border-gray-300 border-b flex justify-center items-center min-w-[100px]">
                        <span className="inline-block bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800 min-w-6 text-center">
                          {item.title}
                        </span>
                      </div>
                      <div className="p-2 border-r border-b border-gray-300 min-w-[120px]">
                        <input
                          type="text"
                          value={ingredient.categorie.nom}
                          onChange={
                            (e) => {
                              console.log("blabla");
                            }
                            // updateIngredient(
                            //   phaseIndex,
                            //   ingredient.id,
                            //   "family",
                            //   e.target.value
                            // )
                          }
                          className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          placeholder="-"
                        />
                      </div>
                      <div className="p-2 border-r border-gray-300 border-b min-w-[80px]">
                        <input
                          type="number"
                          step="0.1"
                          // value={ingredient.percentage}
                          onChange={
                            (e) => {
                              console.log("blablabla");
                            }
                            // updateIngredient(
                            //   phaseIndex,
                            //   ingredient.id,
                            //   "percentage",
                            //   e.target.value
                            // )
                          }
                          className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          placeholder="-"
                        />
                      </div>
                      <div className="p-2 border-r border-b border-gray-300 min-w-[100px]">
                        <input
                          type="number"
                          step="0.01"
                          // value={ingredient.cost}
                          onChange={
                            (e) => {
                              console.log("cout");
                            }
                            // updateIngredient(
                            //   phaseIndex,
                            //   ingredient.id,
                            //   "cost",
                            //   e.target.value
                            // )
                          }
                          className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          placeholder="-"
                        />
                      </div>
                      <div className="p-2 border-b border-gray-300 flex justify-center items-center min-w-[100px]">
                        <Trash2
                          className="w-6 h-6 p-1 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded cursor-pointer"
                          onClick={() => {
                            removeIngredientFromPhase(item.id, ingredient);
                          }}
                        />
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
                  {/* {getTotalPercentage().toFixed(1)} */}
                  100
                </div>
                <div className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 min-w-[100px]">
                  {/* {getTotalCost().toFixed(2)} */}
                  0.00
                </div>
                <div className="min-w-[100px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
