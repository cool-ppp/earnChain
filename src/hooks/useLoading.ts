import { useModal } from '@ebay/nice-modal-react';
import NiceLoading from 'components/PageLoading/NiceLoading';
import { useCallback, useMemo, useRef } from 'react';

export default function useLoading() {
  const modal = useModal(NiceLoading);
  const modalRef = useRef(modal);
  modalRef.current = modal;

  const showLoading = useCallback(
    (props?: { showClose?: boolean; content?: string; onClose?: () => void }) => {
      modalRef.current?.show({
        showClose: props?.showClose,
        content: props?.content,
        onClose: props?.onClose,
      });
    },
    [],
  );

  const closeLoading = useCallback(() => {
    modalRef.current?.hide();
  }, []);

  return useMemo(
    () => ({
      showLoading,
      closeLoading,
      visible: modal.visible,
    }),
    [closeLoading, modal.visible, showLoading],
  );
}
