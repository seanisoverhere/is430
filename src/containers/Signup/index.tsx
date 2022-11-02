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
} from "./styles";
import {
  BankOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledButton } from "@/utils/styles";
import { message, Col, Space } from "antd";

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
  const [isFirstDisabled, setIsFirstDisabled] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    const watchAll = watch();

    const { email, password } = watchAll;

    if (email && password) {
      setIsFirstDisabled(false);
    } else {
      setIsFirstDisabled(true);
    }
  }, [watch()]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
          </form>
        </FormContainer>
      </StepContainer>
    </>
  );
};

export default Signup;
