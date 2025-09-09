import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import {
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
} from "lucide-react";
import { useIngredientStore } from "@/stores/ingredient.store";
import { usePhaseStore } from "@/stores/phase.store";
import { useEffect, useState } from "react";
import { IngredientType } from "@/types/ingredient.type";
import { PhaseType } from "@/types/phase.type";
import { useCategoryStore } from "@/stores/categorie.store";
import axios from "axios";
import Modal from "@/components/Modal";
import { api } from "@/constantes/api.constante";

type CustomPhase = {
  phase: PhaseType;
  ingredients: IngredientType[];
};

const Ingredients: NextPageWithLayout = () => {
  const router = useRouter();
  const { groupIngredientsByPhase } = useIngredientStore();
  const { phaseAll, getAllPhase } = usePhaseStore();
  const { categories, getAllCategory } = useCategoryStore();

  // États pour les modales et filtres
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // États pour la suppression
  const [ingredientToDelete, setIngredientToDelete] =
    useState<IngredientType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // États pour le formulaire
  const [formData, setFormData] = useState({
    nom: "",
    inci: "",
    origine: "",
    forme: "",
    categorie: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPhases, setCurrentPhases] = useState<CustomPhase[]>([]);
  const [allPhases, setAllPhases] = useState<CustomPhase[]>([]);
  const [filteredPhases, setFilteredPhases] = useState<CustomPhase[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemPerPages] = useState(1);

  // États pour le feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch phases et catégories
  // useEffect(() => {
  //   if (accessToken) {
  //     getAllPhase(accessToken);
  //     getAllCategory(accessToken);
  //   }
  // }, []);

  // Group ingredients by phase
  // useEffect(() => {
  //   const fetchIngredientsByPhase = async () => {
  //     if (accessToken && phaseAll.length > 0) {
  //       const phasesWithIngredients = await Promise.all(
  //         phaseAll.map(async (phase) => {
  //           const ingredients = await groupIngredientsByPhase(
  //             session.accessToken!,
  //             phase._id
  //           );
  //           return { phase, ingredients };
  //         })
  //       );
  //       setAllPhases(phasesWithIngredients);
  //       setFilteredPhases(phasesWithIngredients);
  //     }
  //   };

  //   fetchIngredientsByPhase();
  // }, [session, phaseAll]);

  // Filtrer les ingrédients
  useEffect(() => {
    let result = [...allPhases];

    // Filtre par catégorie
    if (selectedCategory) {
      result = result
        .map((phase) => ({
          ...phase,
          ingredients: phase.ingredients.filter(
            (ingredient) => ingredient.categorie?._id === selectedCategory
          ),
        }))
        .filter((phase) => phase.ingredients.length > 0);
    }

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result
        .map((phase) => ({
          ...phase,
          ingredients: phase.ingredients.filter(
            (ingredient) =>
              ingredient.nom.toLowerCase().includes(term) ||
              ingredient.inci?.toLowerCase().includes(term)
          ),
        }))
        .filter((phase) => phase.ingredients.length > 0);
    }

    setFilteredPhases(result);
    setCurrentPage(1); // Reset à la première page après filtrage
  }, [allPhases, selectedCategory, searchTerm]);

  // Update current phases based on pagination
  useEffect(() => {
    if (filteredPhases.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentPhases(filteredPhases.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredPhases.length / itemsPerPage));
    } else {
      setCurrentPhases([]);
      setTotalPages(0);
    }
  }, [filteredPhases, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Gestion du formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const payload = {
  //       ...formData,
  //     };

  //     const response = await axios.post(`${api.base_url}/ingredient`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${session?.accessToken}`,
  //       },
  //     });

  //     setMessage({ text: "Ingrédient ajouté avec succès", type: "success" });
  //     // Rafraîchir les données
  //     if (session?.accessToken) {
  //       const phasesWithIngredients = await Promise.all(
  //         phaseAll.map(async (phase) => {
  //           const ingredients = await groupIngredientsByPhase(
  //             session.accessToken!,
  //             phase._id
  //           );
  //           return { phase, ingredients };
  //         })
  //       );
  //       setAllPhases(phasesWithIngredients);
  //       setFilteredPhases(phasesWithIngredients);
  //     }
  //     setFormData({
  //       nom: "",
  //       inci: "",
  //       origine: "",
  //       forme: "",
  //       categorie: "",
  //     });
  //     setShowAddModal(false);
  //   } catch (error) {
  //     setMessage({ text: "Erreur lors de l'ajout", type: "error" });
  //   } finally {
  //     setIsLoading(false);
  //     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  //   }
  // };

  // Fonction pour supprimer un ingrédient
  // const handleDeleteIngredient = async () => {
  //   if (!ingredientToDelete || !session?.accessToken) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.delete(
  //       `${api.base_url}/ingredient/${ingredientToDelete._id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${session.accessToken}`,
  //         },
  //       }
  //     );

  //     setMessage({ text: "Ingrédient supprimé avec succès", type: "success" });

  //     // Rafraîchir les données
  //     const phasesWithIngredients = await Promise.all(
  //       phaseAll.map(async (phase) => {
  //         const ingredients = await groupIngredientsByPhase(
  //           session?.accessToken!,
  //           phase._id
  //         );
  //         return { phase, ingredients };
  //       })
  //     );
  //     setAllPhases(phasesWithIngredients);
  //     setFilteredPhases(phasesWithIngredients);

  //     setShowDeleteModal(false);
  //     setIngredientToDelete(null);
  //   } catch (error) {
  //     setMessage({ text: "Erreur lors de la suppression", type: "error" });
  //   } finally {
  //     setIsLoading(false);
  //     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  //   }
  // };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
  };

  // if (!session) return <div>Chargement...</div>;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      {/* Message de feedback */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Gestion des Ingrédients
      </h1>

      {/* Filtres et actions */}
      <div className="flex flex-col justify-between gap-4 mb-6">
        <div className="flex flex-row gap-4 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher ingrédient..."
              className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Toutes les familles</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.nom}
                </option>
              ))}
            </select>
            {(selectedCategory || searchTerm) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            Imprimer
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Exporter CSV
          </button>
          <button
            onClick={() => setShowCategoriesModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            Catégories
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Onglets de Phase */}
      {/* <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        <button className="px-4 py-2 whitespace-nowrap bg-blue-600 text-white rounded-lg text-sm font-medium">
          Tous
        </button>
        {phaseAll.map((phase) => (
          <button
            key={phase._id}
            className="px-4 py-2 whitespace-nowrap border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
          >
            {phase.nom}
          </button>
        ))}
      </div> */}

      {/* Version Tableau - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-500">Phase</th>
              <th className="p-4 font-medium text-gray-500">Ingrédient</th>
              <th className="p-4 font-medium text-gray-500">Famille</th>
              <th className="p-4 font-medium text-gray-500">Forme</th>
              <th className="p-4 font-medium text-gray-500">Quantité</th>
              <th className="p-4 font-medium text-gray-500">Coût</th>
              <th className="p-4 font-medium text-gray-500 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPhases.map(({ phase, ingredients }) => (
              <>
                <tr key={`header-${phase._id}`} className="bg-blue-50">
                  <td colSpan={7} className="p-3 font-semibold text-blue-800">
                    {phase.nom}
                  </td>
                </tr>
                {ingredients.map((ingredient) => (
                  <tr
                    key={ingredient._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600">{phase.nom}</td>
                    <td className="p-4 font-medium text-gray-800">
                      {ingredient.nom}
                    </td>
                    <td className="p-4 text-gray-600">
                      {ingredient.categorie?.nom}
                    </td>
                    <td className="p-4 text-gray-600">{ingredient.forme}</td>
                    <td className="p-4 text-gray-600">
                      {ingredient.quantite} {ingredient.unitesDisponibles?.[0]}
                    </td>
                    <td className="p-4 text-gray-600">
                      {ingredient.quantite} {ingredient.devise}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Supprimer"
                        onClick={() => {
                          setIngredientToDelete(ingredient);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {currentPhases.map(({ phase, ingredients }) => (
          <div
            key={`mobile-phase-${phase._id}`}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-blue-50 p-3">
              <h3 className="font-semibold text-blue-800">{phase.nom}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {ingredients.map((ingredient) => (
                <div key={`mobile-${ingredient._id}`} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {ingredient.nom}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {ingredient.categorie?.nom}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Supprimer"
                      onClick={() => {
                        setIngredientToDelete(ingredient);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Forme</p>
                      <p className="text-gray-800">{ingredient.forme}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantité</p>
                      <p className="text-gray-800">
                        {ingredient.quantite}{" "}
                        {ingredient.unitesDisponibles?.[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Coût</p>
                      <p className="text-gray-800">
                        {ingredient.quantite} {ingredient.devise}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm gap-4">
        <p className="text-gray-600">
          Affichage {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredPhases.length)} sur{" "}
          {filteredPhases.length} phases
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal pour ajouter un ingrédient */}
      {/* <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un ingrédient"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              INCI
            </label>
            <input
              type="text"
              name="inci"
              value={formData.inci}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origine
            </label>
            <input
              type="text"
              name="origine"
              value={formData.origine}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forme
            </label>
            <input
              type="text"
              name="forme"
              value={formData.forme}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "En cours..." : "Ajouter"}
            </button>
          </div>
        </form>
      </Modal> */}

      {/* Modal pour afficher les catégories */}
      <Modal
        isOpen={showCategoriesModal}
        onClose={() => setShowCategoriesModal(false)}
        title="Liste des catégories"
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category._id}
              className="p-3 border-b border-gray-200 last:border-b-0"
            >
              <h4 className="font-medium text-gray-800">{category.nom}</h4>
              {/* <p className="text-sm text-gray-600 mt-1">{category.description}</p> */}
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setShowCategoriesModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </Modal>

      {/* Modal de confirmation pour suppression */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setIngredientToDelete(null);
        }}
        title="Confirmer la suppression"
      >
        {ingredientToDelete && (
          <div className="space-y-4">
            <p>
              Êtes-vous sûr de vouloir supprimer définitivement l'ingrédient{" "}
              <span className="font-semibold">{ingredientToDelete.nom}</span> ?
              Cette action est irréversible.
            </p>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setIngredientToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              {/* <button
                onClick={handleDeleteIngredient}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Suppression..." : "Supprimer définitivement"}
              </button> */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

Ingredients.isDashboard = true;

export default Ingredients;
