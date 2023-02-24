import Layout from '../components/layout-components/layout/Layout';
import CONSTANT from '../constants/pageTitle';
import GLOBAL_CONSTANTS from '../constants/globalConstants';

const Privacy = () => {
  return (
    <Layout>
      <h1>{CONSTANT.PRIVACY}</h1>
      <p className="politique">{GLOBAL_CONSTANTS.POLITIQUE_CONFIDENT}</p>
      <style jsx global>{`
        .politique {
          font-size: 13px;
          padding: 5em 0;
        }
      `}</style>
    </Layout>
  );
};

export default Privacy;
