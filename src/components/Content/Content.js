import PropTypes from 'prop-types';

import s from './Content.module.css';

export default function Content({ content }) {
  return <>{content && <p className={s.content}>{content.text}</p>}</>;
}

Content.propTypes = {
  content: PropTypes.object.isRequired,
};
