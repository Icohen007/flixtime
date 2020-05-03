import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import GlobalStyle from '../components/Global.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const theme = {
  colors: {
    primary: '#e7f3e2',
  },
};


export default class MyApp extends App {
  state = { isLoading: false };

  componentDidMount() {
    Router.events.on('routeChangeStart', () => {
      this.setState({ isLoading: true });
    });

    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
    });

    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { isLoading } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {isLoading && <Spinner />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}
