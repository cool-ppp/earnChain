import { Button, ToolTip } from 'aelf-design';
import { Divider } from 'antd';
import { ReactComponent as QuestionSVG } from 'assets/img/question.svg';

export default function ListCard() {
  return (
    <div className="flex justify-between bg-brandBg px-6 py-6 rounded-sm gap-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-between gap-2">
          <div className="text-base font-semibold">12,128.12 SGR</div>
          <div className="text-sm font-medium text-neutralSecondary">$ 2,267</div>
          <div className="flex items-center text-base font-semibold">
            <div className="text-green-400 mr-2">APR: 2.12%</div>
            {/* <ToolTip title="tooltips">
              <QuestionSVG />
            </ToolTip> */}
          </div>
        </div>
        <Button type="primary" size="medium">
          Unstack
        </Button>
      </div>
      <Divider type="vertical" className="h-[inherit]" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-between h-full">
          <div className="text-neutralTitle">
            <span className="text-base font-semibold">Earned</span>
            <span className="ml-2 text-sm">SGR</span>
          </div>
          <div className="text-base font-semibold ">0.00</div>
          <div className="text-sm font-medium text-neutralSecondary">$ 0</div>
        </div>
        <Button type="primary" ghost size="medium">
          Claim
        </Button>
      </div>
      <Divider type="vertical" className="h-[inherit]" />
      <div className="flex-1 flex flex-col justify-between text-base font-semibold">
        <div className="">Release date</div>
        <div className="">Unlocked</div>
        <div className="text-functionalWarning">Stacking 2024-12-12 8:00</div>
      </div>
    </div>
  );
}
