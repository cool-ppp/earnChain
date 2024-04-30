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

export const fetchStackingPoolsData = async (): Promise<IStackPoolData> => {
  return request.post('/api/app/simple/staking/pools');
};
