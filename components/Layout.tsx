import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode,
}

const Layout = ({ children }: LayoutProps): ReactElement => {
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
      {children}
    </>
  );
};

export default Layout;
