import { Button } from 'aelf-design';
import CommonCopy from 'components/CommonCopy';
import { useCheckLoginAndToken, useWalletService } from 'hooks/useWallet';
import { useMemo } from 'react';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import useGetStoreInfo from 'redux/hooks/useGetStoreInfo';
import { OmittedType, addPrefixSuffix, getOmittedStr } from 'utils/addressFormatting';
import useResponsive from 'utils/useResponsive';

export default function ConnectWallet() {
  const { isLogin } = useGetLoginStatus();
  const { wallet } = useWalletService();
  const { cmsInfo } = useGetStoreInfo();
  const { checkLogin } = useCheckLoginAndToken();
  const { isLG, width } = useResponsive();

  const fullAddress = useMemo(() => {
    return addPrefixSuffix(wallet.address, cmsInfo?.curChain);
  }, [cmsInfo?.curChain, wallet.address]);

  const formatAddress = useMemo(() => {
    return width < 390
      ? getOmittedStr(fullAddress, OmittedType.CUSTOM, {
          prevLen: 10,
          endLen: 4,
          limitLen: 15,
        })
      : getOmittedStr(fullAddress, OmittedType.ADDRESS);
  }, [fullAddress, width]);

  return isLogin ? (
    <div className="rounded-lg px-2 py-1 lg:py-2 lg:px-4 border-solid border-[1px] text-xs leading-[1] font-normal text-neutralPrimary border-neutralBorder bg-neutralWhiteBg">
      <CommonCopy toCopy={fullAddress}>{formatAddress}</CommonCopy>
    </div>
  ) : (
    <Button
      size={isLG ? 'small' : 'large'}
      onClick={() => {
        checkLogin();
      }}
      type="primary"
    >
      Connect Wallet
    </Button>
  );
}
