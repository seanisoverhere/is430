import styled from "styled-components";
import { Divider } from "antd-mobile";
import { Space } from "antd";

export const ChartContainer = styled.div`
  margin: 1rem 0;
`;

export const StyledDivider = styled(Divider)`
  && {
    margin: 1rem 0;
    font-weight: 600;
    font-size: 13px;
    border-color: #000;
  }
`;

export const LoanContainer = styled.div`
  overflow: auto;
`;

export const StyledSpace = styled(Space)`
  && {
    width: 100%;
  }
`;

export const InstructionText = styled.div`
  margin: 1rem 0 2rem;
  font-size: 0.9rem;
`;
