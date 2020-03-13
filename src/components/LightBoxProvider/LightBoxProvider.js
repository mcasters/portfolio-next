import React from 'react';
import PropTypes from 'prop-types';
import FsLightbox from 'fslightbox-react';

import s from './LightBoxProvider.module.css';

export default function LightBoxProvider({ title, srcList, isOpen }) {
  const t = title;

  return (
    <>
      <div className={s.title}>{t}</div>
      <FsLightbox toggler={isOpen} sources={srcList} />
    </>
  );
}

LightBoxProvider.propTypes = {
  title: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
