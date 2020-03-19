import Item from '../components/ItemDir/Item';
import ITEM from '../constants/item';
import { withApollo } from '../data/apollo/client';
import Layout from '../components/LayoutComponents/Layout/Layout';
import {getAllItems} from "../data/api";

const Sculptures = ({ items }) => {
  const title = 'Sculptures';
  const type = ITEM.SCULPTURE.TYPE;

  return (
    <Layout>
      <h1 className="hidden">{title}</h1>
      {items.map(sculpture => (
          <Item key={sculpture.title} item={sculpture} type={type} />
        ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const items = await getAllItems(ITEM.SCULPTURE.TYPE);

  return {
    props: { items },
  };
}

export default Sculptures;
