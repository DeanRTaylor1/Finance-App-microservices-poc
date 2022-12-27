import Link from 'next/link';
import { LogoProps } from '../../TS/interfaces';

const Logo: React.FC<LogoProps> = ({ color }) => {
  const logoStyle = `logo ${color}`;

  return (
    <div className={logoStyle}>
      <Link href='/'>MyFin</Link>
    </div>
  );
};

export default Logo;
