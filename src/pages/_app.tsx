import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { MenuProps } from "antd";
import { BarChartOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem(<Link href="/">Dashboard</Link>, "1", <BarChartOutlined />),
  getItem(<Link href="/loans">Loans</Link>, "2", <AppstoreAddOutlined />),
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Xchange In B2B</title>
        <meta name="description" content="XBB B2B App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: "100vh" }}>
        {router.pathname !== "/login" && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <img src="/logo.png" alt="XBB" />
            <Menu
              theme="light"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
        )}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
