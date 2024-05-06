import StackModal from 'components/StakeModal';
import { useModal } from '@ebay/nice-modal-react';
import { useCallback } from 'react';
import { manageStakeInfo, tokenStake } from 'contract/tokenStaking';
import { StakeType } from 'types/stack';

export default function useStack() {
  const stackModal = useModal(StackModal);

  const stake = useCallback(
    async (stakeData: IStakePoolData, successCb: () => void) => {
      stackModal.show({
        stakeData,
        type: StakeType.STAKE,
        balance: '10000',
        onConfirm: async (amount: string, period: string) => {
          try {
            console.log('stake amount period', amount, period);
            // await tokenStake({ poolId: stakeData.poolId || '', amount, period });
          } catch (error) {
            console.log(error);
          }
        },
      });
    },
    [stackModal],
  );

  const addStake = useCallback(
    async (stakeData: IStakePoolData, successCb: () => void) => {
      stackModal.show({
        stakeData,
        type: StakeType.ADD,
        balance: '10000',
        onConfirm: async (amount: string, period: string) => {
          try {
            console.log('stake amount period', amount, period);
            // await manageStakeInfo({ stakeId: stakeData.stakeId || '', amount, period });
          } catch (error) {
            console.log(error);
          }
        },
      });
    },
    [stackModal],
  );

  const extendStake = useCallback(
    async (stakeData: IStakePoolData, successCb: () => void) => {
      stackModal.show({
        stakeData,
        type: StakeType.EXTEND,
        balance: '10000',
        onConfirm: async (amount: string, period: string) => {
          try {
            console.log('stake amount period', amount, period);
            // await manageStakeInfo({ stakeId: stakeData.stakeId || '', amount, period });
          } catch (error) {
            console.log(error);
          }
        },
      });
    },
    [stackModal],
  );

  return { stake, addStake, extendStake };
}
