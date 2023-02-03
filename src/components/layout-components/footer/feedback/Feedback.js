import s from './Feedback.module.css';
import GLOBAL_CONSTANTS from '../../../../constants/globalConstants';

function Feedback() {
  return (
    <div className={s.container}>
      <span className={s.text}>{GLOBAL_CONSTANTS.HANDCRAFTED}</span>
      <a href="https://nodejs.org" target="_blank" rel="noreferrer">
        <img
          src="/assets/nodeJSTransparent.png"
          className={s.nodejsLogo}
          alt="NodeJS"
        />
      </a>
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">
        <img
          src="/assets/reactTransparent.png"
          className={s.reactLogo}
          alt="React"
        />
      </a>

      <a href="https://graphql.org" target="_blank" rel="noreferrer">
        <img
          src="/assets/graphqlTransparent.png"
          className={s.graphqlLogo}
          alt="GraphQL"
        />
      </a>
      <a href="https://www.apple.com" target="_blank" rel="noreferrer">
        <img
          src="/assets/appleTransparent.png"
          className={s.appleLogo}
          alt="Apple"
        />
      </a>
    </div>
  );
}

export default Feedback;
