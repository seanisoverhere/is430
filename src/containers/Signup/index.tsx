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
} from "./styles";
import {
  BankOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledButton } from "@/utils/styles";
import { message, Col, Space } from "antd";
import useSignup from "@/hooks/api/useSignup";
import { industries } from "@/utils/constants/industries";

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
  const [uuid, setUuid] = useState<string>("");
  const [isFirstDisabled, setIsFirstDisabled] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { signUp } = useSignup();
  const onSubmit = (data: any) => console.log(data);

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
      const data: any = await signUp({
        email,
        password,
        companyName,
        uenNo,
      });

      if (data) {
        setUuid(data.uuid);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    console.log(uuid);
  }, [[uuid]]);

  return (
    <>
      <PageTitle>Sign up</PageTitle>
      <StepContainer>
        <StyledSteps
          current={current}
          labelPlacement="vertical"
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
                <StyledButton
                  onClick={() => message.success("Processing complete!")}
                >
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
                  <StyledSelect>
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
                    name="Other Income"
                    inputText="otherIncome"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="costOfGoodsSold"
                    inputText="Cost of Goods Sold"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="operatingExp"
                    inputText="Operating Expenses"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="interestExp"
                    inputText="Interest Expenses"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="currentAssets"
                    inputText="Current Assets"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="currentLiabilities"
                    inputText="Current Liabilities"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="inventory"
                    inputText="Inventory"
                    type="string"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="longTermLiabilities"
                    inputText="Long Term Liabilities"
                    type="string"
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
