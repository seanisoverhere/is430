import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import {
  DollarOutlined,
  BankOutlined,
  InsuranceOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { StyledCard, IconBox, Icon } from "./styles";

const { Content } = Layout;

const count = [
  {
    today: "Outstanding Loans",
    title: "$53,000",
    icon: <DollarOutlined />,
    color: "#FFC107",
  },
  {
    today: "Total Amount Paid",
    title: "$53,124.41",
    icon: <WalletOutlined />,
    color: "#4CAF50",
  },
  {
    today: "Interest Paid",
    title: "$124,41",
    icon: <BankOutlined />,
    color: "#2196F3",
  },
  {
    today: "Interest Rate",
    title: "1.22%",
    icon: <InsuranceOutlined />,
    color: "#f797c5",
  },
];

const Home = () => {
  return (
    <Layout>
      <Content>
        <div className="p-12">
          <div className="text-2xl font-bold mb-8">Dashboard</div>
          <Row gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={6}
                className="mb-9"
              >
                <StyledCard bordered={false}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <span className="sm:text-sm lg:text-base text-gray-400 font-semibold">
                        {c.today}
                      </span>
                      <div className="font-bold text-xl lg:text-2xl">
                        {c.title}
                      </div>
                    </div>
                    <IconBox $color={c.color}>
                      <Icon>{c.icon}</Icon>
                    </IconBox>
                  </div>
                </StyledCard>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
