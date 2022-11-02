import React, { useEffect, useState } from "react";
import { PageTitle } from "@/utils/styles";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Col } from "antd";
import { StyledRow } from "./styles";

const Loans = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [isButtonDisabled, setIsBUttonDisabled] = useState<boolean>(false);
  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    const isNotEmpty = Object.values(watch()).every((value) => value !== "");
    setIsBUttonDisabled(isNotEmpty);
  }, [watch]);

  return (
    <>
      <PageTitle>Loans</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledRow gutter={[24, 24]}>
          <Col span={12}>
            <FormInput
              inputText="Test"
              name="test"
              register={register}
              errors={errors}
              isRequired
            />
          </Col>
          <Col span={12}>
            <FormInput
              inputText="Test"
              name="test"
              register={register}
              errors={errors}
              isRequired
            />
          </Col>
          <Col span={12}>
            <FormInput
              inputText="Test"
              name="test"
              register={register}
              errors={errors}
              isRequired
            />
          </Col>
          <Col span={12}>
            <FormInput
              inputText="Test"
              name="test"
              register={register}
              errors={errors}
              isRequired
            />
          </Col>
        </StyledRow>
      </form>
    </>
  );
};

export default Loans;
