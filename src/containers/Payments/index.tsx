import React, { useState, useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import {
  CardContainer,
  StyledCard,
  StyledSpace,
  StyledAvatar,
  UenText,
  FlexContainer,
  ItemName,
  ItemDetails,
} from "./styles";
import usePayment from "@/hooks/api/usePayment";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import { InstructionText } from "../Signup/styles";
import { Divider, Step } from "antd";

const Payments = () => {
  const { getBill, bill } = usePayment();
  const [company, setCompany] = useState<string>("");
  const [uenNo, setUenNo] = useState<string>("");
  const [paymentId, setPaymentId] = useState<number>();
  const [totalPayment, setTotalPayment] = useState<number>();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      getBill(Number(query.billId));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bill?.individualBills.length > 0) {
      setCompany(bill.individualBills[0].companyName);
      setUenNo(bill.individualBills[0].uenNo);
      setPaymentId(bill.individualBills[0].paymentId);
      setTotalPayment(bill.individualBills[0].totalAmount);
    }
  }, [bill]);

  return (
    <>
      <PageTitle>Payments</PageTitle>
      <CardContainer>
        <StyledSpace direction="vertical" size="large">
          {bill?.individualBills.length > 0 ? (
            <StyledSpace direction="vertical" size={30}>
              <StyledCard>
                <StyledAvatar size={48} icon={<UserOutlined />} />
                {company} - <UenText>({uenNo})</UenText>
              </StyledCard>
              <StyledCard>
                <FlexContainer>
                  <ItemName>Payment Id</ItemName>
                  <ItemDetails>{paymentId}</ItemDetails>
                </FlexContainer>
                <Divider />
                <FlexContainer>
                  <ItemName>Total Payment</ItemName>
                  <ItemDetails>
                    $ {Number(totalPayment)?.toFixed(2)}
                  </ItemDetails>
                </FlexContainer>
              </StyledCard>
            </StyledSpace>
          ) : (
            <InstructionText>
              Please select your bill from the <strong>Home Page</strong>
            </InstructionText>
          )}
        </StyledSpace>
      </CardContainer>
    </>
  );
};

export default Payments;
