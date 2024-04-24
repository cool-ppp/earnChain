import { ReactNode, memo } from 'react';
import { Button } from 'aelf-design';
import { ReactComponent as CalculateSVG } from 'assets/img/calculate.svg';
import SkeletonImage from 'components/SkeletonImage';

interface ITextProps {
  label: string;
  value: string;
  extra?: string;
  icon?: ReactNode;
}

const Description = memo(({ label, value, extra, icon }: ITextProps) => {
  return (
    <div className="flex gap-4 flex-col text-neutralTitle text-base font-medium">
      <div className="text-neutralDisable">{label}</div>
      <div>
        <div className="flex justify-center items-center font-semibold">
          <span className="mr-2">{value}</span>
          {icon}
        </div>
        <div className="text-sm">{extra}</div>
      </div>
    </div>
  );
});

interface IStackTokenProps {
  src?: string;
  tokenName: string;
  projectName: string;
}
const StackToken = memo(({ src, tokenName, projectName }: IStackTokenProps) => {
  return (
    <div className="flex justify-center items-center gap-6 self-center">
      <SkeletonImage img={src} width={48} height={48} />
      <div className="flex flex-col">
        <div className="text-2xl font-semibold text-neutralTitle">{tokenName}</div>
        <div className="text-base font-medium text-neutralSecondary">{projectName}</div>
      </div>
    </div>
  );
});

interface IStackCardProps {
  onClick: () => void;
}

export default function StackCard({ onClick }: IStackCardProps) {
  return (
    <div className="flex flex-col gap-6 px-8 py-8 rounded-xl border border-solid border-neutralDivider bg-neutralWhiteBg">
      <div className="flex justify-between">
        <StackToken
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          tokenName="SGR"
          projectName="Schrodinger"
        />
        <Description label="APR" value="2.12% ~ 15.12%" icon={<CalculateSVG />} />
        <Description label="Earn" value="SGR" />
        <Description label="Total Staking" value="129,898,709.26" extra="$ 2,267" />
      </div>
      <div className="flex justify-center items-center">
        <Button className="w-[260px]" type="primary" onClick={onClick}>
          Stack
        </Button>
      </div>
    </div>
  );
}
