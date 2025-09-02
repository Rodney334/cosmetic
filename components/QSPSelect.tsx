import { useState, useMemo, useRef, useEffect } from "react";
import { IngredientType } from "@/types/ingredient.type";

interface QSPSelectProps {
  ingredients: IngredientType[];
  onSelect: (ingredient: IngredientType) => void;
  resetTrigger: boolean;
}

const QSPSelect = ({ ingredients, onSelect, resetTrigger }: QSPSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientType | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // Reset selection when resetTrigger changes
  useEffect(() => {
    setSelectedIngredient(null);
    setSearchTerm("");
  }, [resetTrigger]);

  // Filter ingredients based on search term
  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return ingredients;
    return ingredients.filter(
      (ingredient) =>
        ingredient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.inci.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.categorie.nom
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [ingredients, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (ingredient: IngredientType) => {
    setSelectedIngredient(ingredient);
    onSelect(ingredient);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-md" ref={selectRef}>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">QSP 100% :</label>

        {/* Select Trigger */}
        <div
          className="flex justify-between items-center p-2 border border-gray-300 rounded bg-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={selectedIngredient ? "text-gray-700" : "text-gray-500"}
          >
            {selectedIngredient
              ? selectedIngredient.nom
              : "Sélectionnez un QSP"}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown with search */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
            {/* Search input */}
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                className="w-full p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            {/* Options list with limited height */}
            <div className="max-h-60 overflow-y-auto">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient._id}
                    className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100"
                    onClick={() => handleSelect(ingredient)}
                  >
                    <div className="font-medium text-gray-800">
                      {ingredient.nom}
                    </div>
                    {/* <div className="text-sm text-gray-600">
                      {ingredient.inci}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Catégorie: {ingredient.categorie.nom}
                    </div> */}
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">
                  Aucun ingrédient trouvé
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QSPSelect;
