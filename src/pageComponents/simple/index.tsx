import { useCallback } from 'react';
import StackCard from './components/StackCard';
import StackList from './components/StackList';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import useStack from 'hooks/useStack';

export default function Simple() {
  const { isLogin } = useGetLoginStatus();
  const { checkLogin } = useCheckLoginAndToken();
  const stack = useStack();

  const onStack = useCallback(() => {
    console.log('onStack');
    if (!isLogin) {
      return checkLogin({
        onSuccess: () => {
          stack();
        },
      });
    }
    stack();
  }, [checkLogin, isLogin, stack]);

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
