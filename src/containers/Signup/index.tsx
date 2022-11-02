import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PageTitle } from "@/utils/styles";
import FormInput from "@/components/FormInput";
import {
  ButtonContainer,
  StepContainer,
  StyledSteps,
  StyledRow,
  FormContainer,
  StyledSelect,
  InputText,
  InstructionText,
} from "./styles";
import {
  BankOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledButton } from "@/utils/styles";
import { message, Col, Space } from "antd";
import useSignup from "@/hooks/api/useSignup";
import useLoan from "@/hooks/api/useLoans";
import { industries } from "@/utils/constants/industries";
import { useRouter } from "next/router";

const { Option } = StyledSelect;

const items = [
  {
    title: "Company Registration",
    icon: <UserOutlined />,
  },
  {
    title: "Company Information",
    icon: <SolutionOutlined />,
  },
  {
    title: "Financial Information",
    icon: <BankOutlined />,
  },
];

const Signup = () => {
  const [current, setCurrent] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [uenNo, setUenNo] = useState<string>("");

  const [industry, setIndustry] = useState<string>("");
  const [isFirstDisabled, setIsFirstDisabled] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { signUp, uuid } = useSignup();
  const { getAggregatedScore, isSuccess } = useLoan();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const {
      sales,
      otherIncome,
      costOfGoodsSold,
      operatingExp,
      interestExp,
      currentAssets,
      currentLiabilities,
      inventory,
      longTermLiabilities,
    } = data;

    const dataToPost = {
      industry,
      sales: Number(sales),
      otherIncome: Number(otherIncome),
      costOfGoodsSold: Number(costOfGoodsSold),
      operatingExp: Number(operatingExp),
      interestExp: Number(interestExp),
      currentAssets: Number(currentAssets),
      currentLiabilities: Number(currentLiabilities),
      inventory: Number(inventory),
      longTermLiabilities: Number(longTermLiabilities),
      uuid,
    };

    await getAggregatedScore(dataToPost);

    if (isSuccess) {
      message.success("Successfully registered!");
      router.push("/");
    }
  };

  useEffect(() => {
    const watchAll = watch();

    const { email, password, companyName, uenNo } = watchAll;

    setEmail(email);
    setPassword(password);
    setCompanyName(companyName);
    setUenNo(uenNo);

    if (email && password) {
      setIsFirstDisabled(false);
    } else {
      setIsFirstDisabled(true);
    }
  }, [watch()]);

  const next = async () => {
    setCurrent(current + 1);

    if (current === 1) {
      await signUp({
        email,
        password,
        companyName,
        uenNo,
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleOnChange = (value: any) => {
    setIndustry(value);
  };

  useEffect(() => {
    console.log(uuid);
  }, [uuid]);

  return (
    <>
      <PageTitle>Sign up</PageTitle>
      <StepContainer>
        <InstructionText>
          Please provide your company and financial details with us as part of
          our <strong>KYC process</strong>. We will assign a{" "}
          <strong>credit rating score</strong> to you based on your financial
          information.
        </InstructionText>
        <StyledSteps
          current={current}
          labelPlacement="vertical"
          // @ts-ignore
          items={items}
        />
        <ButtonContainer>
          <StyledRow justify="space-between">
            {current > 0 && (
              <Col span={11}>
                <StyledButton onClick={() => prev()}>Previous</StyledButton>
              </Col>
            )}
            <Col span={1} />
            {current < items.length - 1 && (
              <Col span={current === items.length - 2 ? 11 : 24}>
                <StyledButton
                  $isDisabled={isFirstDisabled}
                  onClick={() => next()}
                >
                  Next
                </StyledButton>
              </Col>
            )}

            {current === items.length - 1 && (
              <Col span={11}>
                <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
                  Done
                </StyledButton>
              </Col>
            )}
          </StyledRow>
        </ButtonContainer>
        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {current === 0 && (
              <Space direction="vertical" style={{ width: "100%" }} size={48}>
                <FormInput
                  name="email"
                  inputText="Email"
                  type="string"
                  register={register}
                  errors={errors}
                  isRequired
                />
                <FormInput
                  name="password"
                  inputText="Password"
                  type="password"
                  register={register}
                  errors={errors}
                  isRequired
                />
              </Space>
            )}
            {current === 1 && (
              <Space direction="vertical" style={{ width: "100%" }} size={48}>
                <FormInput
                  name="companyName"
                  inputText="Company Name"
                  type="string"
                  register={register}
                  errors={errors}
                  isRequired
                />
                <FormInput
                  name="uenNo"
                  inputText="UEN"
                  type="string"
                  register={register}
                  errors={errors}
                  isRequired
                />
              </Space>
            )}
            {current === 2 && (
              <StyledRow gutter={[24, 48]}>
                <Col span={12}>
                  <InputText>Industry</InputText>
                  <StyledSelect bordered={false} onChange={handleOnChange}>
                    {Object.entries(industries).map(([key, value]) => (
                      <Option key={key} value={key}>
                        {value}
                      </Option>
                    ))}
                  </StyledSelect>
                </Col>
                <Col span={12}>
                  <FormInput
                    name="sales"
                    inputText="Sales"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="otherIncome"
                    inputText="Other Income"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="costOfGoodsSold"
                    inputText="Cost of Goods Sold"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="operatingExp"
                    inputText="Operating Expenses"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="interestExp"
                    inputText="Interest Expenses"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="currentAssets"
                    inputText="Current Assets"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="currentLiabilities"
                    inputText="Current Liabilities"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="inventory"
                    inputText="Inventory"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="longTermLiabilities"
                    inputText="Long Term Liabilities"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
              </StyledRow>
            )}
          </form>
        </FormContainer>
      </StepContainer>
    </>
  );
};

export default Signup;
