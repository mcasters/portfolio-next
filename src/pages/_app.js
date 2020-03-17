import './styles.css';
import './lightbox-style.css';
import React from 'react';

import { AlertProvider } from '../components/AlertContext/AlertContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ROUTER_CONSTANT from '../constants/router';
import { DESCRIPTION, KEYWORDS } from '../constants/metaHtml';
import TITLE from '../constants/pageTitle';
import ITEM from '../constants/item';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getTitle = () => {
    let title = '';
    switch (router.pathname) {
      case ROUTER_CONSTANT.HOME:
        title = TITLE.HOME;
        break;
      case ROUTER_CONSTANT.CONFIDENTIALITE:
        title = TITLE.PRIVACY;
        break;
      case ROUTER_CONSTANT.CONTACT:
        title = TITLE.CONTACT;
        break;
      case ROUTER_CONSTANT.DESSINS:
        title = ITEM.DRAWING.TITLE;
        break;
      case ROUTER_CONSTANT.PEINTURES:
        title = ITEM.PAINTING.TITLE;
        break;
      case ROUTER_CONSTANT.PRESENTATION:
        title = TITLE.PRESENTATION;
        break;
      case ROUTER_CONSTANT.SCULPTURES:
        title = ITEM.SCULPTURE.TITLE;
        break;
      case ROUTER_CONSTANT.ADMIN:
        title = TITLE.ADMINISTRATION;
        break;
    }
    return `${title} - Marion Casters`;
  };

  const getDescription = () => {
    switch (router.pathname) {
      case ROUTER_CONSTANT.HOME:
        return DESCRIPTION.HOME;
      case ROUTER_CONSTANT.ADMIN:
        return DESCRIPTION.ADMIN;
      case ROUTER_CONSTANT.CONFIDENTIALITE:
        return DESCRIPTION.PRIVACY;
      case ROUTER_CONSTANT.CONTACT:
        return DESCRIPTION.CONTACT;
      case ROUTER_CONSTANT.DESSINS:
        return DESCRIPTION.DRAWING;
      case ROUTER_CONSTANT.PEINTURES:
        return DESCRIPTION.PAINTING;
      case ROUTER_CONSTANT.PRESENTATION:
        return DESCRIPTION.PRESENTATION;
      case ROUTER_CONSTANT.SCULPTURES:
        return DESCRIPTION.SCULPTURE;
    }
  };

  return (
    <>
      <ErrorBoundary>
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
          </Head>
          <Component {...pageProps} />
        </AlertProvider>
      </ErrorBoundary>
      <style jsx global>{`
        .react-tabs {
          -webkit-tap-highlight-color: transparent;
        }

        .react-tabs__tab-list {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          background-color: #eee;
          border-bottom: 1px solid #aaa;
          margin: 0 0 30px;
          padding: 0;
        }

        .react-tabs__tab {
          display: inline-block;
          font-size: 14px;
          border: 1px solid transparent;
          border-bottom: none;
          bottom: -1px;
          position: relative;
          list-style: none;
          padding: 6px 12px;
          cursor: pointer;
        }

        .react-tabs__tab--selected {
          background: #fff;
          border-color: #aaa;
          color: black;
          border-radius: 5px 5px 0 0;
        }

        .react-tabs__tab--disabled {
          color: GrayText;
          cursor: default;
        }

        .react-tabs__tab:focus {
          box-shadow: 0 0 5px hsl(208, 99%, 50%);
          border-color: hsl(208, 99%, 50%);
          outline: none;
        }

        .react-tabs__tab:focus::after {
          content: '';
          position: absolute;
          height: 5px;
          left: -4px;
          right: -4px;
          bottom: -5px;
          background: #fff;
        }

        .react-tabs__tab-panel {
          display: none;
        }

        .react-tabs__tab-panel--selected {
          display: block;
        }
      `}</style>
    </>
  );
}
