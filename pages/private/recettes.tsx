import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRecetteStore } from "@/stores/recette.store";
import { RecipeType } from "@/types/recipe.type";

const StatusBadge = ({
  status,
}: {
  status: "Validé" | "Modéré" | "Dangereux";
}) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  const styles = {
    Validé: "bg-green-100 text-green-800",
    Modéré: "bg-yellow-100 text-yellow-800",
    Dangereux: "bg-red-100 text-red-800",
  };
  return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
};

const Recettes: NextPageWithLayout = () => {
  const router = useRouter();
  const { recettes, getAllRecette } = useRecetteStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecipes, setCurrentRecipes] = useState<RecipeType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemPerPages] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // useEffect(() => {
  //   if (session?.accessToken) {
  //     getAllRecette(session.accessToken);
  //   }
  // }, [session]);

  useEffect(() => {
    if (recettes.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentRecipes(recettes.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(recettes.length / itemsPerPage));
    }
  }, [recettes, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Gestion des Recettes
      </h1>

      {/* Barre de recherche et filtres */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une recette..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            <option>Tous les statuts</option>
            <option>Validé</option>
            <option>Modéré</option>
            <option>Dangereux</option>
          </select>
          <select className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            <option>Trier par</option>
            <option>Date de création</option>
            <option>Nombre d'ingrédients</option>
            <option>Nom</option>
          </select>
        </div>
      </div>

      {/* Version Tableau - Visible sur desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-500">Recette</th>
              <th className="p-4 font-medium text-gray-500">Auteur</th>
              <th className="p-4 font-medium text-gray-500">Ingrédients</th>
              <th className="p-4 font-medium text-gray-500">Date création</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecipes.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{item.nom}</td>
                <td className="p-4 text-gray-600">
                  {item.auteurId?.name || "Inconnu"}
                </td>
                <td className="p-4 text-gray-600">{item.poidsTotal}</td>
                <td className="p-4 text-gray-600">
                  {new Date(item.dateCreation).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <StatusBadge status={"Validé"} />
                </td>
                <td className="p-4">
                  {/* <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Voir
                  </button> */}
                  <button
                    // onClick={() => handleViewUser(item)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Voir détails"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version Cards - Visible sur mobile */}
      <div className="lg:hidden grid gap-4">
        {currentRecipes.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{item.nom}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Par {item.auteurId?.name || "Inconnu"}
                </p>
              </div>
              <StatusBadge status={"Validé"} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Ingrédients</p>
                <p className="font-medium">{item.poidsTotal}</p>
              </div>
              <div>
                <p className="text-gray-500">Date création</p>
                <p className="font-medium">
                  {new Date(item.dateCreation).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm gap-4">
        <div className="text-gray-700 flex items-center gap-2">
          <label htmlFor="itemperpage">Item par page :</label>
          <select
            name="itemperpage"
            id="itemperpage"
            onChange={(e) => setItemPerPages(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="35">35</option>
          </select>
        </div>
        <p className="text-gray-600">
          Affichage {startIndex + 1} -{Math.min(endIndex, recettes.length)} sur{" "}
          {recettes.length} recettes
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
    </div>
  );
};

Recettes.isDashboard = true;

export default Recettes;
