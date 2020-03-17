import PropTypes from 'prop-types';

import GET_CONTENT from '../../data/graphql/queries/getContent';
import s from './Content.module.css';
import { getContent } from '../../data/api';

export default function Content({ content }) {
  return <>{content && <p className={s.content}>{content.text}</p>}</>;
}

Content.propTypes = {
  content: PropTypes.object.isRequired,
};
