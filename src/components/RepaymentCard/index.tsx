import { Space } from "antd";
import React from "react";
import {
  BoldText,
  CompanyLogo,
  FlexContainer,
  InstallmentText,
  MakePayment,
  PaymentText,
  StyledCard,
} from "./styles";
import { BarcodeOutlined, CreditCardOutlined  } from "@ant-design/icons";

type RepaymentCardProps = {
  title: string;
  cost: number;
};

const RepaymentCard = ({ title, cost }: RepaymentCardProps) => {
  return (
    <StyledCard title={title} extra={`$${cost.toLocaleString()}`}>
      <FlexContainer>
        <Space direction="vertical">
          <PaymentText>
            <BoldText>PAYMENT</BoldText> till Mar 20. 2019
          </PaymentText>
          <InstallmentText>Installment 20 of 24</InstallmentText>

          <MakePayment>
            <CreditCardOutlined 
              style={{ fontSize: "1rem", paddingRight: "0.5rem" }}
            />
            Make Payment now
          </MakePayment>
        </Space>
        <CompanyLogo>
          <BarcodeOutlined style={{ fontSize: "1.5rem" }} />
        </CompanyLogo>
      </FlexContainer>
    </StyledCard>
  );
};

export default RepaymentCard;
