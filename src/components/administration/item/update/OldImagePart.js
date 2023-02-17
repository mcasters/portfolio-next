import s from './OldImagePart.module.css';
import PropTypes from 'prop-types';

import { getSMPaths } from '../../../utils/itemUtils';

function OldImagePart({ item }) {
  return (
    <>
      <div className={s.oldImageContainer}>
        {getSMPaths(item, item.type).map(
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
};

export default OldImagePart;
