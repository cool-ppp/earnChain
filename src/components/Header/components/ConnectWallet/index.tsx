import { Button } from 'aelf-design';
import { useCheckLoginAndToken, useWalletService } from 'hooks/useWallet';
import { useMemo } from 'react';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import useGetStoreInfo from 'redux/hooks/useGetStoreInfo';
import { OmittedType, addPrefixSuffix, getOmittedStr } from 'utils/addressFormatting';

export default function ConnectWallet() {
  const { isLogin, hasToken } = useGetLoginStatus();
  const { wallet } = useWalletService();
  const { cmsInfo } = useGetStoreInfo();
  const { checkLogin } = useCheckLoginAndToken();

  console.log('isLogin', isLogin, hasToken);

  const formatAddress = useMemo(() => {
    const fullAddress = addPrefixSuffix(wallet.address, cmsInfo?.curChain);
    return getOmittedStr(fullAddress, OmittedType.ADDRESS);
  }, [cmsInfo?.curChain, wallet.address]);

  return isLogin ? (
    <div className="rounded-lg py-3 px-4 border-solid border-[1px] text-base font-medium text-neutralTitle border-lineDividers bg-neutralDefaultBg">
      {formatAddress}
    </div>
  ) : (
    <Button
      size="large"
      onClick={() => {
        checkLogin();
      }}
      type="primary"
    >
      Connect Wallet
    </Button>
  );
}
