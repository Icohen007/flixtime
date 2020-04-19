import Head from 'next/head';
import HeadContent from './HeadContent';
import ResponsiveNavBar from './ResponsiveNavBar/ResponsiveNavBar';

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>FlixTime</title>
      </Head>
      <ResponsiveNavBar />
      {children}
    </>
  );
}

export default Layout;
