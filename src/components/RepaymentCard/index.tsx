import React from "react";
import { StyledCard } from "./styles";

type RepaymentCardProps = {
  title: string;
  cost: number
};

const RepaymentCard = ({ title, cost }: RepaymentCardProps) => {
  return (
    <StyledCard title={title} extra={`$${cost.toLocaleString()}`}>
      PAYMENT til Mar 20. 2019
      Installment 20 of 24
    </StyledCard>
  );
};

export default RepaymentCard;
