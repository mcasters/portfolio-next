import Markdown from 'react-markdown';
import Layout from '../components/layout-components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="markdown">
        <Markdown
          source={`
Nous nous engageons à ne collecter aucun renseignement personnel, d'aucune sorte que ce soit.
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-size: 13px;
          padding: 13em 0;
        }
      `}</style>
    </Layout>
  );
};

export default Privacy;
