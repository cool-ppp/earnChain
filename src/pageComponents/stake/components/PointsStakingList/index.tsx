import { Button, ToolTip } from 'aelf-design';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Flex, Segmented } from 'antd';
import clsx from 'clsx';
import styles from './style.module.css';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import { formatNumber, formatTokenPrice } from 'utils/format';
import useResponsive from 'utils/useResponsive';
import { useModal } from '@ebay/nice-modal-react';
import ConfirmModal from '../../../../components/ConfirmModal';

enum ListTypeEnum {
  Staked = 'staked',
  All = 'all',
}

export function PointsStakeItem({ handleClaim }: { handleClaim: () => void }) {
  const { isLG } = useResponsive();
  return (
    <div className="rounded-[12px] lg:rounded-[24px] px-4 py-6 lg:p-6 border-[1px] border-solid border-neutralBorder bg-white">
      <Flex
        justify="space-between"
        align={isLG ? 'start' : 'center'}
        vertical={isLG ? true : false}
      >
        <span className="text-2xl font-semibold text-neutralPrimary">XPSGR-1</span>
        <span className="text-sm font-medium text-brandDefault">
          1w reward points/day :{formatTokenPrice(1899999.234324, { decimalPlaces: 2 })} SGR
        </span>
      </Flex>
      <Flex className="mt-2 text-sm font-medium" justify="space-between">
        <Flex
          className="text-neutralTertiary"
          justify="space-between"
          vertical={isLG ? true : false}
        >
          Pool reward/day:
          <span className="text-neutralPrimary">
            {formatTokenPrice(212989, { decimalPlaces: 2 })} SGR
          </span>
        </Flex>
        <Flex
          className="text-neutralTertiary"
          justify="space-between"
          vertical={isLG ? true : false}
        >
          Total staked:
          <span className="text-neutralPrimary">
            {formatTokenPrice(1899999.234324, { decimalPlaces: 2 })} SGR
          </span>
        </Flex>
      </Flex>
      <Flex gap={24} vertical={isLG ? true : false} className="mt-4">
        <Flex
          justify="space-between"
          align="center"
          className="p-4 rounded-[16px] bg-brandBg flex-auto"
        >
          <Flex vertical gap={8}>
            <span className="text-base font-medium text-neutralPrimary">Staked</span>
            <Flex gap={8} align="end">
              <span className="text-neutralTitle text-base font-medium">12,214,658</span>
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
              <span className="text-neutralTitle text-base font-medium">12,128</span>
              <span className="text-xs font-normal text-neutralPrimary">SGR</span>
            </Flex>
          </Flex>
          {/* //TODO:disabled */}
          <ToolTip title="claim">
            <Button size={isLG ? 'small' : 'medium'} type="primary" onClick={handleClaim}>
              Claim
            </Button>
          </ToolTip>
        </Flex>
      </Flex>
    </div>
  );
}

export default function PointsStakingList() {
  const [data, setData] = useState<Array<any>>([]);
  const [currentList, setCurrentList] = useState<ListTypeEnum>(ListTypeEnum.All);
  const { isLogin } = useGetLoginStatus();
  const { checkLogin } = useCheckLoginAndToken();
  const { isLG } = useResponsive();
  const confirmModal = useModal(ConfirmModal);

  const segmentedOptions: Array<{ label: ReactNode; value: string }> = [
    { label: 'All', value: ListTypeEnum.All },
    { label: 'Staked', value: ListTypeEnum.Staked },
  ];

  const handleSegmentChange = useCallback(
    (value: string) => {
      if (value === ListTypeEnum.Staked && !isLogin) {
        checkLogin({
          onSuccess: () => {
            setCurrentList(value as ListTypeEnum);
          },
        });
        return;
      }
      setCurrentList(value as ListTypeEnum);
    },
    [checkLogin, isLogin],
  );

  const handleClaim = useCallback(() => {
    confirmModal.show({
      //TODO:
      title: 'lingqujiangli',
      content: 'You will claim 24234 SGR',
      subContent: 'blalalallaalallalallalalblalalallaalallalallalal',
      confirmBtnText: 'Confirm Claim',
      onConfirm: () => {
        console.log('claim confirm');
      },
      loading: true,
    });
  }, [confirmModal]);

  useEffect(() => {
    //loading and  getData
  }, [currentList]);

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
      {/* <div className="py-10 text-center">no data</div> */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:gap-6 mt-4 lg:mt-6">
        {[1, 2, 3, 4].map((_, index) => {
          return <PointsStakeItem key={index} handleClaim={handleClaim} />;
        })}
      </div>
    </>
  );
}
