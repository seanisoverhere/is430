import React, { useEffect } from "react";
import { PageTitle } from "@/utils/styles";
import {
  InstructionText,
  FormContainer,
  StyledRow,
  Container,
  CompanyName,
  FlexContainer,
  CompanyUen,
  ScoreText,
  Color,
} from "./styles";
import { Col } from "antd";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { StyledButton } from "@/utils/styles";
import useCompany from "@/hooks/api/useCompany";
import { getColor } from "@/utils/functions";

const Profile = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { getCompanyInfo, companyInfo } = useCompany();

  useEffect(() => {
    getCompanyInfo({
      uuid: Number(localStorage.getItem("uuid")),
    });
  }, []);

  return (
    <Container>
      <PageTitle>Profile</PageTitle>
      {companyInfo && (
        <FlexContainer>
          <CompanyName>{companyInfo.companyName}</CompanyName>
          <CompanyUen>{companyInfo.uenNo}</CompanyUen>
        </FlexContainer>
      )}
      <InstructionText>
        We will prompt you <strong>quarterly</strong> to update your company
        financial health with us for a{" "}
        <strong>re-assessment of your credit score</strong>. Alternatively, you
        may also update at any point in time. We will update you on your credit
        score within <strong>3-5 working days</strong>.
        <ScoreText>
          Your Current Score:{" "}
          {companyInfo && (
            <Color $color={getColor(companyInfo.aggScore)}>
              {companyInfo.aggScore}
            </Color>
          )}
        </ScoreText>
      </InstructionText>

      <FormContainer>
        <form onSubmit={() => console.log("submit")}>
          <StyledRow gutter={[0, 24]}>
            <Col span={24}>
              <FormInput
                name="sales"
                inputText="Sales"
                type="string"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="otherIncome"
                inputText="Other Income"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="costOfGoodsSold"
                inputText="Cost of Goods Sold"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="operatingExp"
                inputText="Operating Expenses"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="interestExp"
                inputText="Interest Expenses"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="currentAssets"
                inputText="Current Assets"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="currentLiabilities"
                inputText="Current Liabilities"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="inventory"
                inputText="Inventory"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="longTermLiabilities"
                inputText="Long Term Liabilities"
                type="number"
                register={register}
                errors={errors}
              />
            </Col>
          </StyledRow>
          <StyledButton>Submit</StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Profile;
