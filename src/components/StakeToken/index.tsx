import { memo } from 'react';
import SkeletonImage from 'components/SkeletonImage';

interface IStackTokenProps {
  src?: string;
  tokenName: string;
  projectName: string;
}
const StackToken = memo(({ src, tokenName, projectName }: IStackTokenProps) => {
  return (
    <div className="flex justify-center items-center gap-6 self-center">
      <SkeletonImage img={src} width={48} height={48} className="rounded-3xl" />
      <div className="flex flex-col">
        <div className="text-2xl font-semibold text-neutralTitle">{tokenName}</div>
        <div className="text-base font-medium text-neutralSecondary">{projectName}</div>
      </div>
    </div>
  );
});

export default StackToken;
