import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';


class MyDocument extends Document {
  render() {
    return (
      // html 태그에 언어 설정
      <Html lang="ko">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;