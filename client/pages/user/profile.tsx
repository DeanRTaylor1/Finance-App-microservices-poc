import { Fragment, useEffect, useState } from 'react'
import { currentUserProps } from '../../TS/interfaces';
import DoRequest from '../../hooks/do-request'
import { CircleLoader } from 'react-spinners';

export default function Profile({ email, username }: currentUserProps) {
  //redirect if no current user and populate user data from api
  useEffect(() => {
       
  }, [third])
  return (
    <div className='w-full h-full flex mt-14 items-start justify-center z-10'>

      <div className='h-fit w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <div className='py-4 h-20 flex justify-between'>
          {username}
        </div>
        <div className='flex flex-col gap-8'>
          currency
        </div>
        <div className='flex flex-col gap-8'>
         phone 
        </div>
        <div className='flex flex-col gap-8'>
          monthly_salary
        </div>
      </div>
    </div>
  )
}

Profile.getInitialProps = async (context: any, client: any, currentUser: any) => {
  return currentUser;
};
