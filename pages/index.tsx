import HomeCard from '../components/HomeCard';

const Home = () => (
  <main className="flex-grow w-full bg-gray-100">
    <ul className="flex flex-wrap items-center justify-around p-10">
      <li className="flex flex-col w-5/12">
        <HomeCard
          title="blackjack"
          href="/blackjack"
        />
      </li>
      <li className="flex flex-col w-5/12">
        <HomeCard
          title="coming soon..."
          href="/"
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeCard
          title="coming soon..."
          href="/"
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeCard
          title="coming soon..."
          href="/"
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeCard
          title="coming soon..."
          href="/"
        />
      </li>
      <li className="flex flex-col w-5/12 mt-6">
        <HomeCard
          title="coming soon..."
          href="/"
        />
      </li>
    </ul>
  </main>
);

export default Home;
