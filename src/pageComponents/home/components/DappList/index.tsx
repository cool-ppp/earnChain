import { Button, Table } from 'aelf-design';
import { TableColumnsType } from 'antd/lib';
import Link from 'next/link';
import { formatNumber } from 'utils/format';
import { RightOutlined } from '@ant-design/icons';
import useResponsive from 'utils/useResponsive';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useRouter } from 'next/navigation';
import { useCheckLoginAndToken } from 'hooks/useWallet';

export default function DappList() {
  const { isMD } = useResponsive();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const { isLogin } = useGetLoginStatus();
  const router = useRouter();
  const { checkLogin } = useCheckLoginAndToken();

  useEffect(() => {
    setDataSource([
      {
        dappName: 'Schrödinger',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Schrodinger.png',
        link: 'https://schrodingernft.ai',
        supportsApply: true,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'ewell',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Ewell.png',
        link: 'https://ewell.finance/',
        points: '12345678',
        address: '12345678',
        supportsApply: false,
      },
      {
        dappName: 'AwakenSwap',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Awaken.png',
        link: 'https://awaken.finance/',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'Portkey',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Portkey.png',
        link: 'https://portkey.finance/',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'eBridge',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/eBrige.png',
        link: 'https://ebridge.exchange/',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'Forest',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Forest.png',
        category: 'NFT',
        link: 'https://eforest.finance/',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'BeanGo Town',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/BeanGoTown.png',
        link: 'https://www.beangotown.com/',
        secondLevelDomain: '',
        firstLevelDomain: '',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'Symbol Market',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/TSM.png',
        link: 'https://symbolmarket.io/',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
      {
        dappName: 'ETransfer',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/ETransfer.png',
        link: 'https://etransfer.exchange',
        supportsApply: false,
        points: '12345678',
        address: '12345678',
      },
    ]);
  }, []);

  const handleClick = (item: any) => {
    window.open(item.link);
  };

  const handleStake = useCallback(
    (item: any) => {
      const stakeUrl = `/stake/${encodeURI(item.dappName)}`;
      if (!isLogin) {
        checkLogin({
          onSuccess: () => {
            router.push(stakeUrl);
          },
        });
        return;
      }
      router.push(stakeUrl);
    },
    [checkLogin, isLogin, router],
  );

  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'dappName',
      width: 360,
      render: (text: string, item) => {
        return (
          <div className="flex items-center gap-x-4">
            {!item.icon ? null : (
              <img
                onClick={() => {
                  handleClick(item);
                }}
                className="w-8 h-8 md:w-16 md:h-16 rounded-md cursor-pointer"
                width={64}
                height={64}
                alt="logo"
                src={item.icon}
              />
            )}
            <span
              className="text-sm font-medium md:text-base text-neutralTitle cursor-pointer"
              onClick={() => {
                handleClick(item);
              }}
            >
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Points',
      key: 'Points',
      dataIndex: 'points',
      responsive: ['md'],
      width: 360,
      render: (text: string) => {
        return (
          <span className="font-medium text-base text-neutralTitle">{formatNumber(text)}</span>
        );
      },
    },
    {
      title: 'Staking Address',
      key: 'address',
      dataIndex: 'address',
      responsive: ['md'],
      width: 360,
      render: (text: string) => {
        return (
          <span className="font-medium text-base text-neutralTitle">{formatNumber(text)}</span>
        );
      },
    },
    {
      title: 'Interaction',
      key: 'Interaction',
      dataIndex: 'Interaction',
      render: (_, item) => {
        return (
          <div className="flex items-center gap-x-4 md:gap-x-12">
            <Link
              href={`/stake/${encodeURI(item.dappName)}`}
              onClick={(e) => {
                e.preventDefault();
                handleStake(item);
              }}
            >
              <Button
                type="primary"
                disabled={!item.supportsApply}
                className="w-[98px] md:w-[136px]"
                size={isMD ? 'small' : 'medium'}
              >
                {item.supportsApply ? 'Stake' : 'Coming Soon'}
              </Button>
            </Link>
            <Button
              type="link"
              disabled={!item.supportsApply}
              className="!px-0"
              size={isMD ? 'small' : 'medium'}
              onClick={() => {
                // window.open(item.link, '_blank');
              }}
            >
              <span
                className={clsx(
                  'text-brandDefault hover:text-brandHover',
                  !item.supportsApply && 'text-brandDisable',
                )}
              >
                {isMD ? 'Gain' : 'Gain points'}
              </span>
              <RightOutlined
                className={clsx(
                  'w-4 h-4 text-brandDefault ml-1 md:ml-4',
                  !item.supportsApply && 'text-brandDisable',
                )}
                width={20}
                height={20}
              />
            </Button>
          </div>
        );
      },
    },
  ];
  return <Table columns={columns} rowKey={'Name'} dataSource={dataSource} />;
}
