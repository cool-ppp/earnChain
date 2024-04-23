export type InfoStateType = {
  isMobile?: boolean;
  isSmallScreen?: boolean;
  theme: string | undefined | null;
  baseInfo: {
    rpcUrl?: string;
    identityPoolID?: string;
    // some config
  };
  cmsInfo?: {
    isShowRampBuy: boolean;
    isShowRampSell: boolean;
    networkType: 'TESTNET' | 'MAIN';
    networkTypeV2: 'TESTNET' | 'MAINNET';
    connectUrlV2: string;
    portkeyServerV2: string;
    graphqlServerV2: string;
    curChain: Chain;
    rpcUrlAELF: string;
    rpcUrlTDVW: string;
    rpcUrlTDVV: string;
    [key: string]: any;
  };
};

export enum LoginState {
  initial = 'initial',
  lock = 'lock',
  eagerly = 'eagerly',
  logining = 'logining',
  logined = 'logined',
  logouting = 'logouting',
}

export type TLoginStatusType = {
  loginStatus: {
    walletStatus: LoginState;
    isConnectWallet: boolean;
    hasToken: boolean;
    isLogin: boolean;
  };
};
