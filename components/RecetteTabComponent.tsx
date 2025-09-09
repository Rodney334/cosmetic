import { IngredientType } from "@/types/ingredient.type";
import { PhaseCategorieIngredientsType, PhaseType } from "@/types/phase.type";
import { PhaseData } from "@/types/recipe.type";
import { CircleQuestionMark, Trash2 } from "lucide-react";
import { useState } from "react";

type RecetteTabType = {
  QSPphase: PhaseCategorieIngredientsType | undefined;
  phaseData: PhaseData[];
  removeIngredientFromPhase: (
    phaseId: string,
    ingredient: IngredientType
  ) => void;
  updateIngredientQuantity: (
    phaseId: string,
    ingredientId: string,
    newQuantity: string
  ) => void;
};

export const RecetteTab = ({
  QSPphase,
  phaseData,
  removeIngredientFromPhase,
  updateIngredientQuantity,
}: RecetteTabType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Version Desktop - Tableau */}
      <div className="hidden md:block text-gray-700 border border-gray-300 rounded-lg overflow-hidden mb-4 max-w-full">
        <div className="max-h-96 overflow-auto">
          <table className="min-w-full">
            <thead className="bg-[#4B352A] text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[150px]">
                  Ingrédients
                </th>
                <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[100px]">
                  Phase
                </th>
                {/* <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[120px]">
                  Famille
                </th> */}
                <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                  %
                </th>
                <th className="flex gap-1 p-3 text-center font-medium border-r border-gray-300 min-w-[150px]">
                  Coûts :
                  <select name="">
                    <option value="XOF" className="text-gray-600">
                      XOF
                    </option>
                    <option value="$" className="text-gray-600">
                      $
                    </option>
                    <option value="€" className="text-gray-600">
                      €
                    </option>
                  </select>
                </th>
                <th className="p-3 text-center font-medium min-w-[100px]">
                  Supprimer
                </th>
              </tr>
            </thead>
            {phaseData.map((item, index) => (
              <tbody key={`phase-${item.id}-${index}`}>
                {/* Phase Header Row */}
                <tr className="bg-blue-200">
                  <td className="p-3 font-medium text-blue-800 border-r border-gray-300 border-b min-w-[150px]">
                    {item.id === "0" ? "QSP" : item.title}
                  </td>
                  <td className="border-r border-gray-300 border-b w-1/4"></td>
                  <td className="border-r border-gray-300 border-b w-1/4"></td>
                  {/* <td className="border-r border-gray-300 border-b min-w-[80px]"></td> */}
                  <td className="border-r border-gray-300 border-b w-1/4"></td>
                  <td className="border-b border-gray-300 w-1/4"></td>
                </tr>

                {/* Phase Ingredients */}
                {item.ingredients.map((ingredient, index) => {
                  return (
                    <tr key={index} className="bg-white hover:bg-gray-50">
                      <td className="p-2 border border-gray-300 min-w-[150px]">
                        <span className="w-full text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded">
                          {ingredient.nom}
                        </span>
                      </td>
                      <td className="p-2 border-b border-gray-300 flex justify-center items-center min-w-[100px]">
                        <span className="bg-green-100 rounded text-xs font-medium text-green-800 min-w-6 text-center">
                          {item.id === "0" ? QSPphase?.nom : item.title}
                        </span>
                      </td>
                      {/* <td className="p-2 border border-gray-300 min-w-[120px]">
                        <span className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center">
                          {ingredient.categorie.nom}
                        </span>
                      </td> */}
                      <td
                        className={`relative p-2 border border-gray-300 min-w-[80px]`}
                      >
                        <input
                          type="text"
                          value={ingredient.quantite || ""}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (/^[0-9]*[,.]?[0-9]*$/.test(value)) {
                              const checkdecimal = [...value].filter(
                                (char) => char === "." || char === ","
                              ).length;
                              if (checkdecimal <= 1) {
                                updateIngredientQuantity(
                                  item.id,
                                  ingredient._id,
                                  value.replace(",", ".")
                                );
                              }
                            } else {
                              value = "";
                              updateIngredientQuantity(
                                item.id,
                                ingredient._id,
                                value.replace(",", ".")
                              );
                            }
                          }}
                          className="w-full p-1 text-sm border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          placeholder="-"
                          disabled={item.id === "0"}
                        />
                        <button
                          className={`absolute top-1 right-1`}
                          title={`Dosage recommandé : ${ingredient.dosageRecommande}`}
                        >
                          <CircleQuestionMark
                            className={`w-4 h-4 rounded font-medium text-amber-500 text-center`}
                          />
                        </button>
                      </td>
                      <td className="p-2 border-r border-b border-gray-300 min-w-[100px] text-center">
                        0
                      </td>
                      <td className="p-3 border-b border-gray-300 flex justify-center items-center min-w-[100px]">
                        <Trash2
                          className="w-6 h-6 p-1 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded cursor-pointer"
                          onClick={() => {
                            removeIngredientFromPhase(item.id, ingredient);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ))}
            <tfoot className="bg-blue-200 sticky bottom-0">
              <tr>
                <td className="p-3 font-bold text-blue-800 border-r border-gray-300 w-1/4">
                  TOTAL
                </td>
                <td className="border-r border-gray-300 w-1/4"></td>
                {/* <td className="border-r border-gray-300 min-w-[120px]"></td> */}
                <td className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 w-1/4">
                  {phaseData.reduce((total, phase) => {
                    return (
                      total +
                      phase.ingredients.reduce((sum, ingredient) => {
                        console.log({
                          sum,
                          qte: Number(ingredient.quantite),
                          somme: sum + Number(ingredient.quantite),
                        });
                        return sum + (Number(ingredient.quantite) || 0);
                      }, 0)
                    );
                  }, 0)}
                </td>
                <td className="p-3 text-center font-bold text-blue-800 border-r border-gray-300 w-1/4">
                  0.00
                </td>
                <td className="w-1/4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Version Mobile - Cartes */}
      <div className="md:hidden space-y-4 mb-4 text-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-[#4B352A] text-white p-3 rounded-lg font-medium flex justify-between items-center"
        >
          <span>Voir les ingrédients</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isExpanded &&
          phaseData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden"
            >
              <div className="bg-blue-200 p-3 font-medium text-blue-800 border-b border-gray-300">
                {item.id === "0" ? "QSP" : item.title}
              </div>

              {item.ingredients.map((ingredient) => (
                <div
                  key={ingredient._id}
                  className="border-b border-gray-200 p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{ingredient.nom}</div>
                    <Trash2
                      className="w-5 h-5 text-orange-500 hover:text-orange-700 flex-shrink-0"
                      onClick={() =>
                        removeIngredientFromPhase(item.id, ingredient)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Phase: </span>
                      <span className="bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800">
                        {item.id === "0" ? QSPphase?.nom : item.title}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">Famille: </span>
                      {ingredient.categorie.nom}
                    </div>

                    <div>
                      <span className="text-gray-500">%: </span>
                      <input
                        type="text"
                        value={ingredient.quantite || ""}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (/^[0-9]*[,.]?[0-9]*$/.test(value)) {
                            const checkdecimal = [...value].filter(
                              (char) => char === "."
                            ).length;
                            if (checkdecimal <= 1) {
                              updateIngredientQuantity(
                                item.id,
                                ingredient._id,
                                value
                              );
                            }
                          } else {
                            value = "";
                            updateIngredientQuantity(
                              item.id,
                              ingredient._id,
                              value
                            );
                          }
                        }}
                        className="w-16 p-1 text-sm border text-gray-600 border-gray-300 rounded text-center"
                        placeholder="-"
                        disabled={item.id === "0"}
                      />
                      <button
                        className={`m-2`}
                        title={`Dosage recommandé : ${ingredient.dosageRecommande}`}
                      >
                        <CircleQuestionMark
                          className={`w-4 h-4 rounded font-medium text-amber-500 text-center`}
                        />
                      </button>
                    </div>

                    <div>
                      <div className="flex gap-1">
                        <span className="text-gray-500">Coût: </span>
                        <select name="">
                          <option value="XOF" className="text-gray-600">
                            XOF
                          </option>
                          <option value="$" className="text-gray-600">
                            $
                          </option>
                          <option value="€" className="text-gray-600">
                            €
                          </option>
                        </select>
                      </div>
                      <span>0</span>
                      {/* <input
                        type="number"
                        step="0.01"
                        value={0}
                        readOnly
                        className="w-16 p-1 text-sm border border-gray-300 rounded text-center"
                      /> */}
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="bg-blue-100 p-3 font-bold text-blue-800 flex justify-between">
                <span>TOTAL</span>
                <div className="flex space-x-4">
                  <span>100%</span>
                  <span>0.00€</span>
                </div>
              </div> */}
            </div>
          ))}
      </div>
    </>
  );
};
