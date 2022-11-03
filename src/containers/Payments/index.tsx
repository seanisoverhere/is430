import React, { useState, useEffect } from "react";
import { PageTitle, StyledButton } from "@/utils/styles";
import {
  CardContainer,
  StyledCard,
  StyledSpace,
  StyledAvatar,
  UenText,
  FlexContainer,
  ItemName,
  ItemDetails,
  Item,
  ScrollableCard,
} from "./styles";
import usePayment from "@/hooks/api/usePayment";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import { InstructionText } from "../Signup/styles";
import { Col, Divider, Row, Steps } from "antd";
import { DateTime } from "luxon";

const Payments = () => {
  const { getBill, bill } = usePayment();
  const [company, setCompany] = useState<string>("");
  const [uenNo, setUenNo] = useState<string>("");
  const [paymentId, setPaymentId] = useState<number>();
  const [totalPayment, setTotalPayment] = useState<number>();
  const [paymentItems, setPaymentItems] = useState<any>([]);
  const [firstUnpaid, setFirstUnpaid] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      getBill(Number(query.billId));
    }
  }, [router.isReady]);

  useEffect(() => {
    setPaymentItems([]);
    if (bill?.individualBills.length > 0) {
      setCompany(bill.individualBills[0].companyName);
      setUenNo(bill.individualBills[0].uenNo);
      setPaymentId(bill.individualBills[0].paymentId);
      setTotalPayment(bill.individualBills[0].totalAmount);

      const item = bill?.individualBills.findIndex(
        (item: any) => item.paymentStatus === "IP"
      );

      setFirstUnpaid(item);

      bill?.individualBills.forEach((item: any, index: number) => {
        setPaymentItems((prev: any) => [
          ...prev,
          {
            title: `${index++}/${bill.individualBills.length} Payment`,
            description: item.paymentStatus === "IP" ? "Unpaid" : "Paid",
          },
        ]);
      });
    }
  }, [bill]);

  return (
    <>
      <PageTitle>Payments</PageTitle>
      <CardContainer>
        <StyledSpace direction="vertical" size="large">
          {bill?.individualBills.length > 0 ? (
            <>
              <ScrollableCard>
                <StyledSpace direction="vertical" size={10}>
                  <StyledCard>
                    <StyledAvatar size={48} icon={<UserOutlined />} />
                    <strong>{company}</strong> - <UenText>({uenNo})</UenText>
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
                  <StyledCard>
                    <Row style={{ textAlign: "right" }}>
                      <Col span={8}>
                        <Steps
                          direction="vertical"
                          size="small"
                          progressDot
                          current={firstUnpaid}
                          items={paymentItems}
                        />
                      </Col>
                      <Col span={8}>
                        <StyledSpace direction="vertical" size={20}>
                          {bill.individualBills.map(
                            (item: any, index: number) => (
                              <Item key={`${index}_date`}>
                                {DateTime.fromISO(item.paymentDate).toFormat(
                                  "dd MMM yyyy"
                                )}
                              </Item>
                            )
                          )}
                        </StyledSpace>
                      </Col>
                      <Col span={8}>
                        <StyledSpace direction="vertical" size={20}>
                          {bill.individualBills.map(
                            (item: any, index: number) => (
                              <Item key={`${index}_amount`}>
                                ${Number(item.paymentAmount).toFixed(2)}
                              </Item>
                            )
                          )}
                        </StyledSpace>
                      </Col>
                    </Row>
                  </StyledCard>
                </StyledSpace>
              </ScrollableCard>
              <StyledButton>Pay now</StyledButton>
            </>
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
