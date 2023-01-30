import EditContent from './content/EditContent';
import CONTENT from '../../constants/content';

export default function AdminContact() {
  return (
    <div>
      <EditContent keyContent={CONTENT.KEY.CONTACT_ADDRESS} isTextArea />
      <EditContent keyContent={CONTENT.KEY.CONTACT_PHONE} isTextArea={false} />
      <EditContent keyContent={CONTENT.KEY.CONTACT_EMAIL} isTextArea={false} />
    </div>
  );
}
