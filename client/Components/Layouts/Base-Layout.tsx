import React, { Fragment, PropsWithChildren } from 'react';
import { CustomPropsWithChildren } from '../../TS/interfaces';
import Navbar from '../Fragments/Navbar';

const BaseLayout: React.FC<CustomPropsWithChildren> = (props) => {
  return (
    <div className='p-4 flex flex-col justify-between items-center min-h-screen h-fit bg-gray-100'>
      <Navbar currentUser={props.currentUser} />
      {props.children}
      <div>Footer</div>
    </div>
  );
};

export default BaseLayout;
