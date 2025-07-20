// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import Layout from '@/layouts/Layout';
import '@/styles/globals.css';

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactElement) => ReactElement;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: CustomAppProps) {
  // Utilisez le layout personnalisé du composant si défini, sinon utilisez le Layout par défaut
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}

// return (
//   <SessionProvider session={session}>
//     {getLayout(<Component {...pageProps} />)}
//   </SessionProvider>
// );

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
