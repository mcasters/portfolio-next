import Head from 'next/head';
import { useRouter } from 'next/router';

import { AlertProvider, useAlert } from '../components/alert/Alert';
import './styles/styles.css';
import './styles/style-lightbox.css';

import { ROUTES } from '../constants/routes';
import { DESCRIPTION, KEYWORDS } from '../constants/metaHtml';
import TITLE from '../constants/pageTitle';
import ItemConstant from '../constants/itemConstant';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const alert = useAlert();

  const getTitle = () => {
    let title = '';
    switch (router.pathname) {
      case ROUTES.HOME:
        title = TITLE.HOME;
        break;
      case ROUTES.CONTACT:
        title = TITLE.CONTACT;
        break;
      case ROUTES.DRAWING:
        title = ItemConstant.DRAWING.TITLE;
        break;
      case ROUTES.PAINTING:
        title = ItemConstant.PAINTING.TITLE;
        break;
      case ROUTES.SCULPTURE:
        title = ItemConstant.SCULPTURE.TITLE;
        break;
      case ROUTES.PRESENTATION:
        title = TITLE.PRESENTATION;
        break;
      case ROUTES.PRIVACY:
        title = TITLE.PRIVACY;
        break;
      case ROUTES.ADMIN:
        title = TITLE.ADMINISTRATION;
        break;
    }
    return `${title} - Marion Casters`;
  };

  const getDescription = () => {
    switch (router.pathname) {
      case ROUTES.HOME:
        return DESCRIPTION.HOME;
      case ROUTES.ADMIN:
        return DESCRIPTION.ADMIN;
      case ROUTES.PRIVACY:
        return DESCRIPTION.PRIVACY;
      case ROUTES.CONTACT:
        return DESCRIPTION.CONTACT;
      case ROUTES.DRAWING:
        return DESCRIPTION.DRAWING;
      case ROUTES.PAINTING:
        return DESCRIPTION.PAINTING;
      case ROUTES.PRESENTATION:
        return DESCRIPTION.PRESENTATION;
      case ROUTES.SCULPTURE:
        return DESCRIPTION.SCULPTURE;
    }
  };

  return (
    <>
      <AlertProvider>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{getTitle()}</title>
          <meta name="description" content={getDescription()} />
          <meta name="keywords" content={KEYWORDS} />
          <meta name="theme-color" content="#555555" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="author" href="/humans.txt" type="text/plain" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" sizes="512x512" href="/icon-512.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  );
}
