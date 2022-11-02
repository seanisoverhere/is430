import styled from "styled-components";
import { Steps, Row } from "antd";

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
