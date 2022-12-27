import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import DoRequest from '../../hooks/do-request';
import Formerrors from './Form-Errors';
import Input from './Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = DoRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const getEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const getPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest();
  };
  return (
    <div className='w-full h-full flex mt-14 items-start justify-center z-10'>
      <form
        onSubmit={formSubmitHandler}
        className='h-fit w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
      >
        <div className='py-4 h-20 flex justify-between'>
          Sign in: <Formerrors errors={errors} />
        </div>
        <div className='flex flex-col gap-8'>
          <Input
            name={'Email Address:'}
            label={'emailaddress'}
            type={'email'}
            placeholder={'Email address'}
            getInputs={getEmail}
            value={email}
          />
          <Input
            name={'Password:'}
            label={'password'}
            type={'password'}
            placeholder={'Password'}
            getInputs={getPassword}
            value={password}
          />
          <button className='signInButton'>Sign In</button>
        </div>
        <div className='flex font-light text-xs py-3 gap-2'>
          Don't have an account?
          <Link
            className='font-bold text-xs text-blue-300'
            href={'/auth/signup'}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
