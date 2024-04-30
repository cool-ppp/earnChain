import { useCallback, useEffect, useState } from 'react';
import StackCard from './components/StackCard';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import useStack from 'hooks/useStack';
import { fetchStackingPoolsData } from './mock';

export default function Simple() {
  const { isLogin } = useGetLoginStatus();
  const { checkLogin } = useCheckLoginAndToken();
  const stack = useStack();
  const [stackData, setStackData] = useState<IStackPoolData>({});

  const onStack = useCallback(() => {
    console.log('onStack');
    if (!isLogin) {
      return checkLogin();
    }
    stack();
  }, [checkLogin, isLogin, stack]);

  const getStackData = useCallback(async () => {
    console.warn('getStackData');
    const data = await fetchStackingPoolsData();
    setStackData(data);
  }, []);

  useEffect(() => {
    getStackData();
  }, [getStackData]);

  return (
    <div className="">
      <div className="py-[48px] text-5xl font-semibold text-neutral-title">Simple Staking</div>
      <div className="flex flex-col gap-6">
        <StackCard data={stackData} isLogin={isLogin} onStack={onStack} />
      </div>
    </div>
  );
}
