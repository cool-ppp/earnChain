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

interface IStackPoolData {
  poolName?: string;
  poolId?: string;
  stakeId?: string;
  projectOwner?: string;
  aprMin?: string;
  aprMax?: string;
  earnedSymbol?: string;
  totalStake?: string;
  totalStakeInUsd?: string;
  stakeSymbol?: string;
  earned?: string;
  earnedInUsd?: string;
  staked?: string;
  stakedInUsD?: string;
  unlockTime?: number;
  stakeApr?: string;
}

type TStackPoolDataKey = keyof IStackPoolData;
