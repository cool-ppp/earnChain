import { Button } from 'aelf-design';
import { useState } from 'react';
import { Flex } from 'antd';

export default function PointsStakingList() {
  const [data, setData] = useState<Array<any>>([]);

  return (
    <div className="rounded-[24px] p-6 border-[1px] border-solid border-neutralBorder w-[668px] bg-white mt-6">
      <Flex justify="space-between" align="center">
        <span className="text-2xl font-semibold text-neutralPrimary">XPSGR-1</span>
        <span className="text-sm font-medium">1w reward points/day :189 SGR</span>
      </Flex>
      <Flex className="mt-2" justify="space-between">
        <span>Pool reward/day: 212,989 SGR</span>
        <span>Total staked: 129,898,709</span>
      </Flex>
      <Flex justify="space-between" align="center" className="p-4 rounded-[16px] bg-brandBg mt-6">
        <Flex gap={8} vertical>
          <span>Staked: 12,214,658</span>
          <span>Available for stake :129,898,709</span>
        </Flex>
        <Button type="primary" size="medium" className="w-[102px]">
          Stake
        </Button>
      </Flex>
      <Flex justify="space-between" align="center" className="p-4 rounded-[16px] bg-brandBg mt-4">
        <span>Earned: 12,128 SGR</span>
        <Button type="primary" size="medium">
          withdraw
        </Button>
      </Flex>
    </div>
  );
}
