import { Button, ToolTip } from 'aelf-design';
import { ReactNode, useCallback, useMemo } from 'react';
import { Flex, Segmented } from 'antd';
import { ReactComponent as QuestionIconComp } from 'assets/img/questionCircleOutlined.svg';
import clsx from 'clsx';
import styles from './style.module.css';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import { formatTokenPrice } from 'utils/format';
import useResponsive from 'utils/useResponsive';
import { useModal } from '@ebay/nice-modal-react';
import ConfirmModal from '../../../../components/ConfirmModal';
import { showTradeResTip } from 'utils/notification';
import usePointsPoolService, {
  ListTypeEnum,
} from 'pageComponents/stake/hooks/usePointsPoolService';

export function PointsStakeItem({ item }: { item: IPointsPoolItem }) {
  const { isLG } = useResponsive();
  const confirmModal = useModal(ConfirmModal);

  const handleClaim = useCallback(() => {
    confirmModal.show({
      title: 'lingqujiangli',
      content: `You will claim ${item.earned} SGR`,
      subContent: 'blalalallaalallalallalalblalalallaalallalallalal',
      confirmBtnText: 'Confirm Claim',
      onConfirm: () => {
        showTradeResTip({
          status: 'error',
          message: 'errorerrorerrorerror',
        });
      },
      loading: false,
    });
  }, [confirmModal, item.earned]);

  const dailyRewards = useMemo(() => {
    return formatTokenPrice(item.dailyRewards, { decimalPlaces: 2 });
  }, [item.dailyRewards]);

  const poolDailyRewards = useMemo(() => {
    return formatTokenPrice(item.poolDailyRewards, { decimalPlaces: 2 });
  }, [item.poolDailyRewards]);

  const totalStake = useMemo(() => {
    return formatTokenPrice(item.totalStake, { decimalPlaces: 2 });
  }, [item.totalStake]);

  const staked = useMemo(() => {
    return formatTokenPrice(item.staked, { decimalPlaces: 2 });
  }, [item.staked]);

  const earned = useMemo(() => {
    return formatTokenPrice(item.earned, { decimalPlaces: 2 });
  }, [item.earned]);

  const claimDisabled = useMemo(() => {
    return item.earned === 0;
  }, [item.earned]);

  return (
    <div className="rounded-[12px] lg:rounded-[24px] px-4 py-6 lg:p-6 border-[1px] border-solid border-neutralBorder bg-white">
      <Flex
        justify="space-between"
        align={isLG ? 'start' : 'center'}
        vertical={isLG ? true : false}
      >
        <span className="text-2xl font-semibold text-neutralPrimary">{item.poolName}</span>
        <Flex align="center">
          <span className="text-sm font-medium text-brandDefault">
            1w reward points/day : {dailyRewards} SGR
          </span>
          <ToolTip title="aaaaa">
            <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
          </ToolTip>
        </Flex>
      </Flex>
      <Flex className="mt-2 text-sm font-medium" justify="space-between">
        <Flex
          className="text-neutralTertiary"
          justify="space-between"
          gap={isLG ? 0 : 8}
          vertical={isLG ? true : false}
        >
          Pool reward/day:
          <span className="text-neutralPrimary">{poolDailyRewards} SGR</span>
        </Flex>
        <Flex
          className="text-neutralTertiary"
          justify="space-between"
          align="end"
          vertical={isLG ? true : false}
          gap={isLG ? 0 : 8}
        >
          Total staked:
          <span className="text-neutralPrimary">{totalStake}</span>
        </Flex>
      </Flex>
      <Flex gap={24} vertical={isLG ? true : false} className="mt-4">
        <Flex
          justify="space-between"
          align="center"
          className="p-4 rounded-[16px] bg-brandBg flex-auto"
        >
          <Flex vertical gap={8}>
            <Flex align="center">
              <span className="text-base font-medium text-neutralPrimary">Staked</span>
              <ToolTip title="aaaaa">
                <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
              </ToolTip>
            </Flex>
            <Flex gap={8} align="end">
              <span className="text-neutralTitle text-base font-medium">{staked}</span>
              <span className="text-xs font-normal text-neutralPrimary">XPSGR-1</span>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          className="p-4 rounded-[16px] bg-brandBg flex-auto"
        >
          <Flex vertical gap={8}>
            <span className="text-base font-medium text-neutralPrimary">Earned</span>
            <Flex gap={8} align="end">
              <span className="text-neutralTitle text-base font-medium">{earned}</span>
              <span className="text-xs font-normal text-neutralPrimary">SGR</span>
            </Flex>
          </Flex>
          <ToolTip title={claimDisabled ? 'claim' : undefined}>
            <Button
              size={isLG ? 'small' : 'medium'}
              type="primary"
              onClick={handleClaim}
              disabled={claimDisabled}
            >
              Claim
            </Button>
          </ToolTip>
        </Flex>
      </Flex>
    </div>
  );
}

export default function PointsStakingList() {
  const { currentList, setCurrentList, data, fetchData } = usePointsPoolService();
  const { isLogin } = useGetLoginStatus();
  const { checkLogin } = useCheckLoginAndToken();
  const { isLG } = useResponsive();

  const segmentedOptions: Array<{ label: ReactNode; value: string }> = [
    { label: 'All', value: ListTypeEnum.All },
    { label: 'Staked', value: ListTypeEnum.Staked },
  ];

  const handleSegmentChange = useCallback(
    (value: string) => {
      setCurrentList(value as ListTypeEnum);
    },
    [setCurrentList],
  );

  const mockData = [
    {
      poolName: 'XPSGR-1',
      dailyRewards: 100,
      poolDailyRewards: 100,
      totalStake: 12,
      surplusStake: 10,
      earned: 10,
      staked: 10,
    },
  ];

  return (
    <>
      <Segmented
        className={clsx('mt-6 lg:mt-12', styles.segmented)}
        size="large"
        value={currentList}
        defaultValue={ListTypeEnum.All}
        onChange={handleSegmentChange}
        options={segmentedOptions}
        block={isLG ? true : false}
      />

      {!isLogin && currentList === ListTypeEnum.Staked ? (
        <div className="py-[200px] rounded-lg bg-neutralWhiteBg flex justify-center items-center gap-2  mt-4 lg:mt-6">
          <span>.....</span>
          <Button
            type="primary"
            size="medium"
            onClick={() => {
              checkLogin({
                onSuccess: () => {
                  fetchData();
                },
              });
            }}
          >
            Connect Wallet
          </Button>
        </div>
      ) : (data || mockData)?.length && (data || mockData).length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:gap-6 mt-4 lg:mt-6">
          {(data || mockData).map((item, index) => {
            return <PointsStakeItem key={index} item={item} />;
          })}
        </div>
      ) : (
        <div className="py-[200px] rounded-lg bg-neutralWhiteBg flex justify-center items-center mt-4 lg:mt-6">
          no data
        </div>
      )}
    </>
  );
}
