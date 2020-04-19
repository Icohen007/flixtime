import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import GlobalStyle from '../components/Global.style';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}
