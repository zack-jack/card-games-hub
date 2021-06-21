import Link from 'next/link';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/blackjack">
              <a>Blackjack</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
