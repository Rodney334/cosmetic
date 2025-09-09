import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";

const Maintenance: NextPageWithLayout = () => {
  const router = useRouter();

  // if (status === 'loading') return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Maintenance</h1>
      <p className="mt-2">Bienvenue</p>
    </div>
  );
};

Maintenance.isDashboard = true;

export default Maintenance;
// export const getServerSideProps = async (ctx: any) => {

// };
