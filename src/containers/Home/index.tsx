import React, { useState } from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Content>
        <div className="p-12">
          <div className="text-2xl font-bold">Dashboard</div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
