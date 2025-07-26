// /pages/private/dashboard.tsx
// import { getSession, signOut, useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { Search, ChevronDown, Trash2 } from "lucide-react";

// Type pour un ingrédient
type Ingredient = {
  id: number;
  type: 'header' | 'item';
  name: string;
  phase: string;
  family?: string;
  ml?: string;
  drops?: string;
  cost?: string;
};

// Données fictives pour les ingrédients, incluant des en-têtes
const ingredients: Ingredient[] = [
  { id: 1, type: 'header', name: 'Phase A - Phase Aqueuse', phase: '' },
  { id: 2, type: 'item', name: 'Hydrolat de Rose', phase: 'A', family: 'Hydrolats', ml: '50', drops: '-', cost: '€5.50' },
  { id: 3, type: 'item', name: 'Glycérine Végétale', phase: 'A', family: 'Actifs', ml: '5', drops: '-', cost: '€2.30' },
  { id: 4, type: 'header', name: 'Phase H - Phase Huileuse', phase: '' },
  { id: 5, type: 'item', name: 'Huile de Jojoba', phase: 'H', family: 'Huiles', ml: '20', drops: '-', cost: '€7.80' },
  { id: 6, type: 'item', name: 'Cire d\'abeille', phase: 'H', family: 'Cires', ml: '3', drops: '-', cost: '€1.50' },
  { id: 7, type: 'header', name: 'Phase E - Emulsifiants', phase: '' },
  { id: 8, type: 'item', name: 'Olivem 1000', phase: 'E', family: 'Emulsifiants', ml: '8', drops: '-', cost: '€4.00' },
  { id: 9, type: 'header', name: 'Phase D - Additifs', phase: '' },
  { id: 10, type: 'item', name: 'Vitamine E', phase: 'D', family: 'Vitamines', ml: '-', drops: '10', cost: '€3.20' },
  { id: 11, type: 'item', name: 'Cosgard', phase: 'D', family: 'Conservateurs', ml: '-', drops: '20', cost: '€2.90' },
];

const Ingredients: NextPageWithLayout = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Gestion des Ingrédients</h1>

      {/* Filtres */}
      <div className="flex justify-between items-center my-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Rechercher ingrédient..." className="pl-10 pr-4 py-2 border rounded-md" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            Tous les familles <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            Toutes les phases <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Imprimer</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Exporter CSV</button>
        </div>
      </div>

      {/* Onglets de Phase et Bouton Ajouter */}
      <div className="flex items-center gap-2 mb-6 border-b">
        <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-semibold">Tous</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">Phase A</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">Phase H</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">Phase E</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">Phase D</button>
        <button className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold">Ajouter</button>
      </div>

      {/* Tableau des ingrédients */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4 font-medium text-gray-500">Ingrédients</th>
              <th className="p-4 font-medium text-gray-500">Phase</th>
              <th className="p-4 font-medium text-gray-500">Famille</th>
              <th className="p-4 font-medium text-gray-500">ml</th>
              <th className="p-4 font-medium text-gray-500">Gouttes</th>
              <th className="p-4 font-medium text-gray-500">Coûts</th>
              <th className="p-4 font-medium text-red-500 text-right">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item) => (
              item.type === 'header' ? (
                <tr key={item.id} className="bg-blue-50">
                  <td colSpan={7} className="p-2 font-semibold text-blue-800">{item.name}</td>
                </tr>
              ) : (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">-</td>
                  <td className="p-4 text-gray-600">{item.phase}</td>
                  <td className="p-4 text-gray-600">{item.family}</td>
                  <td className="p-4 text-gray-600">{item.ml}</td>
                  <td className="p-4 text-gray-600">{item.drops}</td>
                  <td className="p-4 text-gray-600">{item.cost}</td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <p className="text-gray-600">Affichage 1-5 sur 1,456 ingrédients</p>
        <div className="flex items-center gap-2">
          {/* Pagination controls can be added here */}
        </div>
      </div>
    </div>
  );
}

Ingredients.isDashboard = true;

export default Ingredients;
// export const getServerSideProps = async (ctx: any) => {
//   const session = await getSession(ctx);
//   if (!session) return { redirect: { destination: '/public/login' } };
//   return { props: {} };
// };
