import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetIdCounter } from 'react-tabs';

class MyDocument extends Document {
  static async getServerSideProps(ctx) {
    resetIdCounter();
    const initialProps = await Document.getServerSideProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
