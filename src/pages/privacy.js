import Markdown from 'react-markdown';
import Layout from '../components/LayoutComponents/Layout/Layout';

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
          padding: 13em 0em;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

export default Privacy;
