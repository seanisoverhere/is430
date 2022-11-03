import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";
import { Row, Select } from "antd";

export const CurrencyContainer = styled.div`
  margin: 2rem 0;
`;

export const StyledRow = styled(Row)`
  && {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const StyledCurrencyInput = styled(CurrencyInput)<{
  $hasError: boolean;
}>`
  && {
    width: 100%;
    font-size: 3rem;
    text-align: center;
    background: transparent;
    outline: 0;
    border-width: 0 0 1px;
    color: #4c4c4c;
    border-color: ${({ $hasError }) => ($hasError ? "#ff0000" : "#4c4c4c")};

    :focus {
      outline: none;
    }
  }
`;

export const HelperText = styled.div`
  color: #4c4c4c;
  font-size: 1rem;
  padding-bottom: 1rem;
`;

export const AlignError = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.4rem;
`;

export const ErrorSign = styled.img`
  width: 15px;
  height: 15px;
`;

export const ErrorText = styled.span`
  color: #4c4c4c;
  opacity: 0.7;
  margin-left: 0.5rem;
`;

export const InputText = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  outline: 0;
  border-width: 0 0 1px;
  border-color: ${({ $hasError }) => ($hasError ? "#ff0000" : "#4c4c4c")};
  line-height: 25px;
  color: #4c4c4c;
  width: 100%;
  background: transparent;

  :focus {
    border-color: #4c4c4c;
  }
`;

export const StyledSelect = styled(Select)`
  && {
    width: 100%;

    .ant-select-selector {
      border-color: #4c4c4c !important;
      border-width: 0 0 1px !important;
      background: transparent;
      border-radius: 0;
      height: 26.5px;
      padding: 0;
    }

    .ant-select-arrow {
      right: 0;
    }
  }
`;

export const RepaymentContainer = styled.div`
  & {
    margin: 2rem 0;
  }
`;
