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

// Focus on other market
// forex as a risk factor

const Home = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const data = {
    right: [
      {
        value: 13422.42,
        displayValue: "$ 13422.42",
        text: "Loans Paid",
        color: "#1ccf8d",
      },
    ],
    left: [
      {
        value: 24612.11,
        displayValue: "$ 24612.11",
        text: "Remaining",
        color: "#d1d1d1",
      },
    ],
  };

  const numCards = "500px";

  return (
    <>
      <PageTitle>Your Repayments</PageTitle>
      {hydrated && (
        <ChartContainer>
          <HalfPieChart
            name="loanStatus"
            right={data.right}
            left={data.left}
            fontStyle="Poppins"
          />
        </ChartContainer>
      )}
      <StyledDivider>
        Upcoming payment for {DateTime.local().plus({ month: 1 }).monthShort}{" "}
        {DateTime.local().year}
      </StyledDivider>
      <LoanContainer style={{ maxHeight: `calc(100vh - ${numCards})` }}>
        <StyledSpace direction="vertical" size="large">
          <RepaymentCard title="Electronic Solutions Co." cost={1522.33} />
          <RepaymentCard title="Electronic Solutions Co." cost={1522.33} />
          <RepaymentCard title="Electronic Solutions Co." cost={1522.33} />
          <RepaymentCard title="Electronic Solutions Co." cost={1522.33} />
        </StyledSpace>
      </LoanContainer>
    </>
  );
};

export default Home;
