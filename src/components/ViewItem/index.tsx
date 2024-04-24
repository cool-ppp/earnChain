import { memo } from 'react';

interface IViewItemProps {
  label: string;
  text: string;
}

function ViewItem({ label, text }: IViewItemProps) {
  return (
    <div className="flex justify-between">
      <div className="text-base text-neutralTertiary">{label}</div>
      <div className="text-base text-neutralPrimary font-medium">{text}</div>
    </div>
  );
}

export default memo(ViewItem);
