import Link from 'next/link';

import ITEM from '../../constants/itemConstant';
import Layout from '../../components/layout-components/layout/Layout';
import s from '../styles/item.module.css';

export default function Peintures() {
  return (
    <Layout>
      <h1 className={s.title}>{ITEM.PAINTING.TITLE}</h1>
      <ul>
        <li>
          <Link href={`/peintures/2017`}>
            <a className={s.year}>2017</a>
          </Link>
        </li>
        <li>
          <Link href={`/peintures/2018`}>
            <a className={s.year}>2018</a>
          </Link>
        </li>
        <li>
          <Link href={`/peintures/2019`}>
            <a className={s.year}>2019</a>
          </Link>
        </li>
        <li>
          <Link href={`/peintures/2022`}>
            <a className={s.year}>2022</a>
          </Link>
        </li>
        <li>
          <Link href={`/peintures/2023`}>
            <a className={s.year}>2023</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}