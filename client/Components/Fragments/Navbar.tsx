import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import Mobilenav from './Mobile-Nav';
import uniqid from 'uniqid';
import { useState } from 'react';
import { CustomPropsWithChildren } from '../../TS/interfaces';

const Navbar: React.FC<CustomPropsWithChildren> = ({ currentUser }) => {
  const [scale, setScale] = useState('scale-0');
  const authItems = [
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: 'auth/signout' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <button
            onClick={(e) => mobileNavHandler(e, 'button')}
            className='navButton'
            key={href}
          >
            {label}
          </button>
        </Link>
      );
    });

  const navItems = [
    { label: 'Finances', href: '/finances' },
    { label: 'Stocks', href: '/stocks' },
    { label: 'News', href: '/news' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <li className='navItem' key={href}>
            {label}
          </li>
        </Link>
      );
    });

  const mobileNavHandler = (event: any, source?: string) => {
    if (source === 'button' && scale === 'scale-100') {
      return setScale('scale-0');
    }
    scale === 'scale-0' ? setScale('scale-100') : setScale('scale-0');
  };

  return (
    <div className='navbar'>
      <Logo />
      <ul className='hidden md:flex gap-8 '>{navItems}</ul>
      <ul className='hidden md:flex  gap-2'>{authItems}</ul>
      <Bars3Icon className='h-8 w-6 md:hidden' onClick={mobileNavHandler} />
      <Mobilenav
        authItems={authItems}
        navItems={navItems}
        scale={scale}
        mobileNavHandler={mobileNavHandler}
      />
    </div>
  );
};

export default Navbar;
