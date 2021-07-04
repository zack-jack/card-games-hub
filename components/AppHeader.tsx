import Link from 'next/link';
import { useRouter } from 'next/router';

const AppHeader = () => {
  const router = useRouter();
  const routeName = router.asPath.replace('/', '');

  return (
    <nav className="w-full px-10 py-5 shadow z-10">
      <ul className="flex max-w-screen-xl mx-auto text-center">
        <li>
          <Link href="/">
            <a className="font-bold">Card Games Hub</a>
          </Link>
        </li>
        <li className="ml-6">
          <p className="capitalize">{routeName}</p>
        </li>
      </ul>
    </nav>
  );
};

export default AppHeader;
