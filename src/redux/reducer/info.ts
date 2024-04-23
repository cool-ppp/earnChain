import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { InfoStateType } from 'redux/types/reducerTypes';

const initialState: InfoStateType = {
  isMobile: false,
  isSmallScreen: false,
  baseInfo: {
    rpcUrl: '',
  },
  theme: 'light',
  cmsInfo: {
    curChain: 'tDVW',
    forestUrl: 'https://test.eforest.finance',
    ifpsPrefix: 'https://ipfs.schrodingerai.com/ipfs',
    rpcUrlAELF: 'https://aelf-test-node.aelf.io',
    rpcUrlTDVV: 'https://tdvv-test-node.aelf.io',
    rpcUrlTDVW: 'https://tdvw-test-node.aelf.io',
    networkType: 'TESTNET',
    connectUrlV2: 'https://auth-aa-portkey-test.portkey.finance',
    networkTypeV2: 'TESTNET',
    s3ImagePrefix: 'https://schrodinger-testnet.s3.amazonaws.com/watermarkimage',
    graphqlServerV2:
      'https://dapp-aa-portkey-test.portkey.finance/Portkey_V2_DID/PortKeyIndexerCASchema/graphql',
    portkeyServerV2: 'https://aa-portkey-test.portkey.finance',
    tokenMainAddress: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
    tokenSideAddress: 'ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx',
    isShowRampBuy: true,
    isShowRampSell: false,
  },
};

// Actual Slice
export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.info,
      };
    },
  },
});

export const { setIsMobile } = infoSlice.actions;
export const selectInfo = (state: AppState) => state.info;
export default infoSlice.reducer;
