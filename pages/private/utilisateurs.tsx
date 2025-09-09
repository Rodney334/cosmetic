// /pages/private/dashboard.tsx
import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowUpDown,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user.store";
import { UserType } from "@/types/user.type";
import { api } from "@/constantes/api.constante";
import Modal from "@/components/Modal"; // Vous devrez créer ce composant
import axios from "axios";
import { authStore } from "@/stores/auth.store";

type User = {
  id: number;
  name: string;
  email: string;
  recipes: number;
  inscriptionDate: string;
  status: "Actif" | "Inactif" | "Suspendu";
};

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
  const router = useRouter();
  const { userAll, getAllUser, getUserById } = useUserStore();
  const { token, user } = authStore();

  // États pour les modales et actions
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Pagination
  const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPages] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // useEffect(() => {
  //   if (session && session.accessToken) {
  //     getAllUser(session.accessToken);
  //   }
  // }, [session]);

  useEffect(() => {
    if (userAll.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentUsers(userAll.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(userAll.length / itemsPerPage));
    }
  }, [userAll, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Afficher les détails de l'utilisateur
  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  // Préparer la promotion/rétrogradation
  const handlePreparePromote = (user: UserType) => {
    setSelectedUser(user);
    setShowPromoteModal(true);
  };

  // Promouvoir ou rétrograder un utilisateur
  const handlePromoteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      if (selectedUser.role !== "admin" && selectedUser.role !== "user") return;
      const response = await axios.patch(
        `${api.base_url}/users/${selectedUser._id}/promote-user`,
        {
          role:
            selectedUser.role === "admin"
              ? "user"
              : selectedUser.role === "user"
              ? "admin"
              : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setMessage({
          text: `Utilisateur ${
            selectedUser.role === "admin" ? "rétrogradé" : "promu"
          } avec succès`,
          type: "success",
        });
        // getAllUser(.accessToken!); // Rafraîchir la liste des utilisateurs
      } else {
        setMessage({
          text: "Une erreur est survenue",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Erreur réseau",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setShowPromoteModal(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // Préparer la suppression
  const handlePrepareDelete = (user: UserType) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${api.base_url}/users/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setMessage({
          text: "Utilisateur supprimé avec succès",
          type: "success",
        });
        // getAllUser(accessToken!); // Rafraîchir la liste des utilisateurs
      } else {
        setMessage({
          text: "Une erreur est survenue lors de la suppression",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Erreur réseau",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // Fermer toutes les modales
  const closeAllModals = () => {
    setShowUserModal(false);
    setShowPromoteModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

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
        Gestion des Utilisateurs
      </h1>

      {/* Barre de recherche et filtres (inchangé) */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* ... */}
      </div>

      {/* Version Tableau - Visible sur desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-500">Utilisateur</th>
              <th className="p-4 font-medium text-gray-500">Email</th>
              <th className="p-4 font-medium text-gray-500">Recettes</th>
              <th className="p-4 font-medium text-gray-500">Inscription</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4 text-gray-600">{item.email}</td>
                <td className="p-4 text-gray-600">{10}</td>
                <td className="p-4 text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <StatusBadge status={"Actif"} />
                </td>
                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => handleViewUser(item)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Voir détails"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handlePreparePromote(item)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                    title={item.role === "admin" ? "Rétrograder" : "Promouvoir"}
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handlePrepareDelete(item)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version Cards - Visible sur mobile */}
      <div className="lg:hidden grid gap-4">
        {currentUsers.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.email}</p>
              </div>
              <StatusBadge status={"Actif"} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Recettes</p>
                <p className="font-medium">10</p>
              </div>
              <div>
                <p className="text-gray-500">Inscription</p>
                <p className="font-medium">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => handleViewUser(item)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Voir détails"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePreparePromote(item)}
                className="text-orange-600 hover:text-orange-800 transition-colors"
                title={item.role === "admin" ? "Rétrograder" : "Promouvoir"}
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePrepareDelete(item)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (inchangé) */}
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
          Affichage {startIndex + 1}-{Math.min(endIndex, userAll.length)} sur{" "}
          {userAll.length} utilisateurs
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

      {/* Modal de visualisation */}
      <Modal
        isOpen={showUserModal}
        onClose={closeAllModals}
        title="Détails de l'utilisateur"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Nom complet</h4>
              <p className="mt-1">{selectedUser.name}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Email</h4>
              <p className="mt-1">{selectedUser.email}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Rôle</h4>
              <p className="mt-1 capitalize">{selectedUser.role}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Date d'inscription</h4>
              <p className="mt-1">
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de confirmation pour promotion/rétrogradation */}
      <Modal
        isOpen={showPromoteModal}
        onClose={closeAllModals}
        title={
          selectedUser?.role === "admin"
            ? "Rétrograder l'utilisateur"
            : "Promouvoir l'utilisateur"
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <p>
              Êtes-vous sûr de vouloir{" "}
              {selectedUser.role === "admin" ? "rétrograder" : "promouvoir"}{" "}
              l'utilisateur{" "}
              <span className="font-semibold">{selectedUser.name}</span> ?
            </p>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handlePromoteUser}
                disabled={isLoading}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                {isLoading
                  ? "Traitement..."
                  : selectedUser.role === "admin"
                  ? "Rétrograder"
                  : "Promouvoir"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de confirmation pour suppression */}
      <Modal
        isOpen={showDeleteModal}
        onClose={closeAllModals}
        title="Supprimer l'utilisateur"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p>
              Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur{" "}
              <span className="font-semibold">{selectedUser.name}</span> ? Cette
              action est irréversible.
            </p>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Suppression..." : "Supprimer définitivement"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

Utilisateurs.isDashboard = true;

export default Utilisateurs;

// // /pages/private/dashboard.tsx
// import type { NextPageWithLayout } from "@/types";
// import { useRouter } from "next/router";
// import {
//   Search,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   ArrowUpDown,
//   Delete,
//   Trash2,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useUserStore } from "@/stores/user.store";
// import { useSession } from "next-auth/react";
// import { UserType } from "@/types/user.type";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   recipes: number;
//   inscriptionDate: string;
//   status: "Actif" | "Inactif" | "Suspendu";
// };
// // ... (les types et données mockées restent les mêmes) ...

// const StatusBadge = ({ status }: { status: User["status"] }) => {
//   const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
//   const styles = {
//     Actif: "bg-green-100 text-green-800",
//     Inactif: "bg-yellow-100 text-yellow-800",
//     Suspendu: "bg-red-100 text-red-800",
//   };
//   return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
// };

// const Utilisateurs: NextPageWithLayout = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const { userAll, getAllUser, getUserById } = useUserStore();

//   // Pagination
//   const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1); // Assure-toi d'avoir ce state

//   const [itemsPerPage, setItemPerPages] = useState(2);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   useEffect(() => {
//     if (userAll.length > 0) {
//       const startIndex = (currentPage - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       setCurrentUsers(userAll.slice(startIndex, endIndex));
//       setTotalPages(Math.ceil(userAll.length / itemsPerPage));
//     }
//   }, [userAll, currentPage]); // Ajoute currentPage comme dépendance

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
//       <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
//         Gestion des Utilisateurs
//       </h1>

//       {/* Barre de recherche et filtres */}
//       <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
//         <div className="relative w-full md:w-64">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Rechercher un utilisateur..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//         <div className="flex gap-2 w-full md:w-auto">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
//             <option>Tous les statuts</option>
//             <option>Actif</option>
//             <option>Inactif</option>
//             <option>Suspendu</option>
//           </select>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
//             <option>Trier par</option>
//             <option>Date d'inscription</option>
//             <option>Nombre de recettes</option>
//             <option>Nom</option>
//           </select>
//         </div>
//       </div>

//       {/* Version Tableau - Visible sur desktop */}
//       <div className="hidden lg:block overflow-x-auto">
//         <table className="w-full text-left rounded-lg overflow-hidden">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 font-medium text-gray-500">Utilisateur</th>
//               <th className="p-4 font-medium text-gray-500">Email</th>
//               <th className="p-4 font-medium text-gray-500">Recettes</th>
//               <th className="p-4 font-medium text-gray-500">Inscription</th>
//               <th className="p-4 font-medium text-gray-500">Status</th>
//               <th className="p-4 font-medium text-gray-500">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentUsers.map((item) => (
//               <tr key={item._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="p-4 font-medium text-gray-800">{item.name}</td>
//                 <td className="p-4 text-gray-600">{item.email}</td>
//                 <td className="p-4 text-gray-600">{10}</td>
//                 <td className="p-4 text-gray-600">
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="p-4">
//                   <StatusBadge status={"Actif"} />
//                 </td>
//                 <td className="py-5 flex justify-between">
//                   <button
//                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                     title="Voir"
//                   >
//                     <Eye className={`w-4 h-4 text-blue-600 cursor-pointer`} />
//                   </button>
//                   <button
//                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                     title="Promouvoir / Rétrograder"
//                   >
//                     <ArrowUpDown
//                       className={`w-4 h-4 text-orange-600 cursor-pointer`}
//                     />
//                   </button>
//                   <button
//                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                     title="Supprimer"
//                   >
//                     <Trash2 className={`w-4 h-4 text-red-600 cursor-pointer`} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Version Cards - Visible sur mobile */}
//       <div className="lg:hidden grid gap-4">
//         {currentUsers.map((item) => (
//           <div
//             key={item._id}
//             className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-gray-800">{item.name}</h3>
//                 <p className="text-sm text-gray-600 mt-1">{item.email}</p>
//               </div>
//               <StatusBadge status={"Actif"} />
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//               <div>
//                 <p className="text-gray-500">Recettes</p>
//                 <p className="font-medium">10</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Inscription</p>
//                 <p className="font-medium">
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             <div className="w-1/6 mt-4 float-end flex justify-between">
//               <button
//                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 title="Voir"
//               >
//                 <Eye className={`w-4 h-4 text-blue-600 cursor-pointer`} />
//               </button>
//               <button
//                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 title="Promouvoir / Rétrograder"
//               >
//                 <ArrowUpDown
//                   className={`w-4 h-4 text-orange-600 cursor-pointer`}
//                 />
//               </button>
//               <button
//                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 title="Supprimer"
//               >
//                 <Trash2 className={`w-4 h-4 text-red-600 cursor-pointer`} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm gap-4">
//         <p className="text-gray-600">
//           Affichage {startIndex + 1}-{Math.min(endIndex, userAll.length)} sur{" "}
//           {userAll.length} utilisateurs
//         </p>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`w-10 h-10 flex items-center justify-center rounded-md ${
//                 currentPage === page
//                   ? "bg-blue-600 text-white"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// Utilisateurs.isDashboard = true;

// export default Utilisateurs;
