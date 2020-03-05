import React from 'react';

import s from './Presentation.module.css';
import Content from '../components/Content/Content';
import CONT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import Root from '../components/LayoutComponents/Root';

const Presentation = () => {
  const title = TITLE.PRESENTATION;

  return (
    <Root>
      <div className={s.presentationContainer}>
        <h1 className={s.title}>{title}</h1>
        <img
          className={s.image}
          src={`${CONT_CONST.CONTENT_IMAGE_PATH}/${CONT_CONST.PRESENTATION_IMAGE_TITLE}.jpg`}
          alt={CONT_CONST.PRESENTATION_IMAGE_ALT}
        />
        <Content keyContent={CONT_CONST.KEY.PRESENTATION} />
      </div>
    </Root>
  );
};

export default Presentation;
