import { ReactElement } from 'react';
import Link from 'next/link';

interface HomeCardProps {
  title: string,
  href: string,
  className?: string,
}

const HomeCard = ({ title, href, className = '' }: HomeCardProps): ReactElement => (
  <div className={`home-card ${className}`}>
    <Link href={href}>
      <a className="block px-6 py-4 capitalize">{title}</a>
    </Link>
  </div>
);

export default HomeCard;
