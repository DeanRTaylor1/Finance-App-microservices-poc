import { Fragment } from 'react';
import { FormerrorsProps } from '../../TS/interfaces';
import Logo from '../Fragments/Logo';

const Formerrors: React.FC<FormerrorsProps> = ({ errors }) => {
  return (
    <Fragment>
      <span className='flex flex-col gap-1'>
        {!errors && <Logo color={'text-blue-400'} />}
        {errors && (
          <ul className='border p-2 rounded-md border-red-400 text-red-400 font-bold text-sm'>
            {' '}
            Ooops...{' '}
            {errors.map((error: string) => {
              return (
                <li className='text-red-400 text-sm font-light'>{error}</li>
              );
            })}
          </ul>
        )}
      </span>
    </Fragment>
  );
};

export default Formerrors;
