import HomeTile from '../components/HomeTile';

const Home = () => (
  <main className="flex-grow w-full bg-gray-100">
    <ul className="flex flex-wrap items-stretch justify-around max-w-screen-xl mx-auto p-10">
      <li className="flex flex-col w-5/12">
        <HomeTile
          title="blackjack"
          href="/blackjack"
        />
      </li>
      <li className="flex flex-col w-5/12">
        <HomeTile
          title="coming soon..."
          href="/"
          disabled
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeTile
          title="coming soon..."
          href="/"
          disabled
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeTile
          title="coming soon..."
          href="/"
          disabled
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeTile
          title="coming soon..."
          href="/"
          disabled
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeTile
          title="coming soon..."
          href="/"
          disabled
        />
      </li>
    </ul>
  </main>
);

export default Home;
