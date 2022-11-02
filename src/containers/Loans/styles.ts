import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";

export const CurrencyContainer = styled.div`
  margin: 2rem 0;
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
