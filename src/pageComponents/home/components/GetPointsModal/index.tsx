import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button } from 'aelf-design';
import CommonModal from 'components/CommonModal';

export interface IPointsModalProps {
  icon: string;
  name: string;
  desc: string;
  rulesContent: string;
  link: string;
  handleConfirm?: () => void;
  confirmText?: string;
}

function GetPointsModal({
  icon,
  name,
  desc,
  rulesContent,
  confirmText = 'Gain points',
  link,
  handleConfirm,
}: IPointsModalProps) {
  const modal = useModal();
  return (
    <CommonModal
      title="How do I earn points?"
      open={modal.visible}
      onCancel={modal.hide}
      footer={
        <Button
          type="primary"
          onClick={() => {
            handleConfirm?.();
            window.open(link, 'blank');
          }}
        >
          {confirmText}
        </Button>
      }
    >
      <div className="flex gap-x-4">
        {!icon ? null : (
          <img
            className="w-8 h-8 md:w-16 md:h-16 rounded-md cursor-pointer"
            width={64}
            height={64}
            alt="logo"
            src={icon}
          />
        )}
        <div className="text-sm font-medium md:text-base flex flex-col">
          <span className="text-neutralPrimary">{name}</span>
          <span className="text-neutralSecondary">{desc}</span>
        </div>
      </div>
      <div className="text-base break-all text-neutralPrimary mt-5">{rulesContent}</div>
    </CommonModal>
  );
}

export default NiceModal.create(GetPointsModal);
