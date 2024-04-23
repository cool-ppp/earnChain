import { Table } from 'aelf-design';
import { TableColumnsType } from 'antd/lib';

export default function DappList() {
  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Points',
      key: 'Points',
      dataIndex: 'Points',
    },
    {
      title: 'Staking Address',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Interaction',
      key: 'Interaction',
      dataIndex: 'Interaction',
    },
  ];
  return <Table columns={columns} />;
}
