import { useMemo, useCallback, useState, useEffect } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from 'components/CommonModal';
import { Button, Typography, FontWeightEnum } from 'aelf-design';
import InputNumberBase from 'components/InputNumberBase';
import DaysSelect from 'components/DaysSelect';
import ViewItem from 'components/ViewItem';
import { Form, Divider, Checkbox } from 'antd';
import { ZERO, DEFAULT_DATE_FORMAT } from 'constants/index';
import { MIN_STAKE_AMOUNT, MIN_STAKE_PERIOD, MAX_STAKE_PERIOD } from 'constants/stake';
import { RightOutlined } from '@ant-design/icons';
import style from './style.module.css';
import dayjs from 'dayjs';
import { StakeType } from 'types/stack';
import { formatNumberWithDecimal } from 'utils/format';
import clsx from 'clsx';
import { singleMessage } from '@portkey/did-ui-react';

const FormItem = Form.Item;
const { Title, Text } = Typography;

interface IStackModalProps {
  type?: StakeType;
  balance?: string;
  min?: number; // min balance
  stakeData: IStakePoolData;
  onConfirm?: (amount: string, period: string) => void;
  onClose?: () => void;
}

function StackModal({
  type = StakeType.STAKE,
  balance,
  min = MIN_STAKE_AMOUNT,
  stakeData,
  onClose,
  onConfirm,
}: IStackModalProps) {
  const { stakeSymbol, staked, unlockTime, stakeApr } = stakeData;
  const modal = useModal();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [period, setPeriod] = useState('');
  const [apr, setApr] = useState<string>('');

  const typeIsExtend = useMemo(() => type === StakeType.EXTEND, [type]);
  const typeIsStake = useMemo(() => type === StakeType.STAKE, [type]);
  const typeIsAdd = useMemo(() => type === StakeType.ADD, [type]);

  const [isExtend, setIsExtend] = useState(typeIsExtend);
  const [amountValid, setAmountValid] = useState(typeIsExtend);
  const [periodValid, setPeriodValid] = useState(typeIsAdd);

  const btnDisabled = useMemo(() => !amountValid || !periodValid, [amountValid, periodValid]);

  const title = useMemo(() => {
    switch (type) {
      case StakeType.STAKE:
        return `Stake ${stakeSymbol}`;
      case StakeType.ADD:
        return `Add Stake ${stakeSymbol}`;
      case StakeType.EXTEND:
        return 'Extend lock duration';
      default:
        return '';
    }
  }, [stakeSymbol, type]);

  const amountStr = useMemo(() => {
    let _amount;
    const amountStr = amount.replace(',', '');
    if (typeIsStake) {
      _amount = amountStr;
    } else if (typeIsAdd) {
      _amount = ZERO.plus(staked ?? '').plus(amountStr);
      _amount.isNaN() && (_amount = '');
    } else {
      _amount = staked ?? '';
    }
    console.log('_amount', _amount);
    return formatNumberWithDecimal(_amount) || '--';
  }, [amount, staked, typeIsAdd, typeIsStake]);

  const originAmountStr = useMemo(
    () => (typeIsAdd ? formatNumberWithDecimal(staked ?? '') : ''),
    [staked, typeIsAdd],
  );

  const remainingTime = useMemo(() => {
    if (!unlockTime) return '';
    const current = dayjs();
    const targetTime = dayjs(unlockTime);
    const durationTime = dayjs.duration(targetTime.diff(current));
    const days = durationTime.asDays();
    // const hours = durationTime.asHours();
    // const hoursToDay = ZERO.plus(hours).div(24);
    console.log('remainingTime', days, ZERO.plus(days).toFixed());
    return ZERO.plus(days).toFixed();
  }, [unlockTime]);

  const remainingTimeFormatStr = useMemo(() => {
    if (!remainingTime) return '--';
    if (ZERO.plus(remainingTime).lt(0.1)) return '< 0.1 Days';

    return ZERO.plus(remainingTime).toFixed(1) + 'Days';
  }, [remainingTime]);

  const originPeriodStr = useMemo(
    () => (isExtend ? remainingTimeFormatStr : ''),
    [isExtend, remainingTimeFormatStr],
  );

  const periodStr = useMemo(() => {
    if (typeIsAdd && !isExtend) return remainingTimeFormatStr;
    if (!period) return '--';
    if (isExtend) {
      return remainingTime
        ? `${formatNumberWithDecimal(ZERO.plus(remainingTime).plus(period), 1)} Days`
        : '--';
    }
    return `${period} Days`;
  }, [isExtend, period, remainingTime, remainingTimeFormatStr, typeIsAdd]);

  const originAPRStr = useMemo(
    () => (!typeIsStake ? `${stakeApr}%(3.00x)` : ''),
    [stakeApr, typeIsStake],
  );

  const getAPR = useCallback(async () => {
    // if (typeIsStake) return setApr(stakeApr ?? '--');
    const res = await Promise.resolve('1.44');
    setApr(res);
  }, []);

  // useEffect(() => {
  //   getAPR();
  // }, [getAPR, amount, period]);

  const aprStr = useMemo(() => (apr ? `${apr}%(1.22x)` : '--'), [apr]);

  const originReleaseDateStr = useMemo(() => {
    if (!unlockTime) return '--';
    return dayjs(unlockTime).format(DEFAULT_DATE_FORMAT);
  }, [unlockTime]);

  const releaseDateStr = useMemo(() => {
    if (typeIsAdd && !isExtend) return originReleaseDateStr;
    if (!period) return '--';
    if (isExtend && unlockTime) {
      return dayjs(unlockTime).add(+period, 'day').format(DEFAULT_DATE_FORMAT);
    }
    if (typeIsStake) {
      return dayjs().add(+period, 'day').format(DEFAULT_DATE_FORMAT);
    }

    return '--';
  }, [isExtend, originReleaseDateStr, period, typeIsAdd, typeIsStake, unlockTime]);

  const maxDuration = useMemo(() => {
    if (typeIsStake) return MAX_STAKE_PERIOD;
    return ZERO.plus(MAX_STAKE_PERIOD).minus(remainingTime).toFixed(0);
  }, [remainingTime, typeIsStake]);

  const minDuration = useMemo(() => (typeIsStake ? MIN_STAKE_PERIOD : 0), [typeIsStake]);

  const stakeLabel = useMemo(() => {
    const _balance = typeIsExtend ? staked : balance;
    return (
      <div className="flex justify-between text-base w-full">
        <span>Stack amount</span>
        <span className={clsx('text-neutralTertiary', typeIsExtend && 'text-neutralTitle mb-6')}>
          {!typeIsExtend ? 'May pledge: ' : ''}
          {formatNumberWithDecimal(_balance || '0')}
        </span>
      </div>
    );
  }, [balance, staked, typeIsExtend]);

  const onExtendChange = useCallback(() => {
    setIsExtend(!isExtend);
    setPeriod('');
    setPeriodValid(isExtend);
    form.resetFields(['period']);
  }, [form, isExtend]);

  const durationLabel = useMemo(() => {
    return (
      <>
        {type === StakeType.ADD ? (
          <div className="flex items-center">
            <Checkbox checked={isExtend} onChange={onExtendChange} />
            <span className="text-base ml-2">Extend Lock Duration</span>
          </div>
        ) : (
          'Lock duration'
        )}
      </>
    );
  }, [isExtend, onExtendChange, type]);

  const disabledDurationInput = useMemo(() => typeIsAdd && !isExtend, [isExtend, typeIsAdd]);

  const onStack = useCallback(async () => form.submit(), [form]);

  const footer = useMemo(() => {
    return (
      <Button
        className="round-lg w-[260px]"
        disabled={btnDisabled}
        type="primary"
        loading={loading}
        onClick={onStack}
      >
        {typeIsAdd ? 'Add Stack' : 'Stake'}
      </Button>
    );
  }, [btnDisabled, loading, onStack, typeIsAdd]);

  const onCancel = useCallback(() => {
    if (onClose) return onClose();
    modal.hide();
  }, [modal, onClose]);

  const getMaxAmount = useCallback(() => {
    console.log('getMaxAmount');
    let max = '';

    if (ZERO.plus(balance || '0').eq('0')) return;

    if (typeIsAdd && balance && staked) {
      max = ZERO.plus(balance).minus(staked).toFixed();
    }

    if (typeIsStake && balance) {
      max = ZERO.plus(balance).toFixed();
    }

    if (!max) return;
    const maxStr = formatNumberWithDecimal(max);
    form.setFieldValue('amount', maxStr);
    setAmount(maxStr);
  }, [balance, form, staked, typeIsAdd, typeIsStake]);

  const validateAmount = useCallback(
    (rule: any, val: string) => {
      console.log('validateAmount', val);
      setAmountValid(false);
      if (!val) return Promise.reject('please enter number');
      const _val = val.replace(',', '');
      if (
        (typeIsAdd && ZERO.plus(balance || 0).lt(ZERO.plus(staked ?? '').plus(_val))) ||
        ZERO.plus(balance || 0).lt(_val)
      ) {
        return Promise.reject(`insufficient ${stakeSymbol} balance`);
      }
      if (ZERO.plus(_val).lt(min)) return Promise.reject(`min ${min} ${stakeSymbol}`);
      setAmountValid(true);
      return Promise.resolve();
    },
    [balance, min, stakeSymbol, staked, typeIsAdd],
  );

  const onValueChange = useCallback(
    (current: any, allVal: any) => {
      console.log('onValueChange', current, allVal);
      const { period, amount = '' } = allVal;
      form.setFieldsValue({ period });
      setPeriod(period);
      setAmount(amount);
    },
    [form],
  );

  const onSelectDays = useCallback(
    (val: string) => {
      if (disabledDurationInput) return;
      if (ZERO.plus(val).gt(maxDuration)) return singleMessage.warning(`max ${maxDuration} Days`);
      form.setFieldValue('period', val);
      form.validateFields(['period']);
      setPeriod(val);
    },
    [disabledDurationInput, form, maxDuration],
  );

  const validateDays = useCallback(
    (rule: any, val: string) => {
      console.log('validateDays', val);
      setPeriodValid(false);
      if (!val) return Promise.reject(`please enter duration`);
      const _val = val.replace(',', '');
      if (ZERO.plus(_val).gt(maxDuration)) return Promise.reject(`max ${maxDuration} Days`);
      if (ZERO.plus(_val).lt(minDuration)) return Promise.reject(`min ${minDuration} days`);
      setPeriodValid(true);
      return Promise.resolve();
    },
    [maxDuration, minDuration],
  );

  const onFinish = useCallback(
    (values: any) => {
      console.log('finish', values);
      const _amount = typeIsExtend ? staked ?? '' : amount;
      onConfirm?.(_amount.replace(',', ''), period);
    },
    [amount, onConfirm, period, staked, typeIsExtend],
  );

  const jumpUrl = useCallback(() => {
    window.open();
  }, []);

  return (
    <CommonModal
      className={style['stack-modal']}
      title={title}
      closable={true}
      open={modal.visible}
      afterClose={modal.remove}
      onCancel={onCancel}
      footer={footer}
    >
      <Form
        name="stack"
        onValuesChange={onValueChange}
        form={form}
        layout="vertical"
        validateTrigger="onBlur"
        onFinish={onFinish}
      >
        {typeIsExtend ? (
          <>{stakeLabel}</>
        ) : (
          <FormItem
            label={stakeLabel}
            labelCol={{ span: 24 }}
            name="amount"
            rules={[{ validator: validateAmount }]}
            className="mb-[22px]"
          >
            <InputNumberBase
              decimal={2}
              placeholder="Enter the amount"
              suffixText="Max"
              suffixClick={getMaxAmount}
              allowClear
            />
          </FormItem>
        )}
        {!typeIsExtend && (
          <div className="flex justify-end items-center cursor-pointer">
            <div onClick={jumpUrl}>
              <span className="text-brandDefault hover:text-brandHover text-xs">Gain SGR</span>
              <RightOutlined className={'w-4 h-4 text-brandDefault ml-1'} width={20} height={20} />
            </div>
          </div>
        )}
        <FormItem label={durationLabel}>
          <FormItem name="period" rules={[{ validator: validateDays }]}>
            <InputNumberBase
              placeholder="please enter the days"
              suffixText="Days"
              allowClear
              disabled={disabledDurationInput}
            />
          </FormItem>
          <DaysSelect current={period} onSelect={onSelectDays} disabled={disabledDurationInput} />
        </FormItem>
        <FormItem label="Periodic pledge preview">
          <div className="flex flex-col gap-4 py-6 px-6 bg-neutralHoverBg rounded-lg">
            <ViewItem label="Stack amount" text={amountStr} originText={originAmountStr} />
            <ViewItem label="Lock duration" text={periodStr} originText={originPeriodStr} />
            <ViewItem label="APR" text={aprStr} originText={originAPRStr} />
            {isExtend && (
              <ViewItem label="Original release date" text={originReleaseDateStr}></ViewItem>
            )}
            <ViewItem
              label={isExtend ? 'New release date' : 'Release date'}
              text={releaseDateStr}
            />
          </div>
        </FormItem>
        <div>
          <Divider />
        </div>
        <div>
          <Title level={7} fontWeight={FontWeightEnum.Bold} className="!text-neutralSecondary">
            Matters needing attention:
          </Title>
          <Text className="!text-neutralSecondary">
            {' '}
            Your assets can be withdrawn in full at any time after the pledge. · If you unlock
            early, you can withdraw the entire principal, but you will lose the regular pledge
            reward. · If you withdraw within 7 days after
          </Text>
        </div>
      </Form>
    </CommonModal>
  );
}

export default NiceModal.create(StackModal);
