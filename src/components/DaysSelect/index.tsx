import { DAYS_DURATION } from 'constants/stack';
import clsx from 'clsx';
import { Form } from 'antd';

interface IDaysSelectProps {
  current: string;
  onSelect: (val: string) => void;
}

export default function DaysSelect({ current, onSelect }: IDaysSelectProps) {
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
