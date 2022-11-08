import React, { useState, useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import { DateTime } from "luxon";
import {
  ChartContainer,
  InstructionText,
  LoanContainer,
  StyledDivider,
  StyledSpace,
} from "./styles";
import RepaymentCard from "@/components/RepaymentCard";
import { HalfPieChart } from "@/components/Chart";
import usePayment from "@/hooks/api/usePayment";

const Home = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [loans, setLoans] = useState<any>([]);
  const [latePayments, setLatePayments] = useState<any>([]);
  const [activeBills, setActiveBills] = useState<any>([]);

  const { getTotalLoans, totalLoans } = usePayment();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      getTotalLoans(Number(localStorage.getItem("uuid")));
    }
  }, [hydrated]);

  useEffect(() => {
    if (totalLoans?.totalAmt[0].totalAmt) {
      setData({
        right: [
          {
            value: `${Number(totalLoans.totalAmtPaid[0].totalAmtPaid).toFixed(
              2
            )}`,
            displayValue: `$ ${Number(
              totalLoans.totalAmtPaid[0].totalAmtPaid
            ).toFixed(2)}`,
            text: "Amount Paid",
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
      setLatePayments(totalLoans.latePaymentBill);
      setActiveBills(totalLoans.activeBills)
    }
  }, [totalLoans]);

  const numCards = "450px";

  return (
    <>
      <PageTitle>Your Repayments</PageTitle>
      {hydrated && data ? (
        <ChartContainer>
          <HalfPieChart
            name="loanStatus"
            right={data.right}
            left={data.left}
            fontStyle="Poppins"
          />
        </ChartContainer>
      ) : (
        <InstructionText>You have no loans yet :)</InstructionText>
      )}
      <LoanContainer style={{ maxHeight: `calc(100vh - ${numCards})` }}>
        {latePayments?.length > 0 && (
          <StyledDivider>Overdue Payments</StyledDivider>
        )}
        <StyledSpace direction="vertical" size="large">
          {latePayments?.length > 0 &&
            latePayments.map((loan: any, i: number) => (
              <RepaymentCard
                key={`${loan.mainPaymentId}_late_${i}`}
                title={loan.companyName}
                uen={loan.uenNo}
                cost={Number(loan.paymentAmount)}
                dueDate={loan.dueDate}
                totalPayment={loan.totalNoOfPayment}
                totalPaidPayment={loan.totalNoOfPaidPayment}
                lateFee={Number(loan.lateFee)}
                paymentId={loan.paymentId}
                isLate
              />
            ))}
        </StyledSpace>
        {data && (
          <>
            <StyledDivider>
              Upcoming Payments for{" "}
              {DateTime.local().plus({ month: 1 }).monthShort}{" "}
              {DateTime.local().year}
            </StyledDivider>

            <StyledSpace direction="vertical" size="large">
              {loans.length > 0 &&
                loans.map((loan: any, i: number) => (
                  <RepaymentCard
                    key={`${loan.mainPaymentId}_${i}`}
                    title={loan.companyName}
                    uen={loan.uenNo}
                    cost={Number(loan.paymentAmount)}
                    dueDate={loan.dueDate}
                    totalPayment={loan.totalNoOfPayment}
                    totalPaidPayment={loan.totalNoOfPaidPayment}
                    paymentId={loan.paymentId}
                  />
                ))}
            </StyledSpace>

            <StyledDivider>Active Loans</StyledDivider>

            <StyledSpace direction="vertical" size="large">
              {activeBills.length > 0 &&
                activeBills.map((loan: any, i: number) => (
                  <RepaymentCard
                    key={`${loan.mainPaymentId}__${i}`}
                    title={loan.companyName}
                    uen={loan.uenNo}
                    cost={Number(loan.paymentAmount)}
                    dueDate={loan.dueDate}
                    totalPayment={loan.totalNoOfPayment}
                    totalPaidPayment={loan.totalNoOfPaidPayment}
                    paymentId={loan.paymentId}
                  />
                ))}
            </StyledSpace>
          </>
        )}
      </LoanContainer>
    </>
  );
};

export default Home;
