// /pages/private/dashboard.tsx
// import { getSession, signOut, useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';

// Définition du type pour un utilisateur pour plus de clarté et de sécurité
type User = {
  id: number;
  name: string;
  email: string;
  recipes: number;
  inscriptionDate: string;
  status: "Actif" | "Inactif" | "Suspendu";
};

// Liste de données fictives pour les utilisateurs
const users: User[] = [
  { id: 1, name: "Jane Nakoyame Japan", email: "nakoyame.japan@gmail.com", recipes: 23, inscriptionDate: "March 21, 2020 00:28", status: "Actif" },
  { id: 2, name: "John Doe", email: "john.doe@example.com", recipes: 15, inscriptionDate: "April 05, 2021 10:15", status: "Inactif" },
  { id: 3, name: "Alice Smith", email: "alice.smith@web.com", recipes: 42, inscriptionDate: "May 12, 2021 14:30", status: "Suspendu" },
  { id: 4, name: "Robert Brown", email: "robert.brown@mail.com", recipes: 8, inscriptionDate: "June 23, 2022 09:00", status: "Actif" },
  { id: 5, name: "Emily White", email: "emily.white@service.com", recipes: 31, inscriptionDate: "July 30, 2022 18:45", status: "Inactif" },
  { id: 6, name: "Michael Green", email: "michael.green@instance.com", recipes: 5, inscriptionDate: "August 19, 2023 11:20", status: "Actif" },
  { id: 7, name: "Sarah Black", email: "sarah.black@domain.com", recipes: 50, inscriptionDate: "September 01, 2023 22:05", status: "Suspendu" },

  { id: 8, name: "Jane Nakoyame Japan", email: "nakoyame.japan@gmail.com", recipes: 23, inscriptionDate: "March 21, 2020 00:28", status: "Actif" },
  { id: 9, name: "John Doe", email: "john.doe@example.com", recipes: 15, inscriptionDate: "April 05, 2021 10:15", status: "Inactif" },
  { id: 10, name: "Alice Smith", email: "alice.smith@web.com", recipes: 42, inscriptionDate: "May 12, 2021 14:30", status: "Suspendu" },
  { id: 11, name: "Robert Brown", email: "robert.brown@mail.com", recipes: 8, inscriptionDate: "June 23, 2022 09:00", status: "Actif" },
  { id: 12, name: "Emily White", email: "emily.white@service.com", recipes: 31, inscriptionDate: "July 30, 2022 18:45", status: "Inactif" },
  { id: 13, name: "Michael Green", email: "michael.green@instance.com", recipes: 5, inscriptionDate: "August 19, 2023 11:20", status: "Actif" },
  { id: 14, name: "Sarah Black", email: "sarah.black@domain.com", recipes: 50, inscriptionDate: "September 01, 2023 22:05", status: "Suspendu" },
];

// Composant pour afficher le badge de statut avec la couleur appropriée
const StatusBadge = ({ status }: { status: User["status"] }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  const styles = {
    Actif: "bg-green-100 text-green-800",
    Inactif: "bg-yellow-100 text-yellow-800",
    Suspendu: "bg-red-100 text-red-800",
  };
  return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
};

const Utilisateurs: NextPageWithLayout = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  // --- DÉBUT DE LA LOGIQUE DE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // --- FIN DE LA LOGIQUE DE PAGINATION ---

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h1>

      {/* Section des filtres et actions */}
      <div className="flex justify-between items-center my-6">
        {/* ... vos filtres restent ici ... */}
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* ... thead reste ici ... */}
          <thead>
            <tr>
              <th className="p-4 font-medium text-gray-500">Utilisateur</th>
              <th className="p-4 font-medium text-gray-500">Email</th>
              <th className="p-4 font-medium text-gray-500">Recettes</th>
              <th className="p-4 font-medium text-gray-500">Inscription</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* On map sur les utilisateurs de la page actuelle */}
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-800">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4 text-gray-600">{user.recipes}</td>
                <td className="p-4 text-gray-600">{user.inscriptionDate}</td>
                <td className="p-4"><StatusBadge status={user.status} /></td>
                <td className="p-4 text-blue-600 cursor-pointer hover:underline">Voir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination dynamique */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <p className="text-gray-600">
          Affichage {startIndex + 1}-{Math.min(endIndex, users.length)} sur {users.length} utilisateurs
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-100'}`}
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
}

Utilisateurs.isDashboard = true;

export default Utilisateurs;
// export const getServerSideProps = async (ctx: any) => {
//   const session = await getSession(ctx);
//   if (!session) return { redirect: { destination: '/public/login' } };
//   return { props: {} };
// };
