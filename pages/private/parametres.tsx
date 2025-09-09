import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";

const Parametres: NextPageWithLayout = () => {
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Paramètres</h1>
      <p className="mt-2">Bienvenue</p>
    </div>
  );
};

Parametres.isDashboard = true;

export default Parametres;
// export const getServerSideProps = async (ctx: any) => {

// };
