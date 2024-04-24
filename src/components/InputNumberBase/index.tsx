// import { Input, InputProps } from 'antd';
import { Input, IInputProps } from 'aelf-design';
import { useCallback, useMemo, useState } from 'react';

interface IInputNumberBaseProps extends Omit<IInputProps, 'type' | 'onChange'> {
  onChange?: (val: string) => void;
  suffixText?: string;
  suffixClick?: (val: string) => void;
}

export default function InputNumberBase({
  value,
  onChange,
  suffixText,
  suffixClick,
  ...rest
}: IInputNumberBaseProps) {
  const onClick = useCallback(() => {
    suffixClick?.(value as string);
  }, [suffixClick, value]);

  const suffix = useMemo(() => {
    return (
      <span onClick={onClick} className="text-brandDefault font-medium cursor-pointer text-base">
        {suffixText}
      </span>
    );
  }, [onClick, suffixText]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      console.log('onchange', val);
      onChange?.(val);
    },
    [onChange],
  );

  return <Input type="number" value={value} suffix={suffix} onChange={onInputChange} {...rest} />;
}
