import "@/app/globals.css";
import { ConfigProvider } from "antd";
import theme from './themeConfig';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
        <body>{children}</body>
      </ConfigProvider>
    </html>
  );
}
