import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Blackjack() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blackjack | Card Games Hub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Blackjack!
        </h1>
      </main>
    </div>
  );
}
