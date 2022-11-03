import React from "react";
import { PageTitle } from "@/utils/styles";
import PaymentCard from "@/components/PaymentCard";
import { CardContainer, StyledSpace } from "./styles";

const Payments = () => {
  return (
    <>
      <PageTitle>Payments</PageTitle>
      <CardContainer>
        <StyledSpace direction="vertical" size="large">
          <PaymentCard />
          <PaymentCard />
          <PaymentCard />
        </StyledSpace>
      </CardContainer>
    </>
  );
};

export default Payments;
