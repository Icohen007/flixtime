import Head from 'next/head';
import HeadContent from './HeadContent';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>FlixTime</title>
      </Head>
      <Header />
      {children}
    </>
  );
}

export default Layout;
