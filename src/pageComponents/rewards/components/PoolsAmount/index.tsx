import { Button } from 'aelf-design';

export default function PoolsAmount() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
      <div className="col-span-1 lg:col-span-2 border-solid border-neutralBorder border-[1px] rounded-[12px] overflow-hidden">
        <div className="text-lg bg-brandPressed h-[60px] leading-[60px] text-white pl-8 flex font-semibold">
          XPSGR Points Pools
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 p-8 bg-brandBg gap-4">
          <div>
            <div className="text-sm font-medium text-neutralPrimary">kezhiyadeSGRjiangli</div>
            <div className="text-2xl text-neutralPrimary font-semibold mt-2">12,218,658.26</div>
            <div className="mt-1 text-sm text-neutralSecondary font-medium">$12,126</div>
            <Button size="medium" type="primary" className="mt-5 w-[105px]">
              State
            </Button>
          </div>
          <div>
            <div className="text-sm font-medium text-neutralPrimary">ketiqudeSGRjiangli</div>
            <div className="text-2xl text-neutralPrimary font-semibold mt-2">12,218,658.26</div>
            <div className="mt-1 text-sm text-neutralSecondary font-medium">$12,126</div>
            <Button size="medium" ghost type="primary" className="mt-5">
              Withdraw
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-1 border-solid border-neutralBorder border-[1px] rounded-[12px] overflow-hidden">
        <div className="text-lg bg-brandPressed  h-[60px] leading-[60px] text-white pl-8 flex font-semibold">
          SGR Pool
        </div>
        <div className="p-8">
          <div className="text-sm font-medium text-neutralPrimary">ketiqudeSGRjiangli</div>
          <div className="text-2xl text-neutralPrimary font-semibold mt-2">12,218,658.26</div>
          <div className="mt-1 text-sm text-neutralSecondary font-medium">$12,126</div>
          <Button size="medium" ghost type="primary" className="mt-5">
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
}
