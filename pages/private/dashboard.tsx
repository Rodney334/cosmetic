// /pages/private/dashboard.tsx
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <button onClick={() => signOut()}>Déconnexion</button>
      <p className="mt-2">Bienvenue {session?.user?.email}</p>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  if (!session) return { redirect: { destination: '/public/login' } };
  return { props: {} };
};