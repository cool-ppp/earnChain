import { useRequest } from 'ahooks';
import { getPointsPoolList } from 'api/request';
import { useEffect, useState } from 'react';
import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';

export enum ListTypeEnum {
  Staked = 'staked',
  All = 'all',
}

export default function usePointsPoolService() {
  const [currentList, setCurrentList] = useState<ListTypeEnum>(ListTypeEnum.All);
  const { isLogin } = useGetLoginStatus();

  const { run, data, loading, refresh } = useRequest(
    (params) => {
      if (!isLogin) return Promise.resolve(null);
      return getPointsPoolList(params);
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    run({
      type: currentList,
      sorting: '',
      name: '',
      skipCount: 0,
      maxResultCount: 20,
    });
  }, [currentList, run]);

  return {
    data,
    loading,
    currentList,
    setCurrentList,
    fetchData: refresh,
  };
}
