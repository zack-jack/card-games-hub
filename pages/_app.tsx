import type { AppProps } from 'next/app';
import AppHeader from '../components/AppHeader';
import Layout from '../components/Layout';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <div className="flex flex-col items-center min-h-screen">
    <AppHeader />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </div>
);

export default App;
