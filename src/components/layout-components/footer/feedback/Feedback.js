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
        className={s.link}
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
        className={s.link}
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
        className={s.link}
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
        className={s.link}
      >
        <Image
          src="/assets/appleTransparent.png"

          alt="Apple"
          width="0"
          height="0"
          quality={100}
          unoptimized={true}
          className={s.appleLogo}
        />
      </Link>
    </div>
  );
}

export default Feedback;
