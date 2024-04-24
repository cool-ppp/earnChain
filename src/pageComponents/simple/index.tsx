import { useCallback } from 'react';
import StackCard from './components/StackCard';
import StackModal from 'components/StackModal';
import StackList from './components/StackList';
import { useModal } from '@ebay/nice-modal-react';

export default function Simple() {
  const stackModal = useModal(StackModal);

  const onStack = useCallback(() => {
    console.log('onStack');
    stackModal.show({
      tokenName: 'SGR',
    });
  }, [stackModal]);

  return (
    <div className="">
      <div className="py-[48px] text-5xl font-semibold text-neutral-title">Simple Staking</div>
      <div className="flex flex-col gap-6">
        <StackCard onClick={onStack} />
        <StackList data={{}} />
      </div>
    </div>
  );
}
