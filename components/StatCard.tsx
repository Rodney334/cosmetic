export default function StatCard({
  title,
  value,
  description,
  badge,
}: {
  title: string;
  value: string;
  description: string;
  badge: string;
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
