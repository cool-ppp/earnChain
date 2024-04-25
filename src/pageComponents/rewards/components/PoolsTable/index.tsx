import { Table, ToolTip } from 'aelf-design';
import { TableColumnsType } from 'antd';
import { ReactComponent as QuestionIconComp } from 'assets/img/questionCircleOutlined.svg';

export default function PoolsTable() {
  const columns: TableColumnsType<any> = [
    {
      key: 'Pools',
      dataIndex: 'Pools',
      title: 'Pools',
      filterMultiple: false,
      align: 'center',
      filters: [
        { text: 'All', value: 'all' },
        { text: 'XPSGR', value: 'XPSGR' },
        { text: 'SGR', value: 'SGR' },
      ],
    },
    {
      key: 'Rewards',
      dataIndex: 'Rewards',
      title: (
        <div className="flex items-center">
          <span>Rewards</span>
          <ToolTip title="Rewards">
            <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
          </ToolTip>
        </div>
      ),
    },
    {
      key: 'Data',
      dataIndex: 'Data',
      title: (
        <div className="flex items-center">
          <span>Data</span>
          <ToolTip title="Data">
            <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
          </ToolTip>
        </div>
      ),
    },
    {
      key: 'Look-up period',
      dataIndex: 'Look-up period',
      title: (
        <div className="flex items-center">
          <span>Look-up period</span>
          <ToolTip title="Look-up period">
            <QuestionIconComp className="w-4 h-4 ml-1 cursor-pointer" width={16} height={16} />
          </ToolTip>
        </div>
      ),
    },
  ];

  return <Table columns={columns} rowKey={'title'} />;
}
