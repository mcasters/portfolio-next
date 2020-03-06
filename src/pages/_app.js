import './styles.css';
import React from 'react';

import { AlertProvider } from '../components/AlertContext/AlertContext';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
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
