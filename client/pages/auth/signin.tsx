import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import LoginForm from '../../Components/Form/LoginForm';
import Stripes from '../../Components/Fragments/Stripes';
import { CircleLoader } from 'react-spinners';
import { PropsWithAuth } from '../../TS/interfaces';

const Signin: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    if (currentUser) {
      Router.push('/');
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, []);

  return (
    <Fragment>
      {!isLoading && <LoginForm />}
      {!isLoading && <Stripes />}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <CircleLoader size={100} color='#60a5fa' />
        </div>
      )}
    </Fragment>
  );
};

export default Signin;
