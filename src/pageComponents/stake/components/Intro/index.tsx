import { Button } from 'aelf-design';
import { useCallback, useEffect, useState } from 'react';
import useResponsive from 'utils/useResponsive';
import clsx from 'clsx';
import { RightOutlined } from '@ant-design/icons';

export default function Intro({ dappName }: { dappName: string }) {
  const [dappInfo, setDappInfo] = useState<any>();
  const { isMD } = useResponsive();

  const getDappInfo = useCallback(() => {
    setDappInfo({
      name: 'Schrodinger',
      label: 'XPSGR Points Staking',
      desc: 'Multiple points pledge, get more revenue',
      link: 'https://pixiepoints.io',
    });
  }, []);

  useEffect(() => {
    getDappInfo();
  }, [dappName, getDappInfo]);

  return (
    <>
      <div className="flex flex-row gap-x-4">
        <span className="text-5xl font-semibold text-neutralTitle">{dappInfo?.name}</span>
        <span className="text-xl font-medium text-neutralPrimary leading-[48px]">
          {dappInfo?.label}
        </span>
      </div>
      <div className="text-neutralPrimary text-base mt-4 flex items-center">
        <span>{dappInfo?.desc}</span>
        <Button
          type="link"
          className="!px-0 ml-2 flex items-center"
          onClick={() => {
            window.open(dappInfo?.link, '_blank');
          }}
        >
          <span className={clsx('text-brandDefault font-medium hover:text-brandHover')}>
            Learn More
          </span>
          <RightOutlined
            className={clsx('w-4 h-4 text-brandDefault ml-2')}
            width={20}
            height={20}
          />
        </Button>
      </div>
    </>
  );
}
