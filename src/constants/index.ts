import BigNumber from 'bignumber.js';

export enum WalletType {
  unknown = 'unknown',
  discover = 'discover',
  portkey = 'portkey',
}

export enum NetworkType {
  MAIN = 'MAIN',
  TESTNET = 'TESTNET',
}

export const SECONDS_60 = 60000;

export const ZERO = new BigNumber(0);

export const APP_NAME = 'appName';

export const APP_PREFIX = 'earn';

export const mainChain = 'AELF';
