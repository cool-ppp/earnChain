import InputNumberBase from 'components/InputNumberBase';
import { useCallback } from 'react';
import { DAYS_DURATION } from 'constants/stack';
import clsx from 'clsx';

interface IDaysSelectProps {
  current: string;
  onSelect: (val: string) => void;
}

function DaysSelect({ current, onSelect }: IDaysSelectProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-4">
      {DAYS_DURATION.map((item) => {
        return (
          <div
            key={item}
            className={clsx(
              'flex-1 rounded-sm bg-neutralHoverBg py-[6px] px-[16px] text-xs font-medium text-neutralSecondary text-center cursor-pointer hover:bg-brandDefault hover:text-white',
              current == item && '!bg-brandDefault text-white',
            )}
            onClick={() => onSelect(item)}
          >
            {item} D
          </div>
        );
      })}
    </div>
  );
}

interface IInputDaysProps {
  value?: string;
  onChange?: (val: string) => void;
  suffixClick?: (val: string) => void;
}

export default function InputDays({ value, onChange, suffixClick }: IInputDaysProps) {
  const onInputChange = useCallback(
    (val: string) => {
      console.log('select change', val);
      onChange?.(val);
    },
    [onChange],
  );
  return (
    <>
      <InputNumberBase
        placeholder="please enter the days"
        value={value}
        onChange={onInputChange}
        suffixText="Days"
        suffixClick={suffixClick}
      />
      <DaysSelect current={value || ''} onSelect={onInputChange} />
    </>
  );
}
