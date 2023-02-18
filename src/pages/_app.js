import Head from 'next/head';
import { useRouter } from 'next/router';

import { AlertProvider } from '../components/alert/Alert';
import './styles/styles.css';
import './styles/style-lightbox.css';
import { ROUTES } from '../constants/routes';
import { DESCRIPTION, KEYWORDS, DOCUMENT_TITLE } from '../constants/metaHtml';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getInfos = () => {
    const { year } = router.query;
    let title = '';
    let description = '';

    switch (router.asPath) {
      case ROUTES.HOME: {
        description = DESCRIPTION.HOME;
        title = DOCUMENT_TITLE.HOME;
        break;
      }
      case ROUTES.ADMIN: {
        description = DESCRIPTION.ADMIN;
        title = DOCUMENT_TITLE.ADMIN;
        break;
      }
      case ROUTES.PRIVACY:
        return DESCRIPTION.PRIVACY;
      case ROUTES.CONTACT: {
        description = DESCRIPTION.CONTACT;
        title = DOCUMENT_TITLE.CONTACT;
        break;
      }
      case ROUTES.DRAWING: {
        description = DESCRIPTION.DRAWING;
        title = DOCUMENT_TITLE.DRAWING;
        break;
      }
      case ROUTES.PAINTING: {
        description = DESCRIPTION.PAINTING._;
        title = DOCUMENT_TITLE.PAINTING._;
        break;
      }
      case `${ROUTES.PAINTING}/${year}`: {
        description = DESCRIPTION.PAINTING[year];
        title = DOCUMENT_TITLE.PAINTING[year];
        break;
      }
      case ROUTES.PRESENTATION: {
        description = DESCRIPTION.PRESENTATION;
        title = DOCUMENT_TITLE.PRESENTATION;
        break;
      }
      case ROUTES.SCULPTURE: {
        description = DESCRIPTION.SCULPTURE;
        title = DOCUMENT_TITLE.SCULPTURE;
        break;
      }
    }
    return { title, description };
  };

  return (
    <>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{getInfos().title}</title>
        <meta name="description" content={getInfos().description} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="theme-color" content="#555555" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="author" href="/humans.txt" type="text/plain" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" sizes="512x512" href="/icon-512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  );
}
