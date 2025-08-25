import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "@/layouts/Layout";
import DashboardLayout from "@/layouts/DashboardLayout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactElement) => ReactElement;
    isDashboard?: boolean; // Nouvelle prop
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
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

  // return getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 10000,
          },
        }}
      />
    </SessionProvider>
  );
}

// // /pages/_app.tsx
// import { SessionProvider } from 'next-auth/react';
// import type { AppProps } from 'next/app';
// import '@/styles/globals.css';

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
