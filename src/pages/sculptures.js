import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Item from '../components/ItemDir/Item';
import ITEM from '../constants/item';
import GET_ITEMS_QUERY from '../data/graphql/queries/getAllItems';
import { withApollo } from '../data/client';
import Root from "../components/LayoutComponents/Root";

function Sculptures() {
  const title = 'Sculptures';
  const type = ITEM.SCULPTURE.TYPE;
  const { data, loading, error } = useQuery(GET_ITEMS_QUERY, {
    variables: { type },
    ssr: true,
  });
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur au chargement des sculptures :(</div>;

  return (
    <Root>
      <h1 className="hidden">{title}</h1>
      {data.getAllItems &&
        data.getAllItems.map(sculpture => (
          <Item key={sculpture.title} item={sculpture} type={type} />
        ))}
    </Root>
  );
}

export default withApollo(Sculptures);
