import React from "react";
import { PageTitle } from "@/utils/styles";
import { DateTime } from "luxon";
import { StyledDivider, FlexContainer } from "./styles";

const Home = () => {
  return (
    <>
      <FlexContainer>
        <PageTitle>Your Repayments</PageTitle>
      </FlexContainer>
      <StyledDivider>
        Upcoming payment for {DateTime.local().plus({ month: 1 }).monthShort}{" "}
        {DateTime.local().year}
      </StyledDivider>
    </>
  );
};

export default Home;
