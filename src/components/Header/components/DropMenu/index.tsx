import { DropMenuBase, IMenuItem } from 'components/DropMenuBase';
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { ReactComponent as MenuIcon } from 'assets/img/menu.svg';
import { useWalletService } from 'hooks/useWallet';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import ConnectWallet from '../ConnectWallet';
import useGetCmsInfo from 'redux/hooks/useGetCmsInfo';
import { addPrefixSuffix } from 'utils/addressFormatting';

export enum DropMenuTypeEnum {
  My = 'my',
  Nav = 'nav',
}

interface IDropMenuMy {
  isMobile: boolean;
  type: DropMenuTypeEnum;
}

const menuItems = [
  {
    label: 'Points Staking',
    href: '/stake',
  },
  {
    label: 'Simple Staking',
    href: '/simple',
  },
  {
    label: 'Rewards',
    href: '/rewards',
  },
];

const menuItemsMy = [
  {
    label: 'View on Explorer',
  },
  {
    label: 'Disconnect wallet',
  },
];

export function DropMenu({ isMobile, type }: IDropMenuMy) {
  const [showDropMenu, setShowDropMenu] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { logout, wallet } = useWalletService();
  const { isLogin } = useGetLoginStatus();
  const { explorerUrl, curChain } = useGetCmsInfo() || {};

  const menu: Array<{
    label: string;
    href?: string;
  }> = useMemo(() => {
    return type === DropMenuTypeEnum.My ? menuItemsMy : menuItems;
  }, [type]);

  const addressExploreUrl = useMemo(() => {
    return `${explorerUrl}/address/${addPrefixSuffix(wallet.address, curChain)}`;
  }, [curChain, explorerUrl, wallet.address]);

  const onClickHandler = useCallback(
    (ele: IMenuItem) => {
      setShowDropMenu(false);
      if (ele.label === 'Disconnect wallet') {
        logout();
        return;
      }
      if (ele.label === 'View on Explorer') {
        window.open(addressExploreUrl);
        return;
      }
      if (ele.href) {
        router.push(ele.href);
      }
    },
    [addressExploreUrl, logout, router],
  );

  const items = useMemo(() => {
    return menu.map((ele, idx) => ({
      label: (
        <div
          key={idx}
          className={clsx(
            'font-medium text-base px-4',
            pathName === ele.href && '!text-brandDefault',
          )}
          onClick={() => {
            onClickHandler(ele);
          }}
        >
          {ele.label}
        </div>
      ),
      key: idx + '',
    }));
  }, [menu, pathName, onClickHandler]);

  const itemsForPhone = useMemo(() => {
    return menu.map((ele, idx) => (
      <div
        key={idx}
        className={clsx(
          'font-medium text-sm px-4 py-3',
          pathName === ele.href && '!text-brandDefault',
        )}
        onClick={() => {
          onClickHandler(ele);
        }}
      >
        {ele.label}
      </div>
    ));
  }, [menu, onClickHandler, pathName]);

  const targetNode = useMemo(() => {
    if (type === DropMenuTypeEnum.My) {
      return <ConnectWallet />;
    } else {
      return <MenuIcon className="fill-brandDefault" />;
    }
  }, [type]);

  const title = useMemo(() => {
    return type === DropMenuTypeEnum.My ? 'My' : 'Menu';
  }, [type]);

  if (!isLogin && type === DropMenuTypeEnum.My) {
    return <ConnectWallet />;
  }

  return (
    <DropMenuBase
      showDropMenu={showDropMenu}
      isMobile={isMobile}
      items={items}
      itemsForPhone={itemsForPhone}
      targetNode={
        <div
          onClick={() => {
            setShowDropMenu(true);
          }}
        >
          {targetNode}
        </div>
      }
      onCloseHandler={() => setShowDropMenu(false)}
      titleTxt={title}
    ></DropMenuBase>
  );
}
