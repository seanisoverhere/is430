import React, { useEffect, useState } from "react";
import { PageTitle } from "@/utils/styles";

import FormInput from "@/components/FormInput";
import { useForm, SubmitHandler } from "react-hook-form";

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
        <FormInput
          inputText="Test"
          name="test"
          register={register}
          errors={errors}
          isRequired
        />
      </form>
    </>
  );
};

export default Loans;
