import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { BarChartOutlined, AppstoreAddOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

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
  getItem("Dashboard", "1", <BarChartOutlined />),
  getItem("Application", "2", <AppstoreAddOutlined />),
];

const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Layout>
        <Content>
          <div className="p-12">
            <div className="text-2xl font-bold">Dashboard</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
