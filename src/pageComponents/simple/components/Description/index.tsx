import { memo, ReactNode } from 'react';
import { ToolTip } from 'aelf-design';
import { ReactComponent as QuestionSVG } from 'assets/img/questionCircleOutlined.svg';

interface ITextProps {
  label: string;
  value: string;
  tip?: string;
  extra?: string;
  icon?: ReactNode;
}

const Description = memo(({ label, value, tip, extra, icon }: ITextProps) => {
  return (
    <div className="flex gap-4 flex-col text-neutralTitle text-base font-medium">
      <div className="flex items-center gap-2 text-neutralDisable">
        <span>{label}</span>
        {tip && (
          <ToolTip title={tip}>
            <QuestionSVG className="w-6 h-6" />
          </ToolTip>
        )}
      </div>
      <div>
        <div className="flex justify-center items-center font-semibold">
          <span className="mr-2">{value}</span>
          {icon}
        </div>
        <div className="text-sm font-medium">{extra}</div>
      </div>
    </div>
  );
});

export default Description;
