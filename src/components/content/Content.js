import PropTypes from 'prop-types';

import s from './Content.module.css';

export default function Content({ text }) {
  return <>{text && <p className={s.content}>{text}</p>}</>;
}

Content.propTypes = {
  text: PropTypes.string,
};
