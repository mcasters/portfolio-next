import Markdown from 'react-markdown';
import Layout from '../components/layout-components/layout/Layout';
import CONSTANT from '../constants/pageTitle';

const Privacy = () => {
  const markdown = `
Nous nous engageons à ne collecter aucun renseignement personnel, d'aucune sorte que ce soit.
      `;
  return (
    <Layout>
      <h1>{CONSTANT.PRIVACY}</h1>
      <div className="markdown">
        <Markdown>{markdown}</Markdown>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
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
