export default function SystemSection() {
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