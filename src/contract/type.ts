export interface IClaimParams {
  pool_id: number;
  account: string;
  amount: number;
  seed: number;
  signature: string;
}

export interface IEarlyStakeParams {
  pool_id: number;
  days: number;
  claim_ids: Array<number>;
}

export interface ICParams {
  claim_ids: Array<number>;
}
