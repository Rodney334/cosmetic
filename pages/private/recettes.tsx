// /pages/private/dashboard.tsx
// import { getSession, signOut, useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';

const Recettes: NextPageWithLayout = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Recettes</h1>
      <p className="mt-2">Bienvenue</p>
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
