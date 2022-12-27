import { XMarkIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import { MobileNavProps } from '../../TS/interfaces';
import { useEffect, useState } from 'react';

const Mobilenav: React.FC<MobileNavProps> = ({
  authItems,
  navItems,
  scale,
  mobileNavHandler,
}) => {
  const [mobileStyle, setMobileStyle] = useState(`mobileNav ${scale}`);

  useEffect(() => {
    setMobileStyle(`mobileNav ${scale}`);
  }, [scale]);

  return (
    <div className={mobileStyle}>
      <div className='flex justify-between items-center h-18'>
        <Logo color={'text-blue-400'} />
        <XMarkIcon className='h-6 w-6' onClick={mobileNavHandler} />
      </div>
      <div className='flex flex-col h-h90 justify-between'>
        <ul className='md:hidden flex flex-col gap-2 py-4'>{navItems}</ul>
        <ul className='md:hidden flex justify-center border-t p-4 items-center'>
          {authItems}
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
