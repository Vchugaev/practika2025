import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#141414',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextBase: 'rgba(255, 255, 255, 0.85)',
    colorBgLayout: '#000000',
    colorBorder: '#434343',
    colorSplit: '#303030',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 16,
  },
  components: {
    Layout: {
      headerBg: 'transparent',
      headerPadding: '0',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: '#1890ff33',
      darkItemHoverBg: '#1890ff1a',
      itemHoverColor: '#1890ff',
      itemSelectedColor: '#1890ff',
      itemMarginInline: 0,
    },
    Button: {
      primaryShadow: 'none',
      colorPrimary: '#1890ff',
      colorPrimaryHover: '#40a9ff',
      colorPrimaryActive: '#096dd9',
    },
    Drawer: {
      colorBgElevated: '#1a1a1a',
      paddingLG: 0,
    },
    Popover: {
      colorBgBase: "#141414"
    }
  },
};

export default theme;