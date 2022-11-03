import { Space } from "antd";
import React from "react";
import {
  BoldText,
  FlexContainer,
  InstallmentText,
  PaymentText,
  StyledCard,
} from "./styles";
import { DateTime } from "luxon";

type PaymentCardProps = {
  title: string;
  uen: string;
  dueDate: string;
  totalPaidPayment: number;
  totalPayment: number;
};

const PaymentCard = ({
  title,
  uen,
  dueDate,
  totalPaidPayment,
  totalPayment,
}: PaymentCardProps) => {
  return (
    <StyledCard title={`${title} (${uen})`}>
      <FlexContainer>
        <Space direction="vertical">
          <PaymentText>
            <>
              <BoldText>PAYMENT</BoldText> till{" "}
              {DateTime.fromISO(dueDate).toFormat("dd MMM yyyy")}
            </>
          </PaymentText>
          <InstallmentText>
            Installment {totalPaidPayment} of {totalPayment}
          </InstallmentText>
        </Space>
      </FlexContainer>
    </StyledCard>
  );
};

export default PaymentCard;
