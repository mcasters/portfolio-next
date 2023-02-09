import Link from 'next/link';

import s from './Feedback.module.css';
import GLOBAL_CONSTANTS from '../../../../constants/globalConstants';

function Feedback() {
  return (
    <div className={s.container}>
      <span>{GLOBAL_CONSTANTS.HANDCRAFTED}</span>
      <Link
        href="https://nodejs.org"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <img
          src="/assets/nodeJSTransparent.png"
          className={s.nodejsLogo}
          alt="NodeJS"
        />
      </Link>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <img
          src="/assets/reactTransparent.png"
          className={s.reactLogo}
          alt="React"
        />
      </Link>

      <Link
        href="https://graphql.org"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <img
          src="/assets/graphqlTransparent.png"
          className={s.graphqlLogo}
          alt="GraphQL"
        />
      </Link>
      <Link
        href="https://www.apple.com"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <img
          src="/assets/appleTransparent.png"
          className={s.appleLogo}
          alt="Apple"
        />
      </Link>
    </div>
  );
}

export default Feedback;
