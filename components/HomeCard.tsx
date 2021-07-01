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
        <span className="home-card__title block capitalize">{title}</span>
      ) : (
        <Link href={href}>
          <a className="home-card__title">{title}</a>
        </Link>
      )
    }
  </div>
);

export default HomeCard;
