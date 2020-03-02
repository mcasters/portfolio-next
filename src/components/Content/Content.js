import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import GET_CONTENT from '../../data/graphql/queries/getContent';
import s from './Content.module.css';
import { withApollo } from '../../data/client';

function Content({ keyContent }) {
  const { data, loading } = useQuery(GET_CONTENT, {
    variables: { key: keyContent },
    ssr: true,
  });
  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {data.getContent && <p className={s.content}>{data.getContent.text}</p>}
    </>
  );
}

Content.propTypes = {
  keyContent: PropTypes.string.isRequired,
};

export default withApollo(Content);
