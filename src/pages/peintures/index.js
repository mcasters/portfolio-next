import { useRouter } from 'next/router';
import Link from 'next/link';
import ITEM from '../../constants/itemConstant';
import Layout from "../../components/layout-components/layout/Layout";

export default function PostPage() {
  const router = useRouter();
  const year = router.query.id;

  return (
    <Layout>
      <h1 className="hidden">{ITEM.PAINTING.TITLE}</h1>
      <ul>
        <li>
          <Link href={`/peintures/2018`}>2018</Link>
        </li>
        <li>
          <Link href={`/peintures/2019`}>2019</Link>
        </li>
      </ul>
    </Layout>
  );
}