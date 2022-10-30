import React, { useState, useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import { DateTime } from "luxon";
import { StyledDivider } from "./styles";
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
        value: 20,
        displayValue: "20 $",
        text: "Loans Paid",
        color: "#4cb38e",
      },
    ],
    left: [
      {
        value: 10,
        displayValue: "10 $",
        text: "Remaining",
        color: "#eee36b",
      },
    ],
  };

  return (
    <>
      <PageTitle>Your Repayments</PageTitle>
      {hydrated && (
        <HalfPieChart
          name="loanStatus"
          right={data.right}
          left={data.left}
          fontStyle="Poppins"
        />
      )}
      <StyledDivider>
        Upcoming payment for {DateTime.local().plus({ month: 1 }).monthShort}{" "}
        {DateTime.local().year}
      </StyledDivider>
      <RepaymentCard title="Electronic Solutions Co." cost={1522.33} />
    </>
  );
};

export default Home;
