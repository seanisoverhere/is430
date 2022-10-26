import React from "react";
import { PageTitle } from "@/utils/styles";
import { DateTime } from "luxon";
import { StyledDivider } from "./styles";
import RepaymentCard from "@/components/RepaymentCard";

const Home = () => {
  return (
    <>
      <PageTitle>Your Repayments</PageTitle>
      <StyledDivider>
        Upcoming payment for {DateTime.local().plus({ month: 1 }).monthShort}{" "}
        {DateTime.local().year}
      </StyledDivider>
      <RepaymentCard title="Electronic Solutions Co." />
    </>
  );
};

export default Home;
