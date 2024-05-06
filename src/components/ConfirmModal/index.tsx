import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button } from 'aelf-design';
import { Flex } from 'antd';
import CommonModal from 'components/CommonModal';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { formatTokenPrice } from 'utils/format';
import useResponsive from 'utils/useResponsive';
import { ReactComponent as SuccessIcon } from 'assets/img/result-success-icon.svg';
import { ReactComponent as ErrorIcon } from 'assets/img/result-error-icon.svg';
import { ExportOutlined } from '@ant-design/icons';

export enum ConfirmModalTypeEnum {
  Claim = 'claim',
  Stake = 'stake',
  UnLock = 'unLock',
  ExtendedLockup = 'extendedLockup',
}

interface IClaimContent {
  amount: number;
}

interface IExtendedLockupContent {
  days: number;
  oldDateTimeStamp: string | number;
  newDateTimeStamp: string | number;
}

interface IStakeContent {
  oldAmount?: number;
  amount: number;
  unlockDateTimeStamp: string | number;
}

interface IUnLockContent {
  amountFromWallet?: number;
  amountFromStake?: number;
  withdrawAmount?: number;
}

type ContentByType<T extends ConfirmModalTypeEnum> = T extends ConfirmModalTypeEnum.Claim
  ? IClaimContent
  : T extends ConfirmModalTypeEnum.ExtendedLockup
  ? IExtendedLockupContent
  : T extends ConfirmModalTypeEnum.Stake
  ? IStakeContent
  : T extends ConfirmModalTypeEnum.UnLock
  ? IUnLockContent
  : never;

export interface IConfirmModalProps<T extends ConfirmModalTypeEnum> {
  type: T;
  onConfirm: () => void;
  loading: boolean;
  content: ContentByType<T>;
  status: 'normal' | 'success' | 'error';
  onClose: () => void;
  transactionId?: string;
}

