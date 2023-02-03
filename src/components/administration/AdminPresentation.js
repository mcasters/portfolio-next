import EditContent from './content/EditContent';
import CONTENT from '../../constants/content';
import EditPictureContent from './content/EditPictureContent';

export default function AdminPresentation() {
  return (
    <div>
      <EditPictureContent pictureTitle={CONTENT.PRESENTATION_IMAGE_TITLE} />
      <EditContent keyContent={CONTENT.KEY.PRESENTATION} isTextArea />
    </div>
  );
}
