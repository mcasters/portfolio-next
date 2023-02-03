import s from './OldImagePart.module.css';
import PropTypes from 'prop-types';

import { getSMPaths } from '../../../utils/itemUtils';

function OldImagePart({ item, type }) {
  return (
    <>
      <div className={s.oldImageContainer}>
        {getSMPaths(item, type).map(
          (url) =>
            url !== '' && (
              <img
                key={url.toString()}
                src={url}
                alt="Incommensurable chef d'oeuvre de Marion Casters"
                className={s.oldImagePreview}
              />
            ),
        )}
      </div>
    </>
  );
}

OldImagePart.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default OldImagePart;
