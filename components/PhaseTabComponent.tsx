import {
  IngredientByCategorieType,
  IngredientType,
} from "@/types/ingredient.type";
import { PhaseType } from "@/types/phase.type";
import { PhaseData } from "@/types/recipe.type";
import { BookOpen, Check, CircleCheck, Search } from "lucide-react";
import { useState, useMemo } from "react";

type PhaseTabType = {
  phaseData: PhaseData[];
  ingredientsByCategory: IngredientByCategorieType[];
  phaseIngredient: IngredientType[];
  currentPhase: PhaseType;
  selectedCategory: string;
  setPhaseIngretient: (value: React.SetStateAction<IngredientType[]>) => void;
  setSelectedCategory: (value: string) => void;
  addIngredientToPhase: (phaseId: string, ingredient: IngredientType) => void;
};

export const PhaseTab = ({
  phaseData,
  ingredientsByCategory,
  phaseIngredient,
  currentPhase,
  selectedCategory,
  setPhaseIngretient,
  setSelectedCategory,
  addIngredientToPhase,
}: PhaseTabType) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentPhaseData = phaseData.find((el) => el.id === currentPhase._id);

  // Récupérer tous les ingrédients de toutes les catégories autorisées dans la phase
  const allPhaseIngredients = useMemo(() => {
    if (!ingredientsByCategory || !currentPhase) return [];

    return ingredientsByCategory
      .filter((categoryGroup) =>
        currentPhase.allowedCategories.some(
          (allowedCat) => allowedCat._id === categoryGroup.category._id
        )
      )
      .flatMap((categoryGroup) => categoryGroup.ingredients);
  }, [ingredientsByCategory, currentPhase]);

  // Filtrer les ingrédients en fonction du terme de recherche
  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return allPhaseIngredients;

    return allPhaseIngredients.filter(
      (ingredient) =>
        ingredient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.inci.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.categorie.nom
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [allPhaseIngredients, searchTerm]);

  // Gérer la sélection d'une catégorie
  const handleCategorySelect = (
    categoryId: string,
    ingredients: IngredientType[]
  ) => {
    setSelectedCategory(categoryId);
    setPhaseIngretient(ingredients);
    setSearchTerm(""); // Réinitialiser la recherche quand on change de catégorie
  };

  return (
    <>
      {/* Version Desktop */}
      <div className="hidden md:block bg-gray-300 p-4 rounded-lg">
        <div className="flex gap-4 h-96">
          {/* Left Panel - Categories */}
          <div className="w-64 bg-white rounded flex flex-col overflow-hidden">
            <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
              Famille / Catégories
            </div>

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
                          onClick={() =>
                            handleCategorySelect(
                              item.category._id,
                              item.ingredients
                            )
                          }
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
            {/* Barre de recherche */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un ingrédient dans toutes les catégories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="text-xs text-gray-500 mt-1">
                  Recherche dans {filteredIngredients.length} ingrédient(s)
                </div>
              )}
            </div>

            <div className="max-h-80 overflow-auto">
              <table className="min-w-full">
                <thead className="bg-[#4B352A] text-white">
                  <tr>
                    <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[180px]">
                      Ingrédients
                    </th>
                    <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                      Dosage
                    </th>
                    <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
                      Ajouter
                    </th>
                    <th className="p-3 text-center font-medium min-w-[80px]">
                      Guide
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Phase Header */}
                  <tr className="bg-blue-200">
                    <td className="p-3 font-medium text-blue-800 border-r border-b border-gray-300 min-w-[180px]">
                      {currentPhase.nom}
                      {searchTerm && (
                        <span className="text-sm font-normal ml-2">
                          ({filteredIngredients.length} résultat(s))
                        </span>
                      )}
                    </td>
                    <td className="border-r border-gray-300 border-b min-w-[80px]"></td>
                    <td className="border-r border-gray-300 border-b min-w-[100px]"></td>
                    <td className="border-b border-gray-300 min-w-[80px]"></td>
                  </tr>

                  {/* Ingredients List */}
                  {filteredIngredients.length > 0 ? (
                    filteredIngredients.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white hover:bg-gray-50 text-gray-600 border-b border-gray-200"
                      >
                        <td className="p-2 border-r border-gray-300 text-sm min-w-[180px]">
                          <div className="font-medium">{item.nom}</div>
                          <div className="text-xs text-gray-500">
                            {item.inci}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.categorie.nom}
                          </div>
                        </td>
                        <td className="p-2 border-r border-gray-300 text-center text-sm min-w-[80px]">
                          {item.dosageRecommande}
                        </td>
                        <td className="p-2 border-r border-gray-300 min-w-[80px]">
                          {currentPhaseData?.ingredients.find(
                            (el) => el._id === item._id
                          ) ? (
                            <Check className="w-6 h-6 rounded-full m-auto text-green-600 font-bold text-sm cursor-not-allowed" />
                          ) : (
                            <CircleCheck
                              className="w-6 h-6 rounded-full m-auto hover:bg-green-100 text-gray-600 font-bold text-sm cursor-pointer"
                              onClick={() => {
                                addIngredientToPhase(currentPhase._id, item);
                              }}
                            />
                          )}
                        </td>
                        <td className="p-2 min-w-[80px]">
                          <BookOpen className="h-6 w-6 p-0.5 m-auto bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
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
        </div>
      </div>

      {/* Version Mobile */}
      <div className="md:hidden bg-gray-300 p-4 rounded-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-[#4B352A] text-white p-3 rounded-lg font-medium flex justify-between items-center mb-4"
        >
          <span>Voir les catégories et ingrédients</span>
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

        {isExpanded && (
          <div className="space-y-4">
            {/* Barre de recherche mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B352A] focus:border-transparent outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="text-xs text-gray-500">
                Recherche dans {filteredIngredients.length} ingrédient(s)
              </div>
            )}

            {/* Catégories */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
                Famille / Catégories
              </div>
              <div className="max-h-40 overflow-y-auto">
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
                          onClick={() =>
                            handleCategorySelect(
                              item.category._id,
                              item.ingredients
                            )
                          }
                          className={`w-full p-3 text-left text-sm border-b border-gray-200 ${
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

            {/* Ingrédients */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-blue-200 p-3 font-medium text-blue-800 border-b border-gray-300">
                {currentPhase.nom}
                {searchTerm && (
                  <span className="text-sm font-normal ml-2">
                    ({filteredIngredients.length} résultat(s))
                  </span>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredIngredients.length > 0 ? (
                  filteredIngredients.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 border-b flex flex-col border-gray-200"
                    >
                      <div className="font-medium mb-1">{item.nom}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        {item.inci}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        Catégorie: {item.categorie.nom}
                      </div>

                      <div className="flex-col gap-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Dosage: </span>
                          {item.dosageRecommande}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {currentPhaseData?.ingredients.find(
                            (el) => el._id === item._id
                          ) ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <CircleCheck
                              className="w-6 h-6 text-gray-600 cursor-pointer"
                              onClick={() =>
                                addIngredientToPhase(currentPhase._id, item)
                              }
                            />
                          )}
                          <BookOpen className="h-6 w-6 p-0.5 bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchTerm
                      ? "Aucun ingrédient trouvé pour votre recherche"
                      : "Sélectionnez une catégorie ou recherchez un ingrédient"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
// import {
//   IngredientByCategorieType,
//   IngredientType,
// } from "@/types/ingredient.type";
// import { PhaseType } from "@/types/phase.type";
// import { PhaseData } from "@/types/recipe.type";
// import { BookOpen, Check, CircleCheck } from "lucide-react";
// import { useState } from "react";

// type PhaseTabType = {
//   phaseData: PhaseData[];
//   ingredientsByCategory: IngredientByCategorieType[];
//   phaseIngredient: IngredientType[];
//   currentPhase: PhaseType;
//   selectedCategory: string;
//   setPhaseIngretient: (value: React.SetStateAction<IngredientType[]>) => void;
//   setSelectedCategory: (value: string) => void;
//   addIngredientToPhase: (phaseId: string, ingredient: IngredientType) => void;
// };

// export const PhaseTab = ({
//   phaseData,
//   ingredientsByCategory,
//   phaseIngredient,
//   currentPhase,
//   selectedCategory,
//   setPhaseIngretient,
//   setSelectedCategory,
//   addIngredientToPhase,
// }: PhaseTabType) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const currentPhaseData = phaseData.find((el) => el.id === currentPhase._id);

//   return (
//     <>
//       {/* Version Desktop */}
//       <div className="hidden md:block bg-gray-300 p-4 rounded-lg">
//         <div className="flex gap-4 h-96">
//           {/* Left Panel - Categories */}
//           <div className="w-64 bg-white rounded flex flex-col overflow-hidden">
//             <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
//               Famille / Catégories
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               <div className="divide-y divide-gray-200">
//                 {ingredientsByCategory &&
//                   ingredientsByCategory.map((item, index) => {
//                     if (
//                       currentPhase.allowedCategories.find(
//                         (el) => el._id === item.category._id
//                       )
//                     ) {
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => {
//                             setSelectedCategory(item.category._id);
//                             setPhaseIngretient(item.ingredients);
//                           }}
//                           className={`w-full p-3 text-left text-sm hover:bg-blue-50 cursor-pointer ${
//                             selectedCategory === item.category._id
//                               ? "bg-blue-100 text-blue-800"
//                               : "text-gray-700"
//                           }`}
//                         >
//                           {item.category.nom}
//                         </button>
//                       );
//                     }
//                   })}
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Ingredients Table */}
//           <div className="flex-1 bg-white rounded overflow-hidden flex flex-col">
//             <div className="max-h-96 overflow-auto">
//               <table className="min-w-full">
//                 <thead className="bg-[#4B352A] text-white">
//                   <tr>
//                     <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[180px]">
//                       Ingrédients
//                     </th>
//                     <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
//                       Dosage
//                     </th>
//                     <th className="p-3 text-center font-medium border-r border-gray-300 min-w-[80px]">
//                       Ajouter
//                     </th>
//                     <th className="p-3 text-center font-medium min-w-[80px]">
//                       Guide
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Phase Header */}
//                   <tr className="bg-blue-200">
//                     <td className="p-3 font-medium text-blue-800 border-r border-b border-gray-300 min-w-[180px]">
//                       {currentPhase.nom}
//                     </td>
//                     <td className="border-r border-gray-300 border-b min-w-[80px]"></td>
//                     <td className="border-r border-gray-300 border-b min-w-[100px]"></td>
//                     <td className="border-b border-gray-300 min-w-[80px]"></td>
//                   </tr>

//                   {/* Ingredients List */}
//                   {phaseIngredient.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="bg-white hover:bg-gray-50 text-gray-600 border-b border-gray-200"
//                     >
//                       <td className="p-2 border-r border-gray-300 text-sm min-w-[180px]">
//                         {item.nom}
//                       </td>
//                       <td className="p-2 border-r border-gray-300 text-center text-sm min-w-[80px]">
//                         {item.dosageRecommande}
//                       </td>
//                       <td className="p-2 border-r border-gray-300 min-w-[80px]">
//                         {currentPhaseData?.ingredients.find(
//                           (el) => el._id === item._id
//                         ) ? (
//                           <Check className="w-6 h-6 rounded-full m-auto text-green-600 font-bold text-sm cursor-not-allowed" />
//                         ) : (
//                           <CircleCheck
//                             className="w-6 h-6 rounded-full m-auto hover:bg-green-100 text-gray-600 font-bold text-sm cursor-pointer"
//                             onClick={() => {
//                               addIngredientToPhase(currentPhase._id, item);
//                             }}
//                           />
//                         )}
//                       </td>
//                       <td className="p-2 min-w-[80px]">
//                         <BookOpen className="h-6 w-6 p-0.5 m-auto bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Version Mobile */}
//       <div className="md:hidden bg-gray-300 p-4 rounded-lg">
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="w-full bg-[#4B352A] text-white p-3 rounded-lg font-medium flex justify-between items-center mb-4"
//         >
//           <span>Voir les catégories et ingrédients</span>
//           <svg
//             className={`w-5 h-5 transform transition-transform ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>

//         {isExpanded && (
//           <div className="space-y-4">
//             {/* Catégories */}
//             <div className="bg-white rounded-lg overflow-hidden">
//               <div className="bg-[#4B352A] text-white p-3 text-center font-medium">
//                 Famille / Catégories
//               </div>
//               <div className="max-h-40 overflow-y-auto">
//                 {ingredientsByCategory &&
//                   ingredientsByCategory.map((item, index) => {
//                     if (
//                       currentPhase.allowedCategories.find(
//                         (el) => el._id === item.category._id
//                       )
//                     ) {
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => {
//                             setSelectedCategory(item.category._id);
//                             setPhaseIngretient(item.ingredients);
//                           }}
//                           className={`w-full p-3 text-left text-sm border-b border-gray-200 ${
//                             selectedCategory === item.category._id
//                               ? "bg-blue-100 text-blue-800"
//                               : "text-gray-700"
//                           }`}
//                         >
//                           {item.category.nom}
//                         </button>
//                       );
//                     }
//                   })}
//               </div>
//             </div>

//             {/* Ingrédients */}
//             <div className="bg-white rounded-lg overflow-hidden">
//               <div className="bg-blue-200 p-3 font-medium text-blue-800 border-b border-gray-300">
//                 {currentPhase.nom}
//               </div>

//               <div className="max-h-60 overflow-y-auto">
//                 {phaseIngredient.map((item, index) => (
//                   <div
//                     key={index}
//                     className="p-3 border-b flex flex-col border-gray-200"
//                   >
//                     <div className="font-medium mb-2">{item.nom}</div>

//                     <div className="flex-col gap-2 text-sm mb-3">
//                       <div>
//                         <span className="text-gray-500">Dosage: </span>
//                         {item.dosageRecommande}
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <div className="flex space-x-2">
//                         {currentPhaseData?.ingredients.find(
//                           (el) => el._id === item._id
//                         ) ? (
//                           <Check className="w-6 h-6 text-green-600" />
//                         ) : (
//                           <CircleCheck
//                             className="w-6 h-6 text-gray-600 cursor-pointer"
//                             onClick={() =>
//                               addIngredientToPhase(currentPhase._id, item)
//                             }
//                           />
//                         )}
//                         <BookOpen className="h-6 w-6 p-0.5 bg-white border border-black rounded-md hover:bg-gray-200 cursor-pointer" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
