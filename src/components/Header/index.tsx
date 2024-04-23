'use client';
import { useCheckLoginAndToken } from 'hooks/useWallet';
import { ReactComponent as CloseSVG } from 'assets/img/close.svg';
import { Modal } from 'antd';
import styles from './style.module.css';
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WebLoginEvents, useWebLoginEvent } from 'aelf-web-login';
import useResponsive from 'hooks/useResponsive';
import clsx from 'clsx';
import { NEED_LOGIN_PAGE } from 'constants/router';

import useGetLoginStatus from 'redux/hooks/useGetLoginStatus';
import { IMenuItem } from './type';
import { CompassLink } from './components/CompassLink';
import ConnectWallet from './components/ConnectWallet';

export default function Header() {
  const { checkLogin } = useCheckLoginAndToken();
  const { isLogin } = useGetLoginStatus();
  const { isLG } = useResponsive();
  const router = useRouter();
  const [menuModalVisibleModel, setMenuModalVisibleModel] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(true);

  const menuItems = useMemo(() => {
    return [
      {
        title: 'Points Staking',
        schema: '/',
      },
      {
        title: 'Simple Staking',
        schema: '/simple',
      },
      {
        title: 'Rewards',
        schema: '/rewards',
      },
    ];
  }, []);

  const onPressCompassItems = useCallback(
    (item: any) => {
      const { schema } = item;
      if (schema && NEED_LOGIN_PAGE.includes(schema)) {
        if (!isLogin) {
          checkLogin({
            onSuccess: () => {
              router.push(schema || '/');
            },
          });
          return;
        }
      }
      setMenuModalVisibleModel(false);
    },
    [checkLogin, isLogin, router],
  );

  useWebLoginEvent(WebLoginEvents.LOGOUT, () => {
    setLogoutComplete(true);
    setMenuModalVisibleModel(false);
  });

  const FunctionalArea = (itemList: Array<IMenuItem>) => {
    if (!isLG) {
      return (
        <>
          <span className="space-x-8 xl:space-x-12 flex flex-row items-center">
            {itemList.map((item) => {
              const { title, schema } = item;
              return (
                <CompassLink
                  key={title}
                  item={item}
                  className="text-neutralPrimary rounded-[12px] hover:text-brandHover"
                  onPressCompassItems={onPressCompassItems}
                />
              );
            })}
          </span>
          <div className="ml-8">
            <ConnectWallet />
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <section className={clsx('sticky top-0 left-0 z-[100] flex-shrink-0 px-4 lg:px-10')}>
      <div className="h-[60px] lg:h-[80px] mx-auto flex justify-between items-center w-full">
        <div className="flex flex-1 overflow-hidden justify-start items-center">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={require('assets/img/logo.svg').default}
              alt="logo"
              className="w-[120px] h-[24px] lg:w-[160px] lg:h-[32px]"
              onClick={() => router.replace('/')}
            />
          }
        </div>
        {FunctionalArea(menuItems)}
      </div>
      <Modal
        mask={false}
        className={styles.menuModal}
        footer={null}
        closeIcon={<CloseSVG className="size-4" />}
        title="Menu"
        open={menuModalVisibleModel}
        closable
        destroyOnClose
        onCancel={() => {
          setMenuModalVisibleModel(false);
        }}
      ></Modal>
    </section>
  );
}
