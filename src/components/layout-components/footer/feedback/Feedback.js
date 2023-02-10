import Link from 'next/link';
import Image from 'next/image';

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
        <Image
          src="/assets/nodeJSTransparent.png"
          className={s.nodejsLogo}
          alt="NodeJS"
          width="50"
          height="50"
          quality={100}
          unoptimized={true}
        />
      </Link>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <Image
          src="/assets/reactTransparent.png"
          className={s.reactLogo}
          alt="React"
          width="50"
          height="50"
          quality={100}
          unoptimized={true}
        />
      </Link>

      <Link
        href="https://graphql.org"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <Image
          src="/assets/graphqlTransparent.png"
          className={s.graphqlLogo}
          alt="GraphQL"
          width="50"
          height="50"
          quality={100}
          unoptimized={true}
        />
      </Link>
      <Link
        href="https://www.apple.com"
        target="_blank"
        rel="noreferrer"
        legacyBehavior={false}
      >
        <Image
          src="/assets/appleTransparent.png"
          className={s.appleLogo}
          alt="Apple"
          width="50"
          height="50"
          quality={100}
          unoptimized={true}
        />
      </Link>
    </div>
  );
}

export default Feedback;
