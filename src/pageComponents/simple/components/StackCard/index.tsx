import { useMemo } from 'react';
import { Button, ToolTip } from 'aelf-design';
import { Divider } from 'antd';
import Description from '../Description';
import StackToken from 'components/StackToken';
import { ZERO } from 'constants/index';
import {
  formatNumberWithDecimal,
  formatTokenAmount,
  formatTimeStr,
  formatUSDAmount,
} from 'utils/format';
import styles from './style.module.css';
import dayjs from 'dayjs';

interface IStackCardProps {
  data: IStackPoolData;
  isLogin: boolean;
  onClaim?: () => void;
  onWithdraw?: () => void;
  onAdd?: () => void;
  onUnstack?: () => void;
  onStack?: () => void;
  onUpdate?: () => void;
}

export default function StackCard({ data, isLogin, onStack }: IStackCardProps) {
  const {
    poolId,
    poolName,
    projectOwner,
    aprMax,
    aprMin,
    earnedSymbol,
    totalStake,
    totalStakeInUsd,
    stakeSymbol,
    earned,
    earnedInUsd,
    staked,
    stakedInUsD,
    unlockTime,
    stakeApr,
  } = data;

  const showStackInfo = useMemo(() => !!data?.earned, [data?.earned]);

  const aprRange = useMemo(() => {
    if (!aprMin || !aprMax) return '--';
    return `${formatNumberWithDecimal(aprMin)}% ~ ${formatNumberWithDecimal(aprMax)}%`;
  }, [aprMax, aprMin]);

  const canClaim = useMemo(() => ZERO.plus(data?.earned || '').gte(0), [data?.earned]);

  const claimTip = useMemo(() => (canClaim ? 'can not claim' : ''), [canClaim]);

  const isUnstacked = useMemo(
    () => !!data?.unlockTime && Date.now() - data?.unlockTime > 0,
    [data?.unlockTime],
  );
  const unStackTip = useMemo(
    () => (!isUnstacked ? 'The number of rewards included' : ''),
    [isUnstacked],
  );

  return (
    <div className="stack-card flex flex-col gap-6 px-8 py-8 rounded-xl border border-solid border-neutralDivider bg-neutralWhiteBg">
      <div className="flex justify-between">
        <StackToken
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          tokenName={stakeSymbol || '--'}
          projectName={projectOwner || '--'}
        />
        <Description
          label={stakeSymbol || '--'}
          value={aprRange}
          tip={`According to the different pledge cycle, the APR range
                obtained, qualityThe higher the bet period, the higher
              the APR`}
        />
        <Description label="Earn" value={earnedSymbol || '--'} />
        <Description
          label="Total Staking"
          value={formatNumberWithDecimal(totalStake || 0)}
          extra={`$ ${formatNumberWithDecimal(totalStakeInUsd || 0)}`}
        />
        {!showStackInfo && (
          <Button className="w-[182px] self-center" type="primary" onClick={onStack}>
            {isLogin ? 'Stack' : 'Connect Wallet'}
          </Button>
        )}
      </div>
      {showStackInfo && (
        <div className="relative flex justify-between bg-brandBg px-24 py-14 gap-24 rounded-xl">
          <div className={styles['apr-tag']}>
            <span className={styles['apr-text']}>
              APR: {formatNumberWithDecimal(stakeApr || '') || '--'}%
            </span>
          </div>
          <div className="flex flex-col flex-1 gap-8">
            <div className="flex flex-col justify-between h-full gap-2">
              <div className="text-base text-neutralSecondary font-medium">
                <span>Earned</span>
                <span className="ml-2 text-sm">{earnedSymbol}</span>
              </div>
              <div className="text-base font-semibold text-neutralTitle">
                {formatTokenAmount(earned || 0)}
              </div>
              <div className="text-sm font-medium text-neutralTitle">
                {formatUSDAmount(earnedInUsd || 0)}
              </div>
            </div>
            <ToolTip title={claimTip}>
              <Button className="w-[112px]" type="primary" ghost size="medium" disabled={!canClaim}>
                Claim
              </Button>
            </ToolTip>
          </div>
          <Divider type="vertical" className="h-[inherit]" />
          <div className="flex flex-col flex-1 gap-8">
            <div className="flex flex-col justify-between h-full gap-2">
              <div className="text-base text-neutralSecondary font-medium">Stacked</div>
              <div className="text-base font-semibold text-neutralTitle flex-grow-0">
                <ToolTip title="The number of rewards included">
                  <span>{formatNumberWithDecimal(staked || 0)}</span>
                </ToolTip>
              </div>
              <div className="text-sm font-medium text-neutralTitle">
                $ {formatNumberWithDecimal(stakedInUsD || 0)}
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="w-[112px]" type="primary" size="medium">
                Add Stack
              </Button>
              <ToolTip title={unStackTip}>
                <Button className="w-[112px]" size="medium" disabled={!isUnstacked}>
                  Unstack
                </Button>
              </ToolTip>
            </div>
          </div>
          <Divider type="vertical" className="h-[inherit]" />
          <div className="flex flex-col flex-1 gap-8">
            <div className="flex flex-col justify-between h-full gap-2">
              <div className="text-base text-neutralSecondary font-medium">
                Remaining lock duration
              </div>
              <div className="text-base font-semibold text-neutralTitle">
                {formatTimeStr(unlockTime || '')}
              </div>
              <div className="text-sm font-medium text-neutralDisable">
                unlocked by {dayjs(unlockTime).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
            <Button className="w-[138px]" type="primary" size="medium" disabled={isUnstacked}>
              Extended lock
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
