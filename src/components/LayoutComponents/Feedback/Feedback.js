import React from 'react';
import Link from 'next/link';

import s from './Feedback.module.css';

function Feedback() {
  return (
    <div className={s.container}>
      <Link href="https://nodejs.org">
        <a target="_blank" rel="noreferrer">
          <img
            src="/assets/nodeJSTransparent.png"
            className={s.nodejsLogo}
            alt="NodeJS"
          />
        </a>
      </Link>
      <Link href="https://reactjs.org">
        <a target="_blank" rel="noreferrer">
          <img
            src="/assets/reactTransparent.png"
            className={s.reactLogo}
            alt="React"
          />
        </a>
      </Link>
      <Link href="https://graphql.org">
        <a target="_blank" rel="noreferrer">
          <img
            src="/assets/graphqlTransparent.png"
            className={s.graphqlLogo}
            alt="GraphQL"
          />
        </a>
      </Link>
      <Link href="https://www.apple.com">
        <a target="_blank" rel="noreferrer">
          <img
            src="/assets/appleTransparent.png"
            className={s.appleLogo}
            alt="Apple"
          />
        </a>
      </Link>
    </div>
  );
}

export default Feedback;
