import dayjs from 'dayjs';

export async function fetchStackingPoolsData(): Promise<IStakePoolData> {
  return Promise.resolve({
    poolName: 'SGR',
    poolId: '1',
    stakeId: '2',
    projectOwner: 'Schrodinger',
    aprMin: '12.23',
    aprMax: '32.12',
    earnedSymbol: 'XXX',
    totalStake: '11234567.3456',
    totalStakeInUsd: '3455.456',
    stakeSymbol: 'SGR',
    earned: '1111.2345',
    earnedInUsd: '23.555',
    staked: '123435.6778',
    stakedInUsD: '234.66',
    unlockTime: dayjs().add(20, 'm').valueOf(),
    stakeApr: '33.45',
    stakeAprX: 1.24,
  });
}
