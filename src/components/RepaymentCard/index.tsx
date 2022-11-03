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
import { BarcodeOutlined, CreditCardOutlined } from "@ant-design/icons";
import { DateTime } from "luxon";

type RepaymentCardProps = {
  title: string;
  uen: string;
  cost: number;
  dueDate: string;
};

const RepaymentCard = ({ title, uen, cost, dueDate }: RepaymentCardProps) => {
  return (
    <StyledCard
      title={`${title} (${uen})`}
      extra={`$${cost.toFixed(2).toLocaleString()}`}
    >
      <FlexContainer>
        <Space direction="vertical">
          <PaymentText>
            <>
              <BoldText>PAYMENT</BoldText> till{" "}
              {DateTime.fromISO(dueDate).toFormat("dd MMM yyyy")}
            </>
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
