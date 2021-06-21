import React from 'react';
import Link from 'next/link';

type HomeCardProps = {
  title: string,
  href: string,
  className?: string,
}

const HomeCard: React.FC<HomeCardProps> = ({ title, href, className }) => (
  <div className={`home-card ${className || ''}`}>
    <Link href={href}>
      <a className="block px-6 py-4 capitalize">{title}</a>
    </Link>
  </div>
);

export default HomeCard;
