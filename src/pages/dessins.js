import Item from '../components/ItemDir/Item';
import ITEM from '../constants/item';
import Layout from '../components/LayoutComponents/Layout/Layout';
import { getAllItems } from '../data/api';

const Dessins = ({ items }) => {
  const title = 'Dessins';
  const type = ITEM.DRAWING.TYPE;

  return (
    <Layout>
      <section>
        <h1 className="hidden">{title}</h1>
        {items.map(drawing => (
          <Item key={drawing.title} item={drawing} type={type} />
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const items = await getAllItems(ITEM.DRAWING.TYPE);

  return {
    props: { items },
  };
}

export default Dessins;
