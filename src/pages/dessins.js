import Item from '../components/ItemDir/Item';
import ItemConstant from '../constants/itemConstant';
import Layout from '../components/LayoutComponents/Layout/Layout';
import { getAllItems } from '../data/lib/api';

const Dessins = ({ items }) => {
  const title = 'Dessins';
  const type = ItemConstant.DRAWING.TYPE;

  return (
    <Layout>
      <section>
        <h1 className="hidden">{title}</h1>
        {items.map((drawing) => (
          <Item key={drawing.title} item={drawing} type={type} />
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const items = await getAllItems(ItemConstant.DRAWING.TYPE);

  return {
    props: { items },
  };
}

export default Dessins;
