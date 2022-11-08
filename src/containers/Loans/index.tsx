import React, { useEffect, useState } from "react";
import { PageTitle, StyledButton } from "@/utils/styles";
import {
  AlignError,
  CurrencyContainer,
  ErrorSign,
  ErrorText,
  HelperText,
  StyledCurrencyInput,
  StyledRow,
  StyledInput,
  InputText,
  StyledSelect,
  RepaymentContainer,
} from "./styles";
import { Col } from "antd";
// import { invoices } from "@/utils/constants/suppliers";
import { monthsSplit } from "@/utils/constants/months";
import { InstructionText } from "../Home/styles";
import useLoans from "@/hooks/api/useLoans";
import { message } from "antd";
import { useRouter } from "next/router";
import useInvoice from "@/hooks/api/useInvoice";

const { Option } = StyledSelect;

const Loans = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [amountInput, setAmountInput] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [uen, setUen] = useState<string>("");
  const [repaymentMonth, setRepaymentMonth] = useState<number>();
  const [companyName, setCompanyName] = useState<string>("");
  const [payingAccountId, setPayingAccountId] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<string>("");
  const { getLoan } = useLoans();
  const router = useRouter();

  const { getAllInvoices, invoices } = useInvoice();

  useEffect(() => {
    getAllInvoices(Number(localStorage.getItem("uuid")));
  }, []);

  useEffect(() => {
    console.log(invoices);
  }, [invoices]);

  const checkLoanLogic = (amount?: string) => {
    if (Number(amount) > 300000) {
      setIsButtonDisabled(true);
      setHasError(true);
    } else {
      setAmountInput(Number(amount));
      setIsButtonDisabled(false);
      setHasError(false);
    }
  };

  const submitLoan = async () => {
    if (repaymentMonth && amountInput) {
      const res = await getLoan({
        invoiceId,
        companyName,
        uenNo: uen,
        repaymentPeriod: repaymentMonth,
        paymentAmt: amountInput,
        uuid: Number(localStorage.getItem("uuid")),
        payerAcctId: payingAccountId,
      });

      if (res.data.success) {
        message.success("Loan application successful!");
        router.push("/");
      }
    }
  };

  const handleOnChange = (val: any) => {
    const invoice = invoices?.find((invoice) => invoice.invoiceId === val);
    if (invoice) {
      setUen(invoice.uenNo);
      setCompanyName(invoice.companyName);
      setAmountInput(Number(invoice.amount));
      setInvoiceId(invoice.invoiceId);
    }
  };

  const handleMonthChange = (value: any) => {
    setRepaymentMonth(value);
  };

  return (
    <>
      <PageTitle>Loans</PageTitle>
      <InstructionText>
        Please enter the amount you would like to borrow, you are only limited
        to <strong>S$300,000</strong> per loan instance. Please note that it
        will take <strong>3-5 working days</strong> for us to verify and approve
        the loan
      </InstructionText>
      <StyledRow justify="space-between">
        <Col span={24} style={{ paddingBottom: "2rem" }}>
          <InputText>Invoice</InputText>
          <StyledSelect
            bordered={false}
            onChange={(val) => handleOnChange(val)}
          >
            {invoices &&
              invoices.map((invoice, index) => (
                <Option key={index} value={invoice.invoiceId}>
                  {invoice.invoiceId}
                </Option>
              ))}
          </StyledSelect>
        </Col>
        <Col span={11} style={{ paddingBottom: "2rem" }}>
          <InputText>Company Name</InputText>
          <StyledInput type="text" value={companyName} />
        </Col>
        <Col span={11} style={{ paddingBottom: "2rem" }}>
          <InputText>UEN</InputText>
          <StyledInput type="text" value={uen} />
        </Col>
        <Col span={11}>
          <InputText>Bank Account</InputText>
          <StyledSelect bordered={false}>
            <Option value="tBank">tBank</Option>
          </StyledSelect>
        </Col>
        <Col span={11}>
          <InputText>Paying Account ID</InputText>
          <StyledInput
            type="text"
            value={payingAccountId}
            onChange={(e) => setPayingAccountId(e.target.value)}
          />
        </Col>
      </StyledRow>
      <RepaymentContainer>
        <InputText>Repayment Period:</InputText>
        <StyledSelect bordered={false} onChange={handleMonthChange}>
          {Object.entries(monthsSplit).map(([key, value]) => (
            <Option key={value} value={value}>
              {key}
            </Option>
          ))}
        </StyledSelect>
      </RepaymentContainer>
      <CurrencyContainer>
        <HelperText>Please enter your loan amount</HelperText>
        <StyledCurrencyInput
          $hasError={hasError}
          name="amount"
          value={amountInput}
          prefix="S$"
          decimalsLimit={2}
          max={3000000}
          allowNegativeValue={false}
          onValueChange={(value) => checkLoanLogic(value)}
        />
        {hasError && (
          <AlignError>
            <ErrorSign src="/error.svg" alt="error" />
            <ErrorText>Loan amount cannot be greater than S$300,000</ErrorText>
          </AlignError>
        )}
      </CurrencyContainer>
      <StyledButton $isDisabled={isButtonDisabled} onClick={submitLoan}>
        Submit Loan
      </StyledButton>
    </>
  );
};

export default Loans;
