import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import BaseLayout from '../Components/Layouts/Base-Layout';
import BuildClient from './api/build-client';

interface CustomProps extends AppProps {
  currentUser?: any;
}

export default function App({
  Component,
  pageProps,
  currentUser,
}: CustomProps) {
  return (
    <BaseLayout currentUser={currentUser}>
      <Head>
        <title>My Finance</title>
      </Head>
      <Component {...pageProps} currentUser={currentUser} />
    </BaseLayout>
  );
}

App.getInitialProps = async (appContext: any) => {
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};
