// /pages/private/dashboard.tsx
import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import {
  Users,
  BookOpenText,
  Milk,
  ArrowUp,
  BarChart2,
  LineChart,
} from "lucide-react";
import { ReactNode } from "react";

// --- Données Fictives ---
const statsData = [
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Utilisateurs Actifs",
    value: "2,847",
    change: "+15% ce mois",
    changeColor: "text-green-500",
  },
  {
    icon: <BookOpenText className="h-8 w-8 text-green-500" />,
    title: "Recettes Créées",
    value: "15,234",
    change: "+8% ce mois",
    changeColor: "text-green-500",
  },
  {
    icon: <Milk className="h-8 w-8 text-yellow-500" />,
    title: "Ingrédients",
    value: "1,456",
    change: "+3% cette semaine",
    changeColor: "text-green-500",
  },
  {
    icon: <ArrowUp className="h-8 w-8 text-indigo-500" />,
    title: "Exports Mensuels",
    value: "4,892",
    change: "+24% ce mois",
    changeColor: "text-green-500",
  },
];

// --- Composants Locaux ---

// Carte de Statistique
const StatCard = ({
  icon,
  title,
  value,
  change,
  changeColor,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  changeColor: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
    <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800 my-1">{value}</p>
      <p className={`text-sm ${changeColor}`}>{change}</p>
    </div>
  </div>
);

// Carte de Graphique (avec un placeholder)
const ChartCard = ({
  title,
  date,
  children,
}: {
  title: string;
  date?: string;
  children: ReactNode;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {date && <p className="text-sm text-gray-400">{date}</p>}
      </div>
      <div className="flex text-sm border border-gray-200 rounded-md">
        <button className="px-3 py-1 bg-gray-100 rounded-l-md text-gray-400">
          Jour
        </button>
        <button className="px-3 py-1 border-x text-gray-400">Semaine</button>
        <button className="px-3 py-1 text-gray-400">Mois</button>
      </div>
    </div>
    <div className="h-64 bg-gray-50 flex items-center justify-center rounded-md">
      {children}
    </div>
  </div>
);

const Analytiques: NextPageWithLayout = () => {
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="space-y-6">
      {/* Grille des statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeColor={stat.changeColor}
          />
        ))}
      </div>

      {/* Grille des graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Statistiques Utilisateurs">
          <div className="text-center text-gray-500">
            <BarChart2 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            Placeholder pour le graphique à barres
          </div>
        </ChartCard>
        <ChartCard title="Statistiques Visites Du Site" date="20 Mai 2025">
          <div className="text-center text-gray-500">
            <LineChart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            Placeholder pour le graphique en ligne
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

Analytiques.isDashboard = true;

export default Analytiques;
// export const getServerSideProps = async (ctx: any) => {

// };
