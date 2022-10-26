import React from "react";
import { StyledCard } from "./styles";

type RepaymentCardProps = {
  title: string;
};

const RepaymentCard = ({ title }: RepaymentCardProps) => {
  return (
    <StyledCard title={title} extra="$1522,22">
      Hello
    </StyledCard>
  );
};

export default RepaymentCard;
