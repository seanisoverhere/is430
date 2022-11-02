import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PageTitle } from "@/utils/styles";
import FormInput from "@/components/FormInput";
import {
  ButtonContainer,
  StepContainer,
  StyledSteps,
  StyledRow,
} from "./styles";
import {
  BankOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledButton } from "@/utils/styles";
import { message, Col } from "antd";

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
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data: any) => console.log(data);

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
                <StyledButton onClick={() => next()}>Next</StyledButton>
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
      </StepContainer>
    </>
  );
};

export default Signup;
