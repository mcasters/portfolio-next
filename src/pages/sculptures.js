import Item from '../components/ItemDir/Item';
import ItemConstant from '../constants/itemConstant';
import Layout from '../components/LayoutComponents/Layout/Layout';
import {getAllItems} from "../data/api/api";

const Sculptures = ({ items }) => {
  const title = 'Sculptures';
  const type = ItemConstant.SCULPTURE.TYPE;

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
  const items = await getAllItems(ItemConstant.SCULPTURE.TYPE);

  return {
    props: { items },
  };
}

export default Sculptures;
