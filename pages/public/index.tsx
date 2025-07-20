// /pages/public/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">Espace Public</h1>
      <Link href="/private/dashboard" className="mt-4 inline-block text-blue-600">
        Accès privé
      </Link>
    </div>
  );
}