import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button } from 'aelf-design';
import CommonModal from 'components/CommonModal';
import { ReactNode } from 'react';

interface IConfirmModalProps {
  title: string;
  content: string;
  subContent?: string;
  confirmBtnText: string;
  onConfirm: () => void;
  bottomDesc?: ReactNode;
  loading: boolean;
}

function ConfirmModal(props: IConfirmModalProps) {
  const {
    title,
    confirmBtnText = 'OK',
    content,
    subContent,
    onConfirm,
    bottomDesc,
    loading,
  } = props;
  const modal = useModal();

  return (
    <CommonModal
      open={modal.visible}
      onCancel={modal.hide}
      width={580}
      title={title}
      footer={
        <div className="lg:px-8 w-full">
          <Button type="primary" block onClick={onConfirm} loading={loading}>
            {confirmBtnText}
          </Button>
        </div>
      }
    >
      <p className="text-center text-base font-medium text-neutralTitle">{content}</p>
      {subContent && <p className="text-center mt-4 text-sm text-neutralSecondary">{subContent}</p>}
      <div className="mt-10"> {bottomDesc}</div>
    </CommonModal>
  );
}

export default NiceModal.create(ConfirmModal);
