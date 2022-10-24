import React, { useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { StyledCard, IconBox, Icon } from "./styles";

const { Content } = Layout;
const { Title } = Typography;

const count = [
  {
    today: "Today's Sales",
    title: "$53,000",
    icon: <CarOutlined />,
  },
  {
    today: "Today's Users",
    title: "3,200",
    icon: <CarOutlined />,
  },
  {
    today: "New Clients",
    title: "+1,200",
    icon: <CarOutlined />,
  },
  {
    today: "New Orders",
    title: "$13,200",
    icon: <CarOutlined />,
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
                lg={24}
                xl={6}
                className="mb-9"
              >
                <StyledCard bordered={false}>
                  <div className="flex justify-between items-center w-full">
                    <div className='sm:text-base lg:text-lg'>
                      <span>{c.today}</span>
                      <div className="font-bold">
                        {c.title}
                      </div>
                    </div>
                    <IconBox>
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
