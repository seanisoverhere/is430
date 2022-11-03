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
  LateText,
} from "./styles";
import { BarcodeOutlined, CreditCardOutlined } from "@ant-design/icons";
import { DateTime } from "luxon";
import { useRouter } from "next/router";

type RepaymentCardProps = {
  title: string;
  uen: string;
  cost: number;
  dueDate: string;
  totalPayment: number;
  totalPaidPayment: number;
  paymentId: number;
  isLate?: boolean;
  lateFee?: number;
};

const RepaymentCard = ({
  title,
  uen,
  cost,
  dueDate,
  totalPayment,
  totalPaidPayment,
  paymentId,
  isLate,
  lateFee,
}: RepaymentCardProps) => {
  const router = useRouter();

  const handleReroute = () => {
    router.push({
      pathname: "/payments",
      query: { billId: paymentId },
    });
  };

  return (
    <StyledCard
      onClick={() => handleReroute()}
      title={`${title} (${uen})`}
      extra={
        cost ? (
          <LateText $isLate={isLate}>
            ${cost.toFixed(2).toLocaleString()}
          </LateText>
        ) : null
      }
    >
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
          {isLate && (
            <LateText $isLate={isLate}>
              Late Fees: ${lateFee?.toFixed(2).toLocaleString()}
            </LateText>
          )}

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
