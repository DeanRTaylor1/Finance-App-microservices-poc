import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { CircleLoader } from 'react-spinners';
import DoRequest from '../../../hooks/do-request';

const Confirm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { userid } = router.query;
  const { doRequest, errors } = DoRequest({
    url: '/api/users/confirmation',
    method: 'put',
    body: { userid },
    onSuccess: () => {
      setIsLoading(false);
      setTimeout(() => {
        Router.push('/');
      }, 3000);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Fragment>
      {!isLoading && (
        <div className='h-full w-full flex justify-center items-center font-extrabold text3xl'>
          Email Confirmed! If not redirected click here to go {' '}
          <Link
            className='underline underline-offset-4 font-extrabold text3xl'
            href='/'
          >
            Home
          </Link>
          .
        </div>
      )}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <CircleLoader size={100} color='#60a5fa' />
        </div>
      )}
    </Fragment>
  );
};

export default Confirm;
