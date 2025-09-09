import type { AppProps } from "next/app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/layouts/Layout";
import DashboardLayout from "@/layouts/DashboardLayout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { authStore } from "@/stores/auth.store";
import apiClient from "@/lib/axios";
import { UserType } from "@/types/user.type";
import { AuthSpinner } from "@/components/AuthSpinner";
type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactElement) => ReactElement;
    isDashboard?: boolean; // Nouvelle prop
  };
};

// Composant Spinner
// const AuthSpinner = () => (
//   <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
//     <div className="flex flex-col items-center space-y-4">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       <p className="text-gray-600 dark:text-gray-300 text-sm">
//         Vérification de l'authentification...
//       </p>
//     </div>
//   </div>
// );

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const { token, setToken, setRefreshToken, setUser } = authStore();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    setIsInitialized(true);
    const localToken = localStorage.getItem("token");
    const localRefreshToken = localStorage.getItem("refreshToken");
    const localUser = localStorage.getItem("user");

    if (localToken) {
      setToken(localToken);
    } else {
      setIsInitialized(false);
    }
    if (localRefreshToken) setRefreshToken(localRefreshToken);
    if (localUser) setUser(JSON.parse(localUser));
  }, []);

  useEffect(() => {
    const checkTokenIsValid = async () => {
      try {
        await apiClient.get("/auth/verify-token");
        console.log("is verify");
      } catch (error: any) {
        console.log({ error });
        setToken("");
        setRefreshToken("");
        setUser({} as UserType);
        console.log("is not verify");
      } finally {
        setIsInitialized(false);
      }
    };
    if (token) {
      checkTokenIsValid();
    }
  }, [token]);

  // Détermine automatiquement le layout en fonction du chemin
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return Component.isDashboard ? (
        <DashboardLayout>{page}</DashboardLayout>
      ) : (
        <Layout>{page}</Layout>
      );
    });

  if (isInitialized) {
    return <AuthSpinner />;
  }
  // return getLayout(<Component {...pageProps} />);
  return (
    // <SessionProvider session={session}>
    <>
      {getLayout(<Component {...pageProps} />)}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 10000,
          },
        }}
      />
    </>
    // </SessionProvider>
  );
}
