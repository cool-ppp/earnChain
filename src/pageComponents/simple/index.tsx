import { useCallback, useEffect, useState } from 'react';
import StackCard from 'components/StakeCard';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import useStack from 'hooks/useStake';
import { fetchStackingPoolsData } from './mock';
import { tokenClaim, tokenWithdrawn, tokenStake, manageStakeInfo } from 'contract/tokenStaking';
import { singleMessage } from '@portkey/did-ui-react';
import { IContractError } from 'types/index';

export default function Simple() {
  const { isLogin } = useGetLoginStatus();
  const { checkLogin } = useCheckLoginAndToken();
  const { stake, addStake, extendStake } = useStack();
  const [stakeData, setStakeData] = useState<IStakePoolData>({});

  const getStakeData = useCallback(async () => {
    console.warn('getStakeData');
    const data = await fetchStackingPoolsData();
    setStakeData(data);
  }, []);

  useEffect(() => {
    getStakeData();
  }, [getStakeData]);

  const onClaim = useCallback(async () => {
    try {
      const { stakeId = '' } = stakeData;
      if (!stakeId) singleMessage.error('missing params');
      // TODO: add modal
      await tokenClaim({ stakeId: stakeData?.stakeId || '' });
    } catch (error) {
      console.log(error);
      singleMessage.error(
        (error as IContractError).errorMessage?.message || 'claim failed, please try again later',
      );
    }
  }, [stakeData]);

  const onUnstack = useCallback(async () => {
    try {
      const { stakeId = '' } = stakeData;
      if (!stakeId) singleMessage.error('missing params');
      // TODO: add modal
      await tokenWithdrawn({ stakeId: stakeData?.stakeId || '' });
    } catch (error) {
      console.log(error);
      singleMessage.error(
        (error as IContractError).errorMessage?.message || 'claim failed, please try again later',
      );
    }
  }, [stakeData]);

  const onUpdate = useCallback(async () => {
    setStakeData({ ...stakeData, stakeApr: '', earned: '', earnedInUsd: '' });
  }, [stakeData]);

  const onStack = useCallback(() => {
    console.log('onStack');
    if (!isLogin) {
      return checkLogin();
    }
    stake(stakeData, getStakeData);
  }, [checkLogin, getStakeData, isLogin, stake, stakeData]);

  const onAdd = useCallback(() => {
    console.log('add stake');
    addStake(stakeData, getStakeData);
  }, [addStake, getStakeData, stakeData]);

  const onExtend = useCallback(() => {
    extendStake(stakeData, getStakeData);
  }, [extendStake, getStakeData, stakeData]);

  return (
    <div className="">
      <div className="py-[48px] text-5xl font-semibold text-neutral-title">Simple Staking</div>
      <div className="flex flex-col gap-6">
        <StackCard
          data={stakeData}
          isLogin={isLogin}
          onStack={onStack}
          onClaim={onClaim}
          onAdd={onAdd}
          onUnstack={onUnstack}
          onExtend={onExtend}
          onUpdateAprAndRewards={onUpdate}
        />
      </div>
    </div>
  );
}
