import React from "react";
import { Card } from "antd-mobile";

type RepaymentCardProps = {
  title: string;
};

const RepaymentCard = ({ title }: RepaymentCardProps) => {
  return <Card title={title}>Hello</Card>;
};

export default RepaymentCard;
