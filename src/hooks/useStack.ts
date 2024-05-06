import StackModal from 'components/StackModal';
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
        onConfirm: async (amount: string, period: string) => {
          try {
            await tokenStake({ poolId: stakeData.poolId || '', amount, period });
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
        onConfirm: async (amount: string, period: string) => {
          try {
            await manageStakeInfo({ stakeId: stakeData.stakeId || '', amount, period });
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
        onConfirm: async (amount: string, period: string) => {
          try {
            await manageStakeInfo({ stakeId: stakeData.stakeId || '', amount, period });
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
