interface ITokenParams {
  grant_type: string;
  scope: string;
  client_id: string;
  pubkey?: string;
  version?: string;
  signature?: string;
  timestamp?: number;
  accountInfo?: Array<{ chainId: string; address: string }>;
  source: string;
}

interface IStakingItem {
  dappName: string;
  icon: string;
  tvl: number;
  stakingAddress: number;
  isOpenStake: boolean;
  projectOwner: string;
}

interface IPointsPoolParams {
  type: string;
  sorting: string;
  name: string;
  skipCount: number;
  maxResultCount: number;
}

interface IPointsPoolItem {
  poolName: string;
  dailyRewards: number;
  poolDailyRewards: number;
  totalStake: number;
  surplusStake: number;
  earned: number;
  staked: number;
}

interface IStakingClaimParams {
  amount: number;
  tokenName: string;
}

interface ICreateTradeParams {
  rawTransaction: string;
  chainId: Chain;
}

interface IPoolRewardsData {
  pointsPoolAgg: {
    total: number;
    rewardsTotal: number;
  };
  tokenPoolAgg: {
    rewardsTotal: number;
  };
}

interface IRewardListParams {
  tokenPool: 'xpsgr-1';
  poolType: 'Points' | 'Token';
}

interface IRewardListItem {
  poolType: string;
  rewards: number;
  tokenName: string;
  tokenIcon: string;
  date: number;
  lockUpPeriod: number;
}
