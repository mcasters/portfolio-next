import s from './OldImagePart.module.css';
import PropTypes from 'prop-types';

function OldImagePart({ item }) {
  return (
    <>
      <div className={s.oldImageContainer}>
        {item.SMPaths.map(
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
