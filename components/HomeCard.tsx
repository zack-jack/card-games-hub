import { ReactElement } from 'react';
import Link from 'next/link';

interface HomeCardProps {
  title: string,
  href: string,
  disabled?: boolean,
  className?: string,
}

const HomeCard = ({
  title, href, disabled = false, className = '',
}: HomeCardProps): ReactElement => (
  <div className={`home-card ${disabled ? 'disabled' : ''} ${className}`}>
    {
      disabled ? (
        <span className="block px-6 py-4 capitalize">{title}</span>
      ) : (
        <Link href={href}>
          <a className="home-card__link">{title}</a>
        </Link>
      )
    }
  </div>
);

export default HomeCard;
