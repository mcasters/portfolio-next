/*
 * *****************************
 * Api calls from server (Into getServerSideProps()) = Ssr
 * *****************************
 */

import { graphql } from 'graphql';

import { schema } from '../../schema';

export async function queryGraphql(
  query,
  variableValues = {},
  contextValue = {},
) {
  const { data } = await graphql({
    schema,
    source: query,
    variableValues,
    contextValue,
  });
  return data || {};
}