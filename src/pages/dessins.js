import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../data/client';
import Item from '../components/ItemDir/Item';
import ITEM from '../constants/item';
import GET_ITEMS_QUERY from '../data/graphql/queries/getAllItems';
import Layout from "../components/LayoutComponents/Layout/Layout";

function Dessins() {
  const title = 'Dessins';
  const type = ITEM.DRAWING.TYPE;
  const { data, loading, error } = useQuery(GET_ITEMS_QUERY, {
    variables: { type },
  });
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur au chargement des Dessins :(</div>;

  return (
    <Layout>
      <h1 className="hidden">{title}</h1>
      {data.getAllItems &&
        data.getAllItems.map(drawing => (
          <Item key={drawing.title} item={drawing} type={type} />
        ))}
    </Layout>
  );
}

export default withApollo(Dessins);
