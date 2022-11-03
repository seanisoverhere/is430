import React, { useState, useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import { DateTime } from "luxon";
import {
  ChartContainer,
  LoanContainer,
  StyledDivider,
  StyledSpace,
} from "./styles";
import RepaymentCard from "@/components/RepaymentCard";
import { HalfPieChart } from "@/components/Chart";
import usePayment from "@/hooks/api/usePayment";

const Home = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [loans, setLoans] = useState<any>([]);

  const { getBill, getTotalLoans, bill, totalLoans } = usePayment();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      getTotalLoans(Number(localStorage.getItem("uuid")));
    }
  }, [hydrated]);

  useEffect(() => {
    if (totalLoans?.totalAmt.length > 0) {
      setData({
        right: [
          {
            value: `${Number(totalLoans.totalAmtPaid[0].totalAmtPaid).toFixed(
              2
            )}`,
            displayValue: `$ ${Number(
              totalLoans.totalAmtPaid[0].totalAmtPaid
            ).toFixed(2)}`,
            text: "Loans Paid",
            color: "#1ccf8d",
          },
        ],
        left: [
          {
            value: `${Number(
              totalLoans.totalAmt[0].totalAmt -
                totalLoans.totalAmtPaid[0].totalAmtPaid
            ).toFixed(2)}`,
            displayValue: `$ ${Number(
              totalLoans.totalAmt[0].totalAmt -
                totalLoans.totalAmtPaid[0].totalAmtPaid
            ).toFixed(2)}`,
            text: "Remaining",
            color: "#d1d1d1",
          },
        ],
      });

      setLoans(totalLoans.currentMonthBill);
    }
  }, [totalLoans]);

  const numCards = "500px";

  return (
    <>
      <PageTitle>Your Repayments</PageTitle>
      {hydrated && data && (
        <ChartContainer>
          <HalfPieChart
            name="loanStatus"
            right={data.right}
            left={data.left}
            fontStyle="Poppins"
          />
        </ChartContainer>
      )}
      <StyledDivider>Overdue Payments</StyledDivider>
      <StyledDivider>
        Upcoming Payments for {DateTime.local().plus({ month: 1 }).monthShort}{" "}
        {DateTime.local().year}
      </StyledDivider>
      <LoanContainer style={{ maxHeight: `calc(100vh - ${numCards})` }}>
        <StyledSpace direction="vertical" size="large">
          {loans.length > 0 &&
            loans.map((loan: any) => (
              <RepaymentCard
                key={loan.mainPaymentId}
                title={loan.companyName}
                uen={loan.uenNo}
                cost={Number(loan.paymentAmount)}
                dueDate={loan.dueDate}
                totalPayment={loan.totalNoOfPayment}
                totalPaidPayment={loan.totalNoOfPaidPayment}
              />
            ))}
        </StyledSpace>
      </LoanContainer>
    </>
  );
};

export default Home;
