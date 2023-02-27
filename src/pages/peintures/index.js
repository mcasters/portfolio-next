import Link from 'next/link';

import ITEM from '../../constants/item';
import Layout from '../../components/layout-components/layout/Layout';
import s from '../styles/item.module.css';
import LAYOUT from '../../constants/layout';

export default function Peintures() {
  return (
    <Layout>
      <h1 className={s.title}>{ITEM.PAINTING.PAGE_TITLE}</h1>
      <ul>
        <li className={s.year}>
          <Link
            href={`/peintures/2017`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2017 }}
          >
            2017
          </Link>
        </li>
        <li className={s.year}>
          <Link
            href={`/peintures/2018`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2018 }}
          >
            2018
          </Link>
        </li>
        <li className={s.year}>
          <Link
            href={`/peintures/2019`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2019 }}
          >
            2019
          </Link>
        </li>
        <li className={s.year}>
          <Link
            href={`/peintures/2021`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2021 }}
          >
            2021
          </Link>
        </li>
        <li className={s.year}>
          <Link
            href={`/peintures/2022`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2022 }}
          >
            2022
          </Link>
        </li>
        <li className={s.year}>
          <Link
            href={`/peintures/2023`}
            legacyBehavior={false}
            style={{ backgroundImage: LAYOUT.BACKGROUND_PAINTING_2023 }}
          >
            2023
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
