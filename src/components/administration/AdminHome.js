import EditPictureContent from './content/EditPictureContent';
import EditContent from './content/EditContent';
import CONTENT from '../../constants/content';

export default function AdminHome() {
  return (
    <div>
      <EditPictureContent pictureTitle={CONTENT.HOME_IMAGE_PORTRAIT} />
      <EditPictureContent pictureTitle={CONTENT.HOME_IMAGE_LANDSCAPE} />
      <EditContent keyContent={CONTENT.KEY.HOME1} isTextArea />
      <EditContent keyContent={CONTENT.KEY.HOME2} isTextArea />
      <EditContent keyContent={CONTENT.KEY.INTRODUCTION} isTextArea />
    </div>
  );
}
