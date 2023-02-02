import s from './Preview.module.css';
import PropTypes from 'prop-types';

export default function Preview({ previewUrls, onDelete }) {
  return (
    <>
      {previewUrls.map((url, index) => {
        if (url !== '')
          return (
            <div key={`container${index}`} className={s.imagePreviewContainer}>
              <img
                key={`img${index}`}
                src={url}
                alt="Image formulaire"
                className={s.imagePreview}
              />
              <button
                key={`button${index}`}
                className="button"
                onClick={onDelete(index)}
              >
                Supprimer l'image
              </button>
            </div>
          );
      })}
    </>
  );
}

Preview.propTypes = {
  previewUrls: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
