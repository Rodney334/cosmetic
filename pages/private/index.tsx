import type { NextPageWithLayout } from '@/types';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="space-y-6">
      {/* Section Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Receives Orders"
          value="15,234"
          description="+$7x on media"
          badge="vt multi-prededent"
        />
        <StatCard
          title="Reports Mentacle"
          value="4,892"
          description="+24% on media"
          badge="PDF + Excel"
        />
      </div>

      {/* Section Systèmes */}
      <SystemSection />
    </div>
  );
};

DashboardPage.isDashboard = true;

export default DashboardPage;

// Composants supplémentaires
function StatCard({ title, value, description, badge }: {
  title: string;
  value: string;
  description: string;
  badge: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold my-2">{value}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{description}</span>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {badge}
        </span>
      </div>
    </div>
  );
}

function SystemSection() {
  const systems = [
    {
      name: "Service Principal",
      details: "CPU: 256 | 1.04L: 495 | Google: 50%"
    },
    {
      name: "Base db Dombers",
      details: "Connectors: 36(10) | Requires: 158"
    },
    {
      name: "API REST",
      details: "Home-diprocess: 12x | Change: 70%"
    },
    {
      name: "Scanagarde",
      details: "Dombers: 220(a)(2000: 0.08) | Table: 23.00"
    },
    {
      name: "Storage",
      details: "Utility: 92% (Job: 69 | KPO: 60)"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">End to Systems</h2>
      <div className="space-y-3">
        {systems.map((system, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">{system.name}</span>
            <span className="text-sm text-gray-500">{system.details}</span>
          </div>
        ))}
      </div>
    </div>
  );
}