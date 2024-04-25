import { useMemo, useCallback, useState, useEffect } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import CommonModal from 'components/CommonModal';
import { Button, Typography, FontWeightEnum } from 'aelf-design';
import InputNumberBase from 'components/InputNumberBase';
import DaysSelect from 'components/DaysSelect';
import ViewItem from 'components/ViewItem';
import { Form, Divider, Input } from 'antd';
import { ZERO } from 'constants/index';

const FormItem = Form.Item;
const { Title, Text } = Typography;

interface IStackModalProps {
  max?: string;
  tokenName: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

function StackModal({ max, tokenName, onClose, onConfirm }: IStackModalProps) {
  const modal = useModal();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>('0.00');
  const [days, setDays] = useState('0');

  const title = useMemo(() => `Stack ${tokenName}`, [tokenName]);

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
    if (max) setAmount(max);
  }, [max]);

  const getMaxDays = useCallback(() => {
    console.log('getMaxDays');
    if (max) setAmount(max);
  }, [max]);

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
      form.setFieldValue('duration', val);
      setDays(val);
    },
    [form],
  );

  const validateDays = useCallback((rule: any, val: string) => {
    console.log('rule', rule);
    console.log('value', val);

    const _val = +(val || 0);
    if (_val < 7) return Promise.reject('min 7 days');
    if (_val > 360) return Promise.reject('max 360 days');
    return Promise.resolve();
  }, []);

  const validateAmount = useCallback((rule: any, val: string) => {
    console.log('validateAmount', val);
    if (!val) return Promise.reject('please enter number');
    const _val = ZERO.plus(val.replace(',', ''));
  }, []);

  const onFinish = useCallback(
    (values: any) => {
      form.setFieldValue('amount', '222');
      console.log('finish', values);
    },
    [form],
  );

  return (
    <CommonModal
      title={title}
      closable={true}
      open={modal.visible}
      afterClose={modal.remove}
      onCancel={onCancel}
      footer={footer}
    >
      <Form
        name="stack"
        layout="vertical"
        onValuesChange={onValueChange}
        form={form}
        requiredMark={false}
        onFinish={onFinish}
      >
        <FormItem label="Stake amount" name="amount" rules={[{ validator: validateAmount }]}>
          <InputNumberBase
            decimal={2}
            placeholder="Enter the amount"
            suffixText="Max"
            suffixClick={getMaxAmount}
            allowClear
          />
        </FormItem>
        <FormItem label="Lock duration">
          <FormItem name="duration" rules={[{ validator: validateDays }]}>
            <InputNumberBase placeholder="please enter the days" suffixText="Days" allowClear />
          </FormItem>
          <DaysSelect current={days} onSelect={onSelectDays} />
        </FormItem>
      </Form>
      <div className="flex flex-col gap-4 py-6 px-6 bg-neutralHoverBg rounded-lg">
        <ViewItem label="Stack amount" text={amount} />
        <ViewItem label="Lock duration" text={days} />
        <ViewItem label="APR" text="1222" />
        <ViewItem label="Release date" text="1222" />
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
          Your assets can be withdrawn in full at any time after the pledge. · If you unlock early,
          you can withdraw the entire principal, but you will lose the regular pledge reward. · If
          you withdraw within 7 days after
        </Text>
      </div>
    </CommonModal>
  );
}

export default NiceModal.create(StackModal);
