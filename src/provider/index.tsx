'use client';
import StoreProvider from './store';
import { ConfigProvider } from 'antd';
import { AELFDProvider } from 'aelf-design';
import enUS from 'antd/lib/locale/en_US';
import WebLoginProvider from './webLoginProvider';
import Loading from 'components/Loading/index';
import { useState } from 'react';
import { AELFDProviderTheme } from './config';
import NiceModal from '@ebay/nice-modal-react';
import dynamic from 'next/dynamic';

const Updater = dynamic(() => import('components/Updater'), { ssr: false });

function Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <StoreProvider>
        <AELFDProvider theme={AELFDProviderTheme}>
          <ConfigProvider locale={enUS} autoInsertSpaceInButton={false}>
            {loading ? (
              <Loading />
            ) : (
              <WebLoginProvider>
                <Updater />
                <NiceModal.Provider>{children}</NiceModal.Provider>
              </WebLoginProvider>
            )}
          </ConfigProvider>
        </AELFDProvider>
      </StoreProvider>
    </>
  );
}

export default Provider;
