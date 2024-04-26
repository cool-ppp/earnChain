import { useMemo, useCallback, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from 'components/CommonModal';
import { Button, Typography, FontWeightEnum } from 'aelf-design';
import InputNumberBase from 'components/InputNumberBase';
import DaysSelect from 'components/DaysSelect';
import ViewItem from 'components/ViewItem';
import { Form, Divider, Checkbox } from 'antd';
import { ZERO } from 'constants/index';
import { RightOutlined } from '@ant-design/icons';
import style from './style.module.css';
import dayjs from 'dayjs';
import { TStackType } from 'types/stack';

const FormItem = Form.Item;
const { Title, Text } = Typography;

interface IStackModalProps {
  type?: TStackType;
  extend?: boolean;
  balance?: string;
  max?: string;
  min?: string;
  tokenName: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

function StackModal({
  type = 'stack',
  extend = false,
  balance,
  max,
  min,
  tokenName,
  onClose,
  onConfirm,
}: IStackModalProps) {
  const modal = useModal();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>('0');
  const [days, setDays] = useState('0');
  const [isExtend, setIsExtend] = useState(extend);

  const title = useMemo(() => `Stack ${tokenName}`, [tokenName]);
  // const stackAmountStr = useMemo(() => `${amount}`, [amount]);
  const durationStr = useMemo(() => `${days} Days`, [days]);
  const releaseDate = useMemo(
    () => (+days ? dayjs().add(+days, 'day').format('YYYY-MM-DD HH:mm') : '--'),
    [days],
  );

  const stackLable = useMemo(() => {
    return (
      <div className="flex justify-between text-base w-full">
        <span>Stack amount</span>
        <span className="text-neutralTertiary">
          Balance: {ZERO.plus(balance || '0').toFormat(2)}
        </span>
      </div>
    );
  }, [balance]);

  const durationLabel = useMemo(() => {
    return (
      <>
        {type === 'add' ? (
          <div className="flex items-center">
            <Checkbox checked={isExtend} onChange={() => setIsExtend(!isExtend)} />
            <span className="text-base ml-2">Extend Lock Duration</span>
          </div>
        ) : (
          'Lock Duration'
        )}
      </>
    );
  }, [isExtend, type]);

  const disabledDurationInput = useMemo(() => type === 'add' && !isExtend, [isExtend, type]);

  const onStack = useCallback(async () => {
    form.submit();
    onConfirm?.();
  }, [form, onConfirm]);

  const footer = useMemo(() => {
    return (
      <Button className="round-lg w-[260px]" type="primary" loading={loading} onClick={onStack}>
        Stack
      </Button>
    );
  }, [loading, onStack]);

  const onCancel = useCallback(() => {
    if (onClose) return onClose();
    modal.hide();
  }, [modal, onClose]);

  const getMaxAmount = useCallback(() => {
    console.log('suffixClick');
    if (ZERO.plus(balance || '0').eq('0')) return;
    if (max) setAmount(max);
  }, [balance, max]);

  const validateAmount = useCallback(
    (rule: any, val: string) => {
      console.log('validateAmount', val);
      if (!val) return Promise.reject('please enter number');
      const _val = val.replace(',', '');
      if (ZERO.plus(balance || 0).lt(_val))
        return Promise.reject(`insufficient ${tokenName} balance`);
      if (ZERO.plus(_val).lt(min || 0)) return Promise.reject('min xxx');
      return Promise.resolve();
    },
    [balance, min, tokenName],
  );

  const onValueChange = useCallback(
    (current: any, allVal: any) => {
      console.log('onValueChange', current, allVal);
      const { duration, amount } = allVal;
      form.setFieldsValue({ duration });
      setDays(duration);
      setAmount(amount);
    },
    [form],
  );

  const onSelectDays = useCallback(
    (val: string) => {
      if (disabledDurationInput) return;
      form.setFieldValue('duration', val);
      form.validateFields(['duration']);
      setDays(val);
    },
    [disabledDurationInput, form],
  );

  const validateDays = useCallback((rule: any, val: string) => {
    console.log('rule', rule);
    console.log('value', val);

    const _val = +(val || 0);
    if (_val < 7) return Promise.reject('min 7 days');
    if (_val > 360) return Promise.reject('max 360 days');
    return Promise.resolve();
  }, []);

  const onFinish = useCallback(
    (values: any) => {
      form.setFieldValue('amount', '222');
      console.log('finish', values);
    },
    [form],
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
        onFinish={onFinish}
      >
        <FormItem
          label={stackLable}
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
        <div className="flex justify-end items-center cursor-pointer" onClick={jumpUrl}>
          <span className="text-brandDefault hover:text-brandHover text-xs">Gain SGR</span>
          <RightOutlined className={'w-4 h-4 text-brandDefault ml-1'} width={20} height={20} />
        </div>
        <FormItem label={durationLabel}>
          <FormItem name="duration" rules={[{ validator: validateDays }]}>
            <InputNumberBase
              placeholder="please enter the days"
              suffixText="Days"
              allowClear
              disabled={disabledDurationInput}
            />
          </FormItem>
          <DaysSelect current={days} onSelect={onSelectDays} disabled={disabledDurationInput} />
        </FormItem>
        {/* {type === 'add' && (
          <FormItem label="Fixed View">
            <div className="flex gap-4 justify-between border border-solid border-neutralDivider rounded-lg px-6 py-6">
              <div className="flex flex-col justify-between flex-1 text-base gap-2">
                <div className="text-neutralTertiary">Stack Amount</div>
                <div className="text-neutralPrimary font-medium">{amount}</div>
              </div>
              <Divider type="vertical" className="h-[inherit]" />
              <div className="flex flex-col justify-between flex-1 text-base gap-2">
                <div className="text-neutralTertiary">Locked Duration</div>
                <div className="text-neutralPrimary font-medium">{durationStr}</div>
              </div>
            </div>
          </FormItem>
        )} */}

        <div className="flex flex-col gap-4 py-6 px-6 bg-neutralHoverBg rounded-lg">
          <ViewItem label="Stack amount" text={amount} />
          <ViewItem label="Lock duration" text={durationStr} />
          <ViewItem label="APR" text="1222" />
          <ViewItem label="Release date" text={releaseDate} />
        </div>
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
