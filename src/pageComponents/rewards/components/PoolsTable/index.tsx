import { Pagination, Table, ToolTip } from 'aelf-design';
import { Flex, TableColumnsType } from 'antd';
import { ReactComponent as QuestionIconComp } from 'assets/img/questionCircleOutlined.svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import CountDownLock from '../CountDownLock';

export default function PoolsTable() {
  const [data, setData] = useState<Array<any>>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  const onPaginationChange = useCallback(
    ({ page, pageSize }: { page?: number; pageSize?: number }) => {
      page && setPageNum(page);
      pageSize && setPageSize(pageSize);
    },
    [],
  );

  useEffect(() => {
    setData([
      {
        type: 'simple',
        pools: 'SGR',
        icon: 'https://schrodinger-testnet.s3.ap-northeast-1.amazonaws.com/Schrodinger.png',
        progress: 'Schrödinger',
        rewards: '134,345',
        date: '1719705600000',
        period: 'Unlocked',
      },
      {
        type: 'xpsgr',
        pools: 'XPSGR-1',
        rewards: '134,345',
        date: '1714112326062',
        period: '1714176000000',
      },
      {
        type: 'xpsgr',
        pools: 'XPSGR-1',
        rewards: '134,345',
        date: '1714112326062',
        period: '1714130700000',
      },
      {
        type: 'xpsgr',
        pools: 'XPSGR-1',
        rewards: '134,345',
        date: '1714112326062',
        period: '1714123800000',
      },
    ]);
  }, []);

  const columns: TableColumnsType<any> = useMemo(() => {
    return [
      {
        key: 'pools',
        dataIndex: 'pools',
        title: 'Pools',
        filterMultiple: false,
        filters: [
          { text: 'All', value: 'all' },
          { text: 'XPSGR', value: 'XPSGR' },
          { text: 'SGR', value: 'SGR' },
        ],
        render: (text, item) => {
          if (item.type === 'xpsgr') {
            return <div className="text-base text-neutralPrimary">{item.pools}</div>;
          } else {
            return (
              <Flex align="center" gap={8}>
                <img src={item.icon} alt="icon" className="rounded-[50%] w-10 h-10 object-cover" />
                <Flex vertical align="start">
                  <span className="text-base text-neutralPrimary">{item.pools}</span>
                  <span className="text-sm text-neutralSecondary">{item.progress}</span>
                </Flex>
              </Flex>
            );
          }
        },
      },
      {
        key: 'Rewards',
        dataIndex: 'rewards',
        title: (
          <div className="flex items-center">
            <span>Rewards</span>
            <ToolTip title="Rewards">
              <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
            </ToolTip>
          </div>
        ),
        render: (text, item) => {
          return (
            <Flex vertical>
              <span className="text-base text-neutralPrimary font-medium">{text} SGR</span>
              <span className="text-sm text-neutralSecondary">$ {text}</span>
            </Flex>
          );
        },
      },
      {
        key: 'Date',
        dataIndex: 'date',
        title: (
          <div className="flex items-center">
            <span>Date</span>
            <ToolTip title="Data">
              <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
            </ToolTip>
          </div>
        ),
        render: (text, item) => {
          return (
            <span className="text-neutralPrimary text-base">
              {dayjs(Number(text)).format('YYYY.MM.DD HH:mm')}
            </span>
          );
        },
      },
      {
        key: 'Look-up period',
        dataIndex: 'period',
        title: (
          <div className="flex items-center">
            <span>Look-up period</span>
            <ToolTip title="Look-up period">
              <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
            </ToolTip>
          </div>
        ),
        render: (text, item) => {
          if (text === 'Unlocked') {
            return <span className="text-base font-medium text-functionalSuccess">{text}</span>;
          }
          return (
            <span className="text-brandDefault text-base font-medium">
              <CountDownLock targetTimeStamp={text} />
            </span>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <Table columns={columns} rowKey={'title'} scroll={{ x: 'max-content' }} dataSource={data} />
      <div className="py-4">
        <Pagination
          // hideOnSinglePage
          pageSize={pageSize}
          current={pageNum}
          showSizeChanger
          total={data.length ?? 0}
          pageChange={(page) => onPaginationChange({ page })}
          pageSizeChange={(page, pageSize) => onPaginationChange({ page, pageSize })}
        />
      </div>
    </>
  );
}
