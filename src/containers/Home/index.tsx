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
  return <div>Test</div>;
};

export default Home;
