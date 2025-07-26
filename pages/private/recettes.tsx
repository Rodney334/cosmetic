// /pages/private/dashboard.tsx
// import { getSession, signOut, useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Type pour une recette
type Recipe = {
  id: number;
  name: string;
  author: string;
  ingredients: number;
  creationDate: string;
  status: 'Validé' | 'Modéré' | 'Dangereux';
};

// Données fictives
const recipes: Recipe[] = [
  { id: 1, name: "Sérum Anti-Âge", author: "nakoyame.japan@gmail.com", ingredients: 23, creationDate: "March 21, 2020 00:28", status: "Validé" },
  { id: 2, name: "Crème Hydratante", author: "alice.smith@web.com", ingredients: 15, creationDate: "April 02, 2021 11:45", status: "Modéré" },
  { id: 3, name: "Lotion Tonique", author: "john.doe@example.com", ingredients: 8, creationDate: "May 15, 2021 16:20", status: "Dangereux" },
  { id: 4, name: "Masque Purifiant", author: "emily.white@service.com", ingredients: 12, creationDate: "June 01, 2022 09:30", status: "Modéré" },
  { id: 5, name: "Baume à Lèvres", author: "robert.brown@mail.com", ingredients: 5, creationDate: "July 22, 2022 14:00", status: "Validé" },
  { id: 6, name: "Shampooing Solide", author: "sarah.black@domain.com", ingredients: 18, creationDate: "August 30, 2023 18:55", status: "Modéré" },
];

// Composant pour le badge de statut
const StatusBadge = ({ status }: { status: Recipe['status'] }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  const styles = {
    Validé: "bg-green-100 text-green-800",
    Modéré: "bg-yellow-100 text-yellow-800",
    Dangereux: "bg-red-100 text-red-800",
  };
  return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
};

const Recettes: NextPageWithLayout = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  // --- LOGIQUE DE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Gestion des Recettes</h1>
      {/* ... Filtres ... */}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-4 font-medium text-gray-500">Recette</th>
              <th className="p-4 font-medium text-gray-500">Auteur</th>
              <th className="p-4 font-medium text-gray-500">Ingrédients</th>
              <th className="p-4 font-medium text-gray-500">Date création</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipes.map((recipe) => (
              <tr key={recipe.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-800">{recipe.name}</td>
                <td className="p-4 text-gray-600">{recipe.author}</td>
                <td className="p-4 text-gray-600">{recipe.ingredients}</td>
                <td className="p-4 text-gray-600">{recipe.creationDate}</td>
                <td className="p-4"><StatusBadge status={recipe.status} /></td>
                <td className="p-4 text-blue-600 cursor-pointer hover:underline">Voir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination dynamique */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <p className="text-gray-600">
          Affichage {startIndex + 1}-{Math.min(endIndex, recipes.length)} sur {recipes.length} recettes
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
              {page}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

Recettes.isDashboard = true;

export default Recettes;
// export const getServerSideProps = async (ctx: any) => {
//   const session = await getSession(ctx);
//   if (!session) return { redirect: { destination: '/public/login' } };
//   return { props: {} };
// };
