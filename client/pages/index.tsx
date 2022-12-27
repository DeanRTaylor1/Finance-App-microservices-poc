import { Fragment } from 'react';

export default function Home({ currentUser }: any) {
  return (
    <Fragment>
      <h1 className='font-extrabold text-lg '>Home </h1>
    </Fragment>
  );
}

Home.getInitialProps = async (context: any, client: any, currentUser: any) => {
  return currentUser;
};
