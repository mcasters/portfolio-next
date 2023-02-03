import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

/*
 * *****************************
 * From server (Into getServerSideProps()) = Ssr
 * *****************************
 */

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
