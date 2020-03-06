import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    console.log('props ///////// : ' + this.props);
    return (
      <Html lang="fr">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Marion Casters</title>
          <meta name="description" content="description" />
          <meta name="keywords" content="keywords" />
          <meta name="theme-color" content="#555555" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" sizes="512x512" href="/icon-512.png" />
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
