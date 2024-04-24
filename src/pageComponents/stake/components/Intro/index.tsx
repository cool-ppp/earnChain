import { Button } from 'aelf-design';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useResponsive from 'utils/useResponsive';
import clsx from 'clsx';
import { RightOutlined } from '@ant-design/icons';

export default function Intro({ dappName }: { dappName: string }) {
  const [dappInfo, setDappInfo] = useState<any>();
  const { isLG } = useResponsive();

  const getDappInfo = useCallback(() => {
    setDappInfo({
      name: 'Schrodinger',
      label: 'XPSGR Points Staking',
      desc: 'Multiple points pledge, get more revenue',
      link: 'https://pixiepoints.io',
      icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Schrodinger.png',
    });
  }, []);

  useEffect(() => {
    getDappInfo();
  }, [dappName, getDappInfo]);

  const learnMore = useMemo(() => {
    return (
      <div className="text-neutralPrimary text-sm font-medium lg:text-base mt-2 lg:mt-4 flex items-start lg:items-center flex-col lg:flex-row">
        <span>{dappInfo?.desc}</span>
        <Button
          type="link"
          className="!px-0 flex items-center"
          onClick={() => {
            window.open(dappInfo?.link, '_blank');
          }}
        >
          <span
            className={clsx(
              'text-brandDefault text-sm lg:text-base font-medium hover:text-brandHover',
            )}
          >
            Learn More
          </span>
          <RightOutlined
            className={clsx(
              'w-[14px] h-[14px] lg:w-4 text-sm lg:text-base leading-[100%] lg:h-4 text-brandDefault ml-2',
            )}
            width={isLG ? 14 : 20}
            height={isLG ? 14 : 20}
          />
        </Button>
      </div>
    );
  }, [dappInfo?.desc, dappInfo?.link, isLG]);

  return (
    <>
      {isLG ? (
        <>
          <div className="flex items-center gap-x-4">
            {!dappInfo?.icon ? null : (
              <img
                className="w-16 h-16 rounded-md"
                alt="logo"
                width={64}
                height={64}
                src={dappInfo?.icon}
              />
            )}
            <div className="flex flex-col gap-1 text-sm font-medium ">
              <span className="text-neutralTitle">{dappInfo?.name}</span>
              <span className="text-neutralPrimary">{dappInfo?.label}</span>
            </div>
          </div>
          {learnMore}
        </>
      ) : (
        <>
          <div className="flex flex-row gap-x-4">
            <span className="text-5xl font-semibold text-neutralTitle">{dappInfo?.name}</span>
            <span className="text-xl font-medium text-neutralPrimary leading-[48px]">
              {dappInfo?.label}
            </span>
          </div>
          {learnMore}
        </>
      )}
    </>
  );
}
