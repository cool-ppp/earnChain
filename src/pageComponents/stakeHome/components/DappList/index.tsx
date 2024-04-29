import { Button, Table } from 'aelf-design';
import { TableColumnsType } from 'antd/lib';
import Link from 'next/link';
import { formatNumber } from 'utils/format';
import { RightOutlined } from '@ant-design/icons';
import useResponsive from 'utils/useResponsive';
import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useRouter } from 'next/navigation';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import { useModal } from '@ebay/nice-modal-react';
import GetPointsModal, { IPointsModalProps } from '../GetPointsModal';
import useGetCmsInfo from 'redux/hooks/useGetCmsInfo';

export default function DappList({
  items,
  loading,
}: {
  items: Array<IStakingItem>;
  loading: boolean;
}) {
  const { isMD, isLG } = useResponsive();
  const [dataSource, setDataSource] = useState<Array<IStakingItem>>([]);
  const { isLogin } = useGetLoginStatus();
  const router = useRouter();
  const { checkLogin } = useCheckLoginAndToken();
  const getPointsModal = useModal(GetPointsModal);
  const { schrodingerGainPointsRule, schrodingerUrl } = useGetCmsInfo() || {};

  useEffect(() => {
    setDataSource([
      {
        dappName: 'Schrödinger',
        projectOwner: 'Schrödinger11',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Schrodinger.png',
        isOpenStake: true,
        tvl: 12345678,
        stakingAddress: 12345678,
      },
      {
        dappName: 'Schrödinger',
        projectOwner: 'Schrödinger11',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Schrodinger.png',
        isOpenStake: false,
        tvl: 12345678,
        stakingAddress: 12345678,
      },
    ]);
  }, []);

  const handleClick = useCallback(
    (item: IStakingItem) => {
      if (item.dappName === 'Schrödinger') {
        window.open(schrodingerUrl || '');
      }
    },
    [schrodingerUrl],
  );

  const handleStake = useCallback(
    (item: IStakingItem) => {
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

  const handleGainPoints = useCallback(
    (item: IStakingItem) => {
      const params: IPointsModalProps = {
        name: item.dappName,
        desc: item.projectOwner,
        icon: item.icon,
        handleConfirm: () => {
          handleClick(item);
        },
      };
      if (item.dappName === 'Schrödinger') {
        params.rulesContent = schrodingerGainPointsRule;
      }
      getPointsModal.show(params);
    },
    [getPointsModal, handleClick, schrodingerGainPointsRule],
  );

  const columns: TableColumnsType<IStakingItem> = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'dappName',
        dataIndex: 'dappName',
        width: isLG ? 'auto' : 360,
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
        key: 'tvl',
        dataIndex: 'tvl',
        width: isLG ? 'auto' : 330,
        // responsive: ['md'],
        render: (text: string) => {
          return (
            <span className="font-medium text-base text-neutralTitle">{formatNumber(text)}</span>
          );
        },
      },
      {
        title: 'Staking Address',
        key: 'stakingAddress',
        dataIndex: 'stakingAddress',
        width: isLG ? 'auto' : 330,
        // responsive: ['md'],
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
        width: 'auto',
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
                  disabled={!item.isOpenStake}
                  className="w-[98px] md:w-[136px]"
                  size={isMD ? 'small' : 'medium'}
                >
                  {item.isOpenStake ? 'Stake' : 'Coming Soon'}
                </Button>
              </Link>
              <Button
                type="link"
                disabled={!item.isOpenStake}
                className="!px-0"
                size={isMD ? 'small' : 'medium'}
                onClick={() => {
                  handleGainPoints(item);
                }}
              >
                <span
                  className={clsx(
                    'text-brandDefault hover:text-brandHover',
                    !item.isOpenStake && 'text-brandDisable',
                  )}
                >
                  {isMD ? 'Gain' : 'Gain points'}
                </span>
                <RightOutlined
                  className={clsx(
                    'w-4 h-4 text-brandDefault ml-1 md:ml-4',
                    !item.isOpenStake && 'text-brandDisable',
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
  }, [handleClick, handleGainPoints, handleStake, isLG, isMD]);

  return (
    <Table
      columns={columns}
      rowKey={'dappName'}
      dataSource={items || dataSource}
      loading={loading}
      scroll={{ x: 'max-content' }}
    />
  );
}
