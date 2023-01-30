import EditPictureForm from './picture/EditPictureForm';
import EditContent from './content/EditContent';
import CONTENT from '../../constants/content';

export default function AdminPresentation() {
  return (
    <div>
      <EditPictureForm pictureTitle={CONTENT.PRESENTATION_IMAGE_TITLE} />
      <EditContent keyContent={CONTENT.KEY.PRESENTATION} isTextArea />
    </div>
  );
}
