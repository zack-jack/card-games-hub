import { ReactElement } from 'react';
import Link from 'next/link';

interface HomeTileProps {
  title: string,
  href: string,
  disabled?: boolean,
  className?: string,
}

const HomeTile = ({
  title, href, disabled = false, className = '',
}: HomeTileProps): ReactElement => (
  <div className={`home-tile ${disabled ? 'disabled' : ''} ${className}`}>
    {
      disabled ? (
        <span className="home-tile__title block capitalize">{title}</span>
      ) : (
        <Link href={href}>
          <a className="home-tile__title">{title}</a>
        </Link>
      )
    }
  </div>
);

export default HomeTile;
