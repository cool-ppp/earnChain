import StackModal from 'components/StackModal';
import { useModal } from '@ebay/nice-modal-react';
import { useCallback } from 'react';

export default function useStack() {
  const stackModal = useModal(StackModal);

  return useCallback(() => {
    stackModal.show({
      tokenName: 'SGR',
      // type: 'add',
      extend: true,
    });
  }, [stackModal]);
}
