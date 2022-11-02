import styled from "styled-components";
import { Steps, Row, Select } from "antd";

export const StepContainer = styled.div`
  margin: 3rem 0;
  position: relative;
  height: 100vh;
`;

export const StyledSteps = styled(Steps)`
  && {
    width: 100%;

    .ant-steps-item-title {
      font-size: 0.8rem;
      line-height: 1.25rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15%;
  width: 100%;
`;

export const StyledRow = styled(Row)`
  && {
    width: 100%;
  }
`;

export const FormContainer = styled.div`
  margin: 3rem 0;
`;

export const InputText = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
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
