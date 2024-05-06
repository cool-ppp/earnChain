import request, { tokenRequest } from './axios';
import qs from 'qs';

export const fetchToken = async (data: ITokenParams) => {
  return tokenRequest.post<
    ITokenParams,
    {
      access_token: string;
      expires_in: number;
    }
  >('/token', qs.stringify(data) as any);
};

export const fetchStackingPoolsData = async (): Promise<IStakePoolData> => {
  return request.post('/api/app/simple/staking/pools');
};

export const getStakingItems = async (): Promise<Array<IStakingItem>> => {
  return request.get('/app/points/staking/items');
};

export const getPointsPoolList = async (
  data: IPointsPoolParams,
): Promise<Array<IPointsPoolItem>> => {
  return request.post('/app/points/staking/pools', data);
};

export const stakingClaim = async (data: IStakingClaimParams): Promise<string> => {
  return request.post('/app/points/staking/claim/signature', data);
};

export const pointsStakingWithdraw = async (data: ICreateTradeParams): Promise<string> => {
  return request.post('/app/points/staking/withdraw', data);
};

export const simpleStakingWithdraw = async (data: ICreateTradeParams): Promise<string> => {
  return request.post('/app/simple/staking/withdraw', data);
};

export const pointsStakingState = async (data: ICreateTradeParams): Promise<string> => {
  return request.post('/app/points/staking/stake', data);
};

export const getPoolRewards = async (): Promise<IPoolRewardsData> => {
  return request.post('/app/rewards/aggregation');
};

export const getRewardsList = async (data: IRewardListParams): Promise<Array<IRewardListItem>> => {
  return request.post('/app/rewards/list', data);
};
