import React, { useState, useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import PaymentCard from "@/components/PaymentCard";
import {
  CardContainer,
  CompanyCard,
  StyledSpace,
  StyledAvatar,
  UenText,
} from "./styles";
import usePayment from "@/hooks/api/usePayment";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

const Payments = () => {
  const { getBill, bill } = usePayment();
  const [company, setCompany] = useState<string>("");
  const [uenNo, setUenNo] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      getBill(Number(query.billId));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bill) {
      setCompany(bill.individualBills[0].companyName);
      setUenNo(bill.individualBills[0].uenNo);
    }
  }, [bill]);

  return (
    <>
      <PageTitle>Payments</PageTitle>
      <CardContainer>
        <StyledSpace direction="vertical" size="large">
          {bill && (
            <CompanyCard>
              <StyledAvatar size={48} icon={<UserOutlined />} />
              {company} -  <UenText>({uenNo})</UenText>
            </CompanyCard>
          )}
        </StyledSpace>
      </CardContainer>
    </>
  );
};

export default Payments;
