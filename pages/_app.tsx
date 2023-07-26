import type { AppProps } from "next/app";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';


const App = ({ Component, pageProps }: AppProps) => {
  return <>
  <Component {...pageProps} />;
  </>
};

export default App;