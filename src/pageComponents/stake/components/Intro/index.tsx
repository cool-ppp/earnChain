import { Button } from 'aelf-design';
import { useMemo } from 'react';
import useResponsive from 'utils/useResponsive';
import clsx from 'clsx';
import { RightOutlined } from '@ant-design/icons';
import useGetCmsInfo from 'redux/hooks/useGetCmsInfo';

export default function Intro({ dappName }: { dappName: string }) {
  const { isLG } = useResponsive();
  const { sgrStakingPointsDesc, sgrStakingPointsTopDesc, sgrStakingPointsLabel, schrodingerUrl } =
    useGetCmsInfo() || {};

  const dappInfo: {
    name: string;
    topDesc?: string;
    desc?: string;
    label?: string;
    link?: string;
  } = useMemo(() => {
    if (dappName === 'Schrödinger') {
      return {
        name: dappName,
        topDesc: sgrStakingPointsTopDesc,
        desc: sgrStakingPointsDesc,
        label: sgrStakingPointsLabel,
        link: schrodingerUrl,
      };
    }
    return {
      name: dappName,
    };
  }, [
    dappName,
    schrodingerUrl,
    sgrStakingPointsDesc,
    sgrStakingPointsLabel,
    sgrStakingPointsTopDesc,
  ]);

  const learnMore = useMemo(() => {
    return dappInfo?.desc || dappInfo?.link ? (
      <div className="text-neutralPrimary text-sm font-medium lg:text-base mt-2 lg:mt-4 flex items-start lg:items-center flex-col lg:flex-row gap-2">
        {dappInfo?.desc && <span>{dappInfo?.desc}</span>}
        {dappInfo?.link && (
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
        )}
      </div>
    ) : null;
  }, [dappInfo?.desc, dappInfo?.link, isLG]);

  return (
    <>
      <div className="flex md:flex-row flex-col flex-row gap-x-4">
        <span className="text-5xl font-semibold text-neutralTitle">{dappInfo?.name}</span>
        <div className="flex gap-2 items-center">
          {dappInfo?.topDesc && (
            <span className="text-xl font-medium text-neutralPrimary leading-[48px]">
              {dappInfo?.topDesc}
            </span>
          )}
          {dappInfo?.label && (
            <span className="text-neutralPrimary border-neutralBorder border-solid border-[1px] p-1 rounded-md bg-neutralBorder">
              {dappInfo?.label}
            </span>
          )}
        </div>
      </div>
      {learnMore}
    </>
  );
}
