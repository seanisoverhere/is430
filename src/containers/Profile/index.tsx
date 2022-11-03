import React from "react";
import { PageTitle } from "@/utils/styles";
import {
  FlexContainer,
  CompanyName,
  CompanyUen,
  InstructionText,
  FormContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";

const Profile = () => {
  return (
    <>
      <PageTitle>Profile</PageTitle>
      <FlexContainer>
        <CompanyName>Dog PTE LTD</CompanyName>
        <CompanyUen>UEN: ABC1223</CompanyUen>
      </FlexContainer>
      <InstructionText>
        We will prompt you <strong>quarterly</strong> to update your company
        financial health with us for a{" "}
        <strong>re-assessment of your credit score</strong>. Alternatively, you
        may also update at any point in time. We will update you on your credit
        score within <strong>3-5 working days</strong>.
      </InstructionText>
      <FormContainer>
        <form onSubmit={() => console.log("submit")}>hello form</form>
      </FormContainer>
    </>
  );
};

export default Profile;
