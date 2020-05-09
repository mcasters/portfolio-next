import Item from '../components/ItemDir/Item';
import ItemConstant from '../constants/itemConstant';
import Layout from '../components/LayoutComponents/Layout/Layout';
import { getAllItems } from '../data/lib/api';
import { useEffect } from 'react';

const Dessins = ({ items }) => {
  const title = 'Dessins';
  const type = ItemConstant.DRAWING.TYPE;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('service worker registration successful');
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message);
        });
    }
  });

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