function ConfirmModal(props: IConfirmModalProps<ConfirmModalTypeEnum>) {
  const { content, onConfirm, loading, type, status, onClose, transactionId } = props;
  const modal = useModal();
  const { isLG } = useResponsive();

  const renderTitle = useMemo(() => {
    if (status === 'success') {
      return 'Transaction sent';
    } else if (status === 'error') {
      return 'Failure to confirm a transaction';
    }
    if (type === ConfirmModalTypeEnum.Claim) {
      return 'Claim';
    } else if (type === ConfirmModalTypeEnum.Stake) {
      if ((content as IStakeContent).oldAmount) {
        return 'Add';
      } else {
        return 'Stake';
      }
    } else if (type === ConfirmModalTypeEnum.ExtendedLockup) {
      return 'Extended lock-up';
    } else if (type === ConfirmModalTypeEnum.UnLock) {
      if ((content as IUnLockContent).withdrawAmount) {
        return 'Unlock and Claim';
      } else {
        return 'Unlock';
      }
    }
  }, [content, status, type]);

  const renderResult = useMemo(() => {
    return (
      <Flex vertical gap={8} className="text-center" align="center">
        {status === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        <div className="text-xl font-medium text-neutralPrimary mt-6">
          {status === 'success'
            ? 'Transaction sent, waiting for on-chain confirmation'
            : 'Wallet confirmation transaction failed'}
        </div>
        {status === 'success' && (
          <div className="text-sm font-normal text-neutralSecondary">
            In on-chain transaction packaging, there is a delay in updating data
          </div>
        )}
      </Flex>
    );
  }, [status]);

  const renderContent = useMemo(() => {
    if (status !== 'normal') {
      return renderResult;
    }
    if (type === ConfirmModalTypeEnum.Claim) {
      return (
        <Flex className="text-center" gap={16} vertical>
          <div className="text-xl font-medium text-neutralTitle">You will claim </div>
          <div className="text-4xl font-semibold text-neutralPrimary">
            {formatTokenPrice((content as IClaimContent).amount, { decimalPlaces: 2 })} SGR
          </div>
          <div className="text-sm font-normal text-neutralSecondary">
            The rewards you receive need to wait for 24h to withdraw, and will appear on the rewards
            page after the rewards are collected
          </div>
        </Flex>
      );
    } else if (type === ConfirmModalTypeEnum.Stake) {
      return (
        <Flex className="text-center" gap={16} vertical>
          <div className="text-xl font-medium text-neutralTitle">{`You will ${
            (content as IStakeContent).oldAmount ? 'add stake' : 'Stake'
          }`}</div>
          <div className="text-4xl font-semibold text-neutralPrimary">
            {formatTokenPrice((content as IStakeContent).amount, { decimalPlaces: 2 })} SGR
          </div>
          <Flex
            vertical
            className="w-full gap-2 mt-10 py-3 border-t-[1px] border-x-0 border-b-0 border-solid border-neutralBorder"
          >
            <Flex justify="space-between">
              <span>Staking amount</span>
              <span>{`${formatTokenPrice((content as IStakeContent).oldAmount || 0, {
                decimalPlaces: 2,
              })} -> ${formatTokenPrice((content as IStakeContent).amount, {
                decimalPlaces: 2,
              })}`}</span>
            </Flex>
            <Flex justify="space-between">
              <span>Unlock date</span>
              <span>
                {dayjs(Number((content as IStakeContent).unlockDateTimeStamp)).format(
                  'YYYY.MM.DD HH:mm',
                )}
              </span>
            </Flex>
          </Flex>
        </Flex>
      );
    } else if (type === ConfirmModalTypeEnum.ExtendedLockup) {
      return (
        <Flex className="text-center" gap={16} vertical>
          <div className="text-xl font-medium text-neutralTitle">
            You will extend the lockup period by {(content as IExtendedLockupContent).days} days
          </div>
          <Flex
            vertical
            className="w-full gap-2 mt-10 py-3 border-t-[1px] border-x-0 border-b-0 border-solid border-neutralBorder"
          >
            <Flex justify="space-between">
              <span>Original unlock date</span>
              <span>
                {dayjs(Number((content as IExtendedLockupContent).oldDateTimeStamp)).format(
                  'YYYY.MM.DD HH:mm',
                )}
              </span>
            </Flex>
            <Flex justify="space-between">
              <span>New unlock date</span>
              <span>
                {dayjs(Number((content as IExtendedLockupContent).newDateTimeStamp)).format(
                  'YYYY.MM.DD HH:mm',
                )}
              </span>
            </Flex>
          </Flex>
        </Flex>
      );
    } else if (type === ConfirmModalTypeEnum.UnLock) {
      return (
        <Flex className="text-center" gap={16} vertical>
          <div className="text-xl font-medium text-neutralTitle">You will unlock</div>
          <div className="text-4xl font-semibold text-neutralPrimary">
            {formatTokenPrice(
              ((content as IUnLockContent).amountFromStake || 0) +
                ((content as IUnLockContent).amountFromWallet || 0),
              { decimalPlaces: 2 },
            )}{' '}
            SGR
          </div>
          {(content as IUnLockContent).amountFromWallet &&
            (content as IUnLockContent).amountFromStake && (
              <>
                <div className="text-sm font-normal text-neutralPrimary">
                  Unlock principal{' '}
                  {formatTokenPrice((content as IUnLockContent).amountFromWallet || 0, {
                    decimalPlaces: 2,
                  })}{' '}
                  SGR and reward{' '}
                  {formatTokenPrice((content as IUnLockContent).amountFromStake || 0, {
                    decimalPlaces: 2,
                  })}{' '}
                  SGR
                </div>
              </>
            )}
          {(content as IUnLockContent).amountFromStake && (
            <div className="text-sm font-normal mt-4 text-neutralSecondary">
              The unlocked amount is your pledged SGR reward, which will not be withdrawn to the
              wallet and will appear on the rewards page after unlocking
            </div>
          )}
        </Flex>
      );
    }
  }, [content, renderResult, status, type]);

  const handleClose = useCallback(() => {
    if (status !== 'normal') {
      onClose?.();
    }
    modal.hide();
  }, [modal, onClose, status]);

  const handleConfirm = useCallback(() => {
    if (status === 'normal') {
      onConfirm?.();
    } else {
      handleClose();
    }
  }, [handleClose, onConfirm, status]);

  const renderConfirmBtnText = useMemo(() => {
    if (status !== 'normal') {
      return 'Close';
    }
    if (loading) {
      return 'Signing';
    } else {
      return 'Confirm';
    }
  }, [loading, status]);

  const renderFooter = useMemo(() => {
    return (
      <div className="flex flex-col text-center w-full">
        <div className="lg:px-8 mx-auto w-full flex justify-center">
          <Button type="primary" block={isLG} onClick={handleConfirm} loading={loading}>
            {renderConfirmBtnText}
          </Button>
        </div>
        {status === 'normal' &&
          type === ConfirmModalTypeEnum.UnLock &&
          (content as IUnLockContent).withdrawAmount && (
            <Flex
              className="mt-6 text-sm font-normal text-neutralSecondary lg:px-8 px-4"
              gap={8}
              vertical
            >
              <span>
                Upon cancellation of stake, {(content as IUnLockContent).withdrawAmount} SGR pledge
                reward will be automatically claim at the same time.
              </span>
              <span>
                The rewards you receive need to wait for 24h to withdraw, and will appear on the
                rewards page after the rewards are collected
              </span>
            </Flex>
          )}
        {status === 'success' && transactionId && (
          <Button
            className="!text-[var(--neutral-secondary)] mt-2 font-medium hover:!text-[var(--neutral-secondary)] active:!text-[var(--neutral-secondary)] !p-0 !h-fit"
            type="link"
            size="small"
            onClick={() => {
              console.log('transactionId', transactionId);
            }}
          >
            <ExportOutlined />
            <span>View on Explorer</span>
          </Button>
        )}
      </div>
    );
  }, [content, handleConfirm, isLG, loading, renderConfirmBtnText, status, transactionId, type]);

  return (
    <CommonModal
      open={modal.visible}
      onCancel={handleClose}
      width={580}
      title={renderTitle}
      footer={renderFooter}
    >
      {renderContent}
    </CommonModal>
  );
}

export default NiceModal.create(ConfirmModal);
