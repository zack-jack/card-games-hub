import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

type LayoutProps = {
  children: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const routeName = router.pathname === '/' ? 'home' : router.pathname.split('/')[1];

  const toTitleCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  return (
    <>
      <Head>
        <title>
          { routeName ? `${toTitleCase(routeName)} | Card Games Hub` : 'Card Games Hub'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-grow w-full bg-gray-100">
        {children}
      </main>
    </>
  );
};

export default Layout;
