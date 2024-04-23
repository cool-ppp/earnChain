import { ThemeConfig } from 'antd';

export const AELFDProviderTheme: ThemeConfig = {
  token: {
    colorPrimary: '#7D48E8',
    colorPrimaryHover: '#915BFF',
    colorPrimaryActive: '#6434C6',
  },
  components: {
    Input: {
      borderRadius: 12,
      borderRadiusSM: 12,
      paddingInlineSM: 11,
    },
    Table: {
      headerColor: 'var(--neutral-secondary)',
      headerSplitColor: 'var(--brand-bg)',
      headerBg: 'var(--brand-bg)',
      colorBgContainer: 'var(--brand-bg)',
      rowHoverBg: 'var(--neutral-white-bg)',
    },
    Layout: {
      bodyBg: 'var(--neutral-white-bg)',
    },
    Tooltip: {
      colorBgSpotlight: 'var(--fill-mask-2)',
      colorTextLightSolid: 'var(--neutral-white-bg)',
      borderRadius: 4,
    },
    Button: {
      borderColorDisabled: 'var(--neutral-hover-bg)',
      colorTextDisabled: 'var(--neutral-disable)',
      colorBgContainerDisabled: 'var(--neutral-hover-bg)',
      borderRadius: 12,
    },
  },
};
