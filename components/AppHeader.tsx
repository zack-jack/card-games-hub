import Link from 'next/link';

const AppHeader = () => (
  <nav className="w-full px-10 py-5 shadow z-10">
    <ul className="flex text-center">
      <li>
        <Link href="/">
          <a>Card Games Hub</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default AppHeader;
